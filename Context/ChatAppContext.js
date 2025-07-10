"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//INTERNAL IMPORTS
import {
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
  const fetchData = async () => {
    try {
      //FROM CONTRACT.SOL****
      //Get Contract
      const contract = await ConnectToContract();
      //Get Account
      const connectedAccount = await ConnectWallet();
      setAccount(connectedAccount);

      //FROM API-FEATURE****
      //get user name
      const userName = await contract.getUserName(connectedAccount);
      setUserName(userName);

      //Get My Friends List
      const friendList = await contract.getMyFriendsList();
      setFriendList(friendList);

      //Get All App Users
      const userList = await contract.getAllAppUsers();
      setUserList(userList);
    } catch (err) {
      setError("Please install and connect your wallet");
    }
  };

  //USE EFFECT - FETCH DATA TIME OF THE PAGE LOAD
  useEffect(() => {
    fetchData();
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
