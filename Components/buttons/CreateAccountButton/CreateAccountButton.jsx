"use client";

import React, { useState, useEffect, useContext } from "react";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Tooltip } from "@/Components";
import { CheckIfMetaMaskInstalled } from "@/Utils/apiFeature";

const CreateAccountButton = ({ 
  variant = "desktop", // "desktop" or "mobile"
  onClick, // Función que se ejecuta al hacer click
  className = "" // Clases adicionales
}) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);

  const { account, userName } = useContext(ChatAppContext);

  // Check if MetaMask is installed when component mounts
  useEffect(() => {
    const checkMetaMask = () => {
      setIsMetaMaskInstalled(CheckIfMetaMaskInstalled());
    };
    checkMetaMask();
  }, []);

  // Determine user status for the indicator
  const getUserStatus = () => {
    // Check all three conditions:
    // 1. MetaMask installed
    // 2. Wallet connected (account exists)
    // 3. User account created (userName exists)
    return isMetaMaskInstalled && account && userName;
  };

  const handleClick = () => {
    if (!isMetaMaskInstalled) {
      // Si no tiene MetaMask, el onClick debería manejar mostrar el error
      if (onClick) {
        onClick();
      }
      return;
    }
    
    // Si tiene MetaMask, ejecutar la función onClick
    if (onClick) {
      onClick();
    }
  };

  // Si el usuario ya tiene una cuenta, mostrar su nombre
  if (userName) {
    return (
      <div className={`font-medium py-2 px-6 rounded-full bg-[#FFBF00] text-black ${className}`}>
        {userName}
      </div>
    );
  }

  return (
    <Tooltip
      id={`create-account-${variant}-tooltip`}
      message={!isMetaMaskInstalled ? "Install MetaMask and connect your wallet first" : ""}
      place="bottom"
    >
      <button 
        onClick={handleClick}
        disabled={!isMetaMaskInstalled}
        className={`font-medium py-2 px-6 rounded-full transition-colors duration-200 ${
          isMetaMaskInstalled
            ? 'bg-[#FFBF00] hover:opacity-80 text-black cursor-pointer'
            : 'bg-[#454b57] text-[rgba(255,255,255,0.4)] cursor-not-allowed'
        } ${className}`}
      >
        Create Account
      </button>
    </Tooltip>
  );
};

export default CreateAccountButton;
