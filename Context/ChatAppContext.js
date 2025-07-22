"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { ChatAppABI, ChatAppAddress } from "@/Context/Constants";

//INTERNAL IMPORTS
import {
  GetCurrentAccount,
  CheckIfWalletIsConnected,
  ConnectWallet,
  ConnectToContract,
  ConvertTime,
  ClearWalletConnection,
  RequestWalletDisconnect,
} from "@/Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const router = useRouter();
  // USESTATE -
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [friendMessages, setFriendMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [userLoggedOut, setUserLoggedOut] = useState(false); // Flag para logout manual

  //Chat User Data
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  //FETCH DATA TIME OF THE PAGE LOAD
  // 1) Sólo lee si ya hay wallet conectada (SIN pop-up)
  const checkWallet = async () => {
    try {
      // Si el usuario hizo logout manual, no reconectar automáticamente
      if (userLoggedOut) {
        console.log("User logged out manually, skipping auto-reconnect");
        return;
      }

      const acc = await GetCurrentAccount();
      if (!acc) return; // Nadie ha conectado aún

      setAccount(acc);

      // Instancia provider/contract _sin_ Web3Modal
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(ChatAppAddress, ChatAppABI, signer);

      // Verifica si el usuario existe antes de cargar datos
      const userExists = await contract.userExists(acc);

      if (userExists) {
        try {
          const username = await contract.getUserName(acc);
          setUserName(username);
          setFriendList(await contract.getMyFriendList());
        } catch (usernameError) {
          console.warn("User exists but username is corrupted:", usernameError);
          setUserName("");
          setFriendList([]);
        }
      } else {
        setUserName("");
        setFriendList([]);
      }
      setUserList(await contract.getAllAppUsers());
    } catch (err) {
      console.error("checkWallet error:", err);
      setError("Please install and connect your wallet");
    }
  };

  // 2) Llamada explícita desde el botón (CON pop-up)
  const connectWallet = async () => {
    try {
      const acc = await ConnectWallet(); // Abre MetaMask

      if (!acc) return; // Usuario canceló la conexión

      // Limpiar flag de logout cuando se conecta manualmente
      setUserLoggedOut(false);
      setAccount(acc);

      const contract = await ConnectToContract(); // Web3Modal aquí

      // Verifica si el usuario existe antes de cargar datos
      const userExists = await contract.userExists(acc);

      if (userExists) {
        try {
          const username = await contract.getUserName(acc);
          setUserName(username);
          setFriendList(await contract.getMyFriendList());
        } catch (usernameError) {
          console.warn("User exists but username is corrupted:", usernameError);
          setUserName("");
          setFriendList([]);
        }
      } else {
        setUserName("");
        setFriendList([]);
      }
      setUserList(await contract.getAllAppUsers());
    } catch (err) {
      console.error(err);
      setError("Wallet connection failed");
    }
  };
  //USE EFFECT - FETCH DATA TIME OF THE PAGE LOAD
  useEffect(() => {
    checkWallet();

    // Escuchar cambios en las cuentas de MetaMask
    let contractListener;
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = accounts => {
        if (accounts.length === 0) {
          // Usuario desconectó desde MetaMask
          console.log("User disconnected from MetaMask");
          setUserLoggedOut(true);
          setAccount("");
          setUserName("");
          setFriendList([]);
          setFriendMessages([]);
          setUserList([]);
          setCurrentUserName("");
          setCurrentUserAddress("");
          setError("");
          setLoading(false);
        } else if (accounts[0] !== account && account !== "") {
          // Usuario cambió de cuenta
          console.log("User changed account in MetaMask");
          setAccount(accounts[0]);
          // Recargar datos para la nueva cuenta
          checkWallet();
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Listener de eventos del contrato para UserCreated (solo lectura, sin signer)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        ChatAppAddress,
        ChatAppABI,
        provider
      );
      contractListener = contract.on(
        "UserCreated",
        async (userAddress, userName) => {
          try {
            setUserList(await contract.getAllAppUsers());
            const acc = await GetCurrentAccount();
            if (
              acc &&
              acc.toLowerCase() === userAddress.toLowerCase() &&
              (await contract.userExists(acc))
            ) {
              setFriendList(await contract.getMyFriendList());
            }
          } catch (e) {
            console.error("Error actualizando listas tras UserCreated:", e);
          }
        }
      );

      // Cleanup
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
        }
        // Remover listener de evento UserCreated
        if (contractListener && contractListener.removeAllListeners) {
          contractListener.removeAllListeners("UserCreated");
        }
      };
    }
  }, [userLoggedOut, account]); // Ejecutar cuando cambie el estado de logout o account

  //READ MESSAGES
  const readMessages = async friendAddress => {
    try {
      const contract = await ConnectToContract();
      const readMessages = await contract.readMessages(friendAddress);
      setFriendMessages(readMessages);
    } catch (err) {
      setError("Error fetching messages");
    }
  };

  //CREATE AN ACCOUNT
  const createAccount = async ({ userName }) => {
    try {
      //check if username is provided
      if (!userName) {
        setError("Please provide username");
        return;
      }

      console.log("CreateAccount: Starting account creation for:", userName);
      const contract = await ConnectToContract();
      const getCreatedUser = await contract.createAccount(userName);
      setLoading(true);
      await getCreatedUser.wait();

      console.log(
        "CreateAccount: Account created successfully, updating local state"
      );
      // En lugar de recargar la página, actualizar el estado local
      setUserName(userName);
      console.log("CreateAccount: userName state updated to:", userName);
      setFriendList(await contract.getMyFriendList());
      setUserList(await contract.getAllAppUsers());
      setLoading(false);

      // window.location.reload(); // Comentado para evitar el reload
    } catch (err) {
      console.error("CreateAccount: Error creating account:", err);
      setLoading(false);
      setError("Error creating account, please reload the page");
    }
  };

  //ADD A FRIEND
  const addFriend = async ({ name, accountAddress }) => {
    try {
      //check if name and accountAddress are provided
      if (!name || !accountAddress) {
        setError("Please provide name and account address");
        return;
      }

      console.log("AddFriend: Starting process with data:", {
        friendName: name,
        friendAddress: accountAddress,
        currentUser: account,
        currentUserName: userName,
      });

      const contract = await ConnectToContract();
      console.log(
        "AddFriend: Contract connected, calling addFriend on blockchain..."
      );

      const addFriendTx = await contract.addFriend(accountAddress, name);
      setLoading(true);

      console.log("AddFriend: Transaction sent, waiting for confirmation...", {
        transactionHash: addFriendTx.hash,
      });

      await addFriendTx.wait();
      setLoading(false);

      console.log(
        "AddFriend: Transaction confirmed! Friend added successfully:",
        {
          friendName: name,
          friendAddress: accountAddress,
          transactionHash: addFriendTx.hash,
        }
      );

      // Actualizar la lista de amigos y usuarios
      const updatedFriendList = await contract.getMyFriendList();
      setFriendList(updatedFriendList);
      const updatedUserList = await contract.getAllAppUsers();
      setUserList(updatedUserList);

      router.push("/"); // Navega a home, pero NO recarga la página
      // Si quieres mostrar feedback visual, puedes agregar un mensaje o spinner
    } catch (err) {
      console.error("AddFriend: Error details:", err);
      setError("Error adding friend");
    }
  };

  //SEND MESSAGE
  const sendMessage = async ({ friendAddress, message }) => {
    try {
      //check if friendAddress and message are provided
      if (!friendAddress || !message) {
        setError("Please provide friend address and message");
        return;
      }
      const contract = await ConnectToContract();
      const sendMessage = await contract.sendMessage(friendAddress, message);
      setLoading(true);
      await sendMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (err) {
      setError("Error sending message");
    }
  };

  //READ USER INFO
  const readUserInfo = async userAddress => {
    try {
      const contract = await ConnectToContract();

      // Verifica si el usuario existe antes de obtener su información
      const userExists = await contract.userExists(userAddress);

      if (userExists) {
        try {
          const userName = await contract.getUserName(userAddress);
          setCurrentUserName(userName);
          setCurrentUserAddress(userAddress);
        } catch (usernameError) {
          console.warn("User exists but username is corrupted:", usernameError);
          setCurrentUserName("");
          setCurrentUserAddress(userAddress);
          setError("User data is corrupted");
        }
      } else {
        setCurrentUserName("");
        setCurrentUserAddress(userAddress);
        setError("User does not exist");
      }
    } catch (err) {
      setError("Error fetching user info");
    }
  };

  //LOGOUT FUNCTION
  const logout = async () => {
    try {
      // Marcar que el usuario hizo logout manual
      setUserLoggedOut(true);

      // Limpiar datos locales de la wallet
      await RequestWalletDisconnect();

      // Resetear todos los estados de la aplicación
      setAccount("");
      setUserName("");
      setFriendList([]);
      setFriendMessages([]);
      setUserList([]);
      setCurrentUserName("");
      setCurrentUserAddress("");
      setError("");
      setLoading(false);

      // Intentar limpiar más datos de localStorage
      if (typeof window !== "undefined") {
        // Limpiar posibles datos adicionales
        localStorage.removeItem("web3-connect-modal");
        localStorage.removeItem(
          "-walletlink:https://www.walletlink.org:DefaultActiveWallet"
        );
        localStorage.removeItem("walletconnect");
        localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");

        // Limpiar sessionStorage también
        sessionStorage.clear();
      }

      console.log(
        "Logout successful - All states reset and local data cleared"
      );
      return true;
    } catch (err) {
      console.error("Error during logout:", err);
      setError("Error during logout");
      return false;
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessages,
        createAccount,
        addFriend,
        sendMessage,
        readUserInfo,
        CheckIfWalletIsConnected,
        connectWallet,
        account,
        userName,
        friendList,
        friendMessages,
        loading,
        userList,
        error,
        logout,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
