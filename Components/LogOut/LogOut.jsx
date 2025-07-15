"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut as LogOutIcon } from "lucide-react";
import { ChatAppContext } from "@/Context/ChatAppContext";

const LogOut = ({ 
  variant = "button", // "button" or "menuItem"
  onClose, // Para cerrar modales si es necesario
  className = "",
  containedMode = false // Para controlar si el modal debe estar contenido
}) => {
  const { logout, account, userName } = useContext(ChatAppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      
      // Redirigir a la página principal
      router.push("/");
      
      // Opcional: recargar la página para asegurar que todo se reinicie
      window.location.reload();
      
      // Cerrar modal si existe
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  const handleConfirmLogout = () => {
    setShowConfirmation(true);
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  // No mostrar el botón si no hay cuenta conectada
  if (!account) return null;

  // Modal de confirmación
  if (showConfirmation) {
    return (
      <div 
        className={`${
          containedMode 
            ? 'absolute inset-0' 
            : 'fixed inset-0'
        } bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`}
        style={{
          paddingLeft: containedMode ? '4rem' : '0' // Espacio para el navbar cuando está contenido
        }}
      >
        <div className="bg-[#2e353d] rounded-2xl p-6 max-w-md mx-4 border border-[#454b57]">
          <div className="text-center space-y-4">
            {/* Icono de logout (sin color rojo) */}
            <div className="mx-auto w-12 h-12 bg-gray-500 bg-opacity-20 rounded-full flex items-center justify-center">
              <LogOutIcon className="w-6 h-6 text-gray-400" />
            </div>
            
            {/* Título */}
            <h3 className="text-lg font-semibold text-white">
              Confirm Logout
            </h3>
            
            {/* Mensaje */}
            <p className="text-gray-300 text-sm">
              This will disconnect your wallet from the application and clear all local data. 
              To reconnect, you'll need to authorize the connection again.
            </p>
            
            {/* Información del usuario */}
            {userName && (
              <div className="bg-[#22272d] rounded-lg p-3 text-left">
                <p className="text-gray-400 text-xs mb-1">Logged in as:</p>
                <p className="text-white font-medium">{userName}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </p>
              </div>
            )}
            
            {/* Botones */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancelLogout}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-[#454b57] hover:bg-[#3f464d] text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variante de botón
  if (variant === "button") {
    return (
      <button
        onClick={handleConfirmLogout}
        disabled={isLoading}
        className={`flex items-center gap-2 px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 ${className}`}
      >
        <LogOutIcon className="w-4 h-4" />
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    );
  }

  // Variante de elemento de menú
  if (variant === "menuItem") {
    return (
      <button
        onClick={handleConfirmLogout}
        disabled={isLoading}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors disabled:opacity-50 ${className}`}
      >
        <LogOutIcon className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">
          {isLoading ? "Logging out..." : "Logout"}
        </span>
      </button>
    );
  }

  // Variante de solo icono para sidebar cerrado
  if (variant === "iconOnly") {
    return (
      <button
        onClick={handleConfirmLogout}
        disabled={isLoading}
        className={`flex items-center justify-center rounded-lg transition-colors disabled:opacity-50 ${className}`}
      >
        <LogOutIcon className="w-5 h-5" />
      </button>
    );
  }

  return null;
};

export default LogOut;
