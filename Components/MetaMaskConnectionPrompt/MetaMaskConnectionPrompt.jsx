"use client";

import React from "react";
import { ConnectWalletButton } from "@/Components";

const MetaMaskConnectionPrompt = ({ onCancel, variant = "desktop" }) => {
  return (
    <div className="bg-[#2e353d] rounded-3xl p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        {/* Icono de wallet */}
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.5 6.5L12 2L3.5 6.5V10.5C3.5 16.29 7.36 21.58 12 23C16.64 21.58 20.5 16.29 20.5 10.5V6.5ZM12 7.5C13.38 7.5 14.5 8.62 14.5 10S13.38 12.5 12 12.5S9.5 11.38 9.5 10S10.62 7.5 12 7.5ZM12 20.5C9.5 20.5 7.5 18 7.5 15H16.5C16.5 18 14.5 20.5 12 20.5Z"/>
          </svg>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-white">
          Connect Your Wallet
        </h2>

        {/* Mensaje */}
        <p className="text-gray-300 text-center">
          This is a decentralized application that requires MetaMask to function. 
          Please connect your wallet to continue.
        </p>

        {/* Botón de conectar wallet */}
        <div className="space-y-4">
          <ConnectWalletButton 
            variant={variant}
            className="w-full !rounded-2xl"
            onClose={onCancel}
          />
          
          {/* Botón de cancelar */}
          <button
            onClick={onCancel}
            className="w-full px-4 py-2 text-gray-400 hover:text-white transition-colors rounded-2xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetaMaskConnectionPrompt;
