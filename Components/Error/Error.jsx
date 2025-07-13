"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

const Error = ({ error, onClose, containedMode = false }) => {
  if (!error) return null;

  return (
    <div 
      className={`${
        containedMode 
          ? 'absolute inset-0' 
          : 'fixed inset-0'
      } bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`}
    >
      <div className="bg-[#2e353d] border border-[#454b57] rounded-2xl p-6 max-w-md w-full mx-4 relative">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[rgba(255,255,255,0.6)] hover:text-[#ffffff] transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Contenido del modal */}
        <div className="flex flex-col items-center text-center space-y-2">
          {/* Título */}
          <h2 className="text-4xl font-bold text-[#ffffff] mt-2">Oops...</h2>

          {/* Mensaje de error */}
          <div className="space-y-2 mt-4">
            <p className="text-[rgba(255,255,255,0.8)] text-sm">
              Something went wrong. Please try again.
            </p>
            
            {/* Error específico */}
            {error && (
              <div className="bg-[#22272d] border border-[#454b57] rounded-lg p-3 mt-3">
                <p className="text-[rgba(255,255,255,0.6)] text-xs font-mono break-words">
                  {typeof error === 'string' ? error : error.message || 'Unknown error occurred'}
                </p>
              </div>
            )}
          </div>

          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="bg-[#FFBF00] hover:bg-[#ffc000] text-black font-medium py-2 px-6 rounded-xl transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
