import { ethers } from "ethers";
import { Web3Modal } from "web3modal";

import { ChatAppABI, ChatAppAddress } from "@/Context/Constants";

// Function to check if  the wallet is connected
export const CheckIfWalletIsConnected = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    } else {
      console.log("Ethereum object found:", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.log("No authorized account found");
    }
  } catch (error) {
    console.error("Error checking wallet connection:", error);
  }
};

// Function to connect the wallet
export const ConnectWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connected account:", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
};

// Function to fetch the contract
const FetchContract = signerOrProvider =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

//Functio to connect  to the contract
export const ConnectToContract = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length === 0) {
      console.log("No authorized account found");
      return;
    }

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = FetchContract(signer);

    return contract;
  } catch (error) {
    console.error("Error connecting to contract:", error);
  }
};

//Function to convert time
export const ConvertTime = time => {
  const newTime = new Date(time.toNumber());
  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    " Date: " +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

  return realTime;
};
