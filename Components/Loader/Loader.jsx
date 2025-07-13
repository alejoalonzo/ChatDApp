"use client";

import React from "react";
import { Loader2 } from "lucide-react";

const Loader = ({ isLoading, message = "Loading...", containedMode = false }) => {
  if (!isLoading) return null;
  
  return (
    <div 
      className={`${
        containedMode 
          ? 'absolute inset-0' 
          : 'fixed inset-0'
      } bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`}
    >
      <div className="bg-[#2e353d] border border-[#454b57] rounded-2xl p-6 max-w-md w-full mx-4">
        {/* Contenido del modal */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Spinner de carga */}
          <div className="flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-[#FFBF00] animate-spin" />
          </div>

          {/* Título */}
          <h2 className="text-xl font-bold text-[#ffffff]">Loading</h2>

          {/* Mensaje de carga */}
          <div className="space-y-2">
            <p className="text-[rgba(255,255,255,0.8)] text-sm">
              {message}
            </p>
            
            {/* Mensaje adicional */}
            <p className="text-[rgba(255,255,255,0.6)] text-xs">
              Please wait while we process your request...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
