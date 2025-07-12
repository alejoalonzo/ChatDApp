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
} from "@/Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  // USESTATE -
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [friendMessages, setFriendMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");

  //Chat User Data
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  //FETCH DATA TIME OF THE PAGE LOAD
  // 1) Sólo lee si ya hay wallet conectada (SIN pop-up)
  const checkWallet = async () => {
    try {
      const acc = await GetCurrentAccount();
      if (!acc) return; // Nadie ha conectado aún

      setAccount(acc);

      // Instancia provider/contract _sin_ Web3Modal
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ChatAppAddress, ChatAppABI, signer);

      // Carga de datos
      setUserName(await contract.getUserName(acc));
      setFriendList(await contract.getMyFriendsList());
      setUserList(await contract.getAllAppUsers());
    } catch (err) {
      console.error(err);
      setError("Please install and connect your wallet");
    }
  };

  // 2) Llamada explícita desde el botón (CON pop-up)
  const connectWallet = async () => {
    try {
      const acc = await ConnectWallet(); // Abre MetaMask

      if (!acc) return; // Usuario canceló la conexión
      setAccount(acc);

      const contract = await ConnectToContract(); // Web3Modal aquí
      setUserName(await contract.getUserName(acc));
      setFriendList(await contract.getMyFriendsList());
      setUserList(await contract.getAllAppUsers());
    } catch (err) {
      console.error(err);
      setError("Wallet connection failed");
    }
  };
  //USE EFFECT - FETCH DATA TIME OF THE PAGE LOAD
  useEffect(() => {
    checkWallet();
  }, []);

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
      const contract = await ConnectToContract();
      const getCreatedUser = await contract.createAccount(userName);
      setLoading(true);
      await getCreatedUser.wait();
      window.location.reload();
    } catch (err) {
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
      const contract = await ConnectToContract();
      const addFriend = await contract.addFriend(name, accountAddress);
      setLoading(true);
      await addFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (err) {
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
      const userName = await contract.getUserName(userAddress);
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddress);
    } catch (err) {
      setError("Error fetching user info");
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
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
