"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { CheckIfMetaMaskInstalled } from "@/Utils/apiFeature";

const UserActive = ({ 
  className = "",
  showImage = false, // Para mostrar imagen de usuario o solo el icono
  imageSrc = "/assets/images/user-placeholder.png" // Ruta de la imagen por defecto
}) => {
  // Get context values
  const { account, userName } = useContext(ChatAppContext);

  // Determine user status for the indicator
  const getUserStatus = () => {
    // Check all three conditions:
    // 1. MetaMask installed
    // 2. Wallet connected (account exists)
    // 3. User account created (userName exists)
    return CheckIfMetaMaskInstalled() && account && userName;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Condicional para mostrar imagen o icono de usuario */}
      {showImage ? (
        <Image
          src={imageSrc}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-300" />
        </div>
      )}
      
      {/* Indicador de estado dinámico */}
      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
        getUserStatus() ? 'bg-green-500' : 'bg-red-500'
      }`}></div>
    </div>
  );
};

export default UserActive;
