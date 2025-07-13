"use client";

import { useState } from "react";
import { User, Wallet, Send, X } from "lucide-react";
import { Error } from "@/Components";

const CreateAccountForm = ({ onCancel, onError, isLoading, setIsLoading }) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [error, setError] = useState(null);

  const functionName = async ({ name, accountAddress }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Creating account with:", { name, accountAddress });
      
      // Aquí agregarás la lógica para crear la cuenta
      console.log("Account created successfully!");
      
    } catch (error) {
      console.error("Error creating account:", error);
      setError(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setName("");
    setAccountAddress("");
    onCancel();
  };

  const isFormValid = name.trim() !== "" && accountAddress.trim() !== "";

  return (
    <div className="relative">
      {/* Versión Desktop/Tablet */}
      <div className="hidden sm:block w-[400px] h-[300px] bg-[#2e353d] border border-[#454b57] rounded-3xl flex items-center justify-center p-6">
        <div className="w-full space-y-4">
          <div className="text-left mb-6">
            <h3 className="text-xl font-bold text-[#ffffff] mb-2">Create Account</h3>
            <p className="text-[rgba(255,255,255,0.6)] text-sm">Fill in your details to get started</p>
          </div>
          
          {/* Input para nombre */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(255,255,255,0.6)]">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#22272d] border border-[#454b57] rounded-xl py-3 pl-12 pr-4 text-[#ffffff] placeholder-[rgba(255,255,255,0.6)] focus:outline-none focus:border-[#FFBF00] transition-colors duration-200"
            />
          </div>
          
          {/* Input para address */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(255,255,255,0.6)]">
              <Wallet className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Wallet address"
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)}
              className="w-full bg-[#22272d] border border-[#454b57] rounded-xl py-3 pl-12 pr-4 text-[#ffffff] placeholder-[rgba(255,255,255,0.6)] focus:outline-none focus:border-[#FFBF00] transition-colors duration-200"
            />
          </div>
          
          {/* Botones */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => functionName({ name, accountAddress })}
              disabled={!isFormValid || isLoading}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                isFormValid && !isLoading
                  ? 'bg-[#FFBF00] hover:bg-[#ffc000] text-black'
                  : 'bg-[#454b57] text-[rgba(255,255,255,0.4)] cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              {isLoading ? 'Creating...' : 'Send'}
            </button>
            
            <button
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium bg-[#454b57] hover:bg-[#3f464d] text-[rgba(255,255,255,0.8)] transition-all duration-200"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Versión Mobile */}
      <div className="sm:hidden w-full h-[250px] bg-[#2e353d] border border-[#454b57] rounded-3xl flex items-center justify-center px-4 py-[30px]">
        <div className="w-full space-y-2">
          <div className="text-center mb-3">
            <h3 className="text-lg font-bold text-[#ffffff] mb-1">Create Account</h3>
            <p className="text-[rgba(255,255,255,0.6)] text-xs">Fill in your details to get started</p>
          </div>
          
          {/* Input para nombre */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(255,255,255,0.6)]">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#22272d] border border-[#454b57] rounded-lg py-2 pl-10 pr-3 text-[#ffffff] text-sm placeholder-[rgba(255,255,255,0.6)] focus:outline-none focus:border-[#FFBF00] transition-colors duration-200"
            />
          </div>
          
          {/* Input para address */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(255,255,255,0.6)]">
              <Wallet className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Wallet address"
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)}
              className="w-full bg-[#22272d] border border-[#454b57] rounded-lg py-2 pl-10 pr-3 text-[#ffffff] text-sm placeholder-[rgba(255,255,255,0.6)] focus:outline-none focus:border-[#FFBF00] transition-colors duration-200"
            />
          </div>
          
          {/* Botones */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => functionName({ name, accountAddress })}
              disabled={!isFormValid || isLoading}
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg font-medium text-xs transition-all duration-200 ${
                isFormValid && !isLoading
                  ? 'bg-[#FFBF00] hover:bg-[#ffc000] text-black'
                  : 'bg-[#454b57] text-[rgba(255,255,255,0.4)] cursor-not-allowed'
              }`}
            >
              <Send className="w-3 h-3" />
              {isLoading ? 'Creating...' : 'Send'}
            </button>
            
            <button
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg font-medium text-xs bg-[#454b57] hover:bg-[#3f464d] text-[rgba(255,255,255,0.8)] transition-all duration-200"
            >
              <X className="w-3 h-3" />
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Error */}
      <Error error={error} onClose={() => setError(null)} containedMode={true} />
    </div>
  );
};

export default CreateAccountForm;
