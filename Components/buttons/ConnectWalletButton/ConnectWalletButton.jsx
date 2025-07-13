"use client";

import React, { useContext, useState, useEffect } from "react";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Tooltip } from "@/Components";
import { CheckIfMetaMaskInstalled } from "@/Utils/apiFeature";

const ConnectWalletButton = ({ 
  variant = "desktop", // "desktop" or "mobile"
  onClose, // Para cerrar el modal en mobile
  className = "" // Clases adicionales
}) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const [error, setError] = useState(null);

  const { account, connectWallet } = useContext(ChatAppContext);

  // Check if MetaMask is installed when component mounts
  useEffect(() => {
    const checkMetaMask = () => {
      setIsMetaMaskInstalled(CheckIfMetaMaskInstalled());
    };
    checkMetaMask();
  }, []);

  // Handle wallet connection with MetaMask check
  const handleConnectWallet = () => {
    if (!isMetaMaskInstalled) {
      setError("This decentralized application requires MetaMask to function. Please install MetaMask from https://metamask.io and refresh the page.");
      return;
    }
    
    connectWallet();
    
    // Si es mobile y hay función de cierre, cerrar el modal
    if (variant === "mobile" && onClose) {
      onClose();
    }
  };

  // No mostrar el botón si ya hay una cuenta conectada
  if (account) return null;

  return (
    <Tooltip
      id={`connect-wallet-${variant}-tooltip`}
      message={!isMetaMaskInstalled ? "Install MetaMask extension first" : ""}
      place="top"
    >
      <button
        onClick={handleConnectWallet}
        disabled={!isMetaMaskInstalled}
        className={`w-full mb-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
          isMetaMaskInstalled
            ? 'bg-[#FFBF00] hover:opacity-80 text-[#2e353d] cursor-pointer'
            : 'bg-[#454b57] text-[rgba(255,255,255,0.4)] cursor-not-allowed'
        } ${className}`}
      >
        Connect Wallet
      </button>
    </Tooltip>
  );
};

export default ConnectWalletButton;
