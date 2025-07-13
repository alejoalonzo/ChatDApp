"use client";

import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { User } from "lucide-react";

//INTERNAL IMPORTS
import { ChatAppContext } from "@/Context/ChatAppContext";
import { NavBar, CreateAccountForm, Error, Loader, Tooltip } from "@/Components";
import { ConnectToContract, ConnectWallet, CheckIfMetaMaskInstalled } from "@/Utils/apiFeature";

const Home = () => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);

  // Get context values
  const { account, userName } = useContext(ChatAppContext);

  // Check if MetaMask is installed when component mounts
  useEffect(() => {
    const checkMetaMask = () => {
      if (!CheckIfMetaMaskInstalled()) {
        setIsMetaMaskInstalled(false);
        setError("This decentralized application requires MetaMask to function. Please install MetaMask from https://metamask.io and refresh the page.");
      }
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

  const handleCreateAccountClick = () => {
    if (!isMetaMaskInstalled) {
      setError("This decentralized application requires MetaMask to function. Please install MetaMask from https://metamask.io and refresh the page.");
      return;
    }
    setShowCreateAccount(!showCreateAccount);
  };

  const handleCancelForm = () => {
    setShowCreateAccount(false);
  };

  return (
    <div className="min-h-screen">
      {/* Contenedor general - Solo visible en tablet y desktop */}
      <div
        className="
        hidden sm:block           
        sm:m-8 md:mx-auto md:my-12 lg:mx-auto lg:my-16
        sm:max-w-none md:max-w-5xl lg:max-w-6xl
        bg-[#22272d]
        rounded-[2rem]              
        sm:min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-8rem)]
        overflow-hidden
      "
      >
        {/* Contenedor flex para navbar y main en fila */}
        <div className="flex flex-row sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] lg:h-[calc(100vh-8rem)]">
          {/* Navbar dentro del contenedor */}
          <NavBar />

          {/* Contenido principal */}
          <main className="flex-1 p-4 flex flex-col justify-center relative">
            {/* Botón Create Account arriba a la derecha */}
            <div className="flex justify-between items-center mb-6">
              {/* Imagen de usuario con indicador online */}
              <div className="relative">
                {/* Condicional para mostrar imagen o icono de usuario */}
                {false ? (
                  <Image
                    src="/assets/images/user-placeholder.png"
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

              <Tooltip
                id="create-account-desktop-tooltip"
                message={!isMetaMaskInstalled ? "Install MetaMask and connect your wallet first" : ""}
                place="bottom"
              >
                <button 
                  onClick={handleCreateAccountClick}
                  disabled={!isMetaMaskInstalled}
                  className={`font-medium py-2 px-6 rounded-full transition-colors duration-200 ${
                    isMetaMaskInstalled
                      ? 'bg-[#FFBF00] hover:opacity-80 text-black cursor-pointer'
                      : 'bg-[#454b57] text-[rgba(255,255,255,0.4)] cursor-not-allowed'
                  }`}
                >
                  Create Account
                </button>
              </Tooltip>
            </div>

            {/* Layout de dos columnas para desktop y tablet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center flex-1">
              {/* Columna izquierda - Texto */}
              <div className="space-y-6">
                {/* Título principal */}
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold text-white">
                    Welcome to
                  </h1>
                  <h1 className="text-7xl font-black bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                    CHAT DAPP
                  </h1>
                </div>

                {/* Párrafo descriptivo */}
                <p className="text-gray-300 text-lg">
                  Connect with friends and chat securely on the blockchain.
                  Experience the future of decentralized communication with our
                  Web3 chat application.
                </p>
              </div>

              {/* Columna derecha - Imagen o Form */}
              <div className="flex justify-center">
                {!showCreateAccount ? (
                  <Image
                    src="/assets/images/illustration2.png"
                    alt="Chat DApp Illustration"
                    width={400}
                    height={300}
                    className="rounded-3xl"
                  />
                ) : (
                  <CreateAccountForm 
                    onCancel={handleCancelForm} 
                    onError={setError}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                )}
              </div>
            </div>

            {/* Error Modal para desktop/tablet - contenido en el main */}
            <Error error={error} onClose={() => setError(null)} containedMode={true} />
            
            {/* Loader Modal para desktop/tablet - contenido en el main */}
            <Loader isLoading={isLoading} message="Creating your account..." containedMode={true} />
          </main>
        </div>
      </div>

      {/* Contenido mobile - Sin contenedor */}
      <div className="sm:hidden relative">
        <NavBar />
        <main className="container mx-auto p-4 overflow-y-auto relative">
          {/* Botón Create Account arriba a la derecha */}
          <div className="flex justify-between items-center mb-6">
            {/* Imagen de usuario con indicador online */}
            <div className="relative">
              {/* Condicional para mostrar imagen o icono de usuario */}
              {false ? (
                <Image
                  src="/assets/images/user-placeholder.png"
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

            <Tooltip
              id="create-account-mobile-tooltip"
              message={!isMetaMaskInstalled ? "Install MetaMask and connect your wallet first" : ""}
              place="bottom"
            >
              <button 
                onClick={handleCreateAccountClick}
                disabled={!isMetaMaskInstalled}
                className={`font-medium py-2 px-6 rounded-full transition-colors duration-200 ${
                  isMetaMaskInstalled
                    ? 'bg-[#FFBF00] hover:bg-[#ffc000] text-black cursor-pointer'
                    : 'bg-[#454b57] text-[rgba(255,255,255,0.4)] cursor-not-allowed'
                }`}
              >
                Create Account
              </button>
            </Tooltip>
          </div>

          {/* Título principal */}
          <div className="text-center space-y-0 mb-6" style={{ marginTop: '50px' }}>
            <h1 className="text-3xl font-bold text-white">
              Welcome to
            </h1>
            <h1 className="text-7xl font-black bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent" style={{ fontWeight: '950' }}>
              CHAT DAPP
            </h1>
          </div>

          {/* Párrafo descriptivo */}
          <div className="text-center mb-6 px-[5%]">
            <p className="text-gray-300">
              Connect with friends and chat securely on the blockchain. Experience
              the future of decentralized communication.
            </p>
          </div>

          {/* Imagen ilustrativa o Form */}
          <div className="flex justify-center mb-6 px-[5%]">
            {!showCreateAccount ? (
              <Image
                src="/assets/images/illustration2.png"
                alt="Chat DApp Illustration"
                width={300}
                height={225}
                className="rounded-3xl w-full max-w-none"
              />
            ) : (
              <CreateAccountForm 
                onCancel={handleCancelForm} 
                onError={setError}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
          </div>

          <div className="grid grid-cols-1 gap-4"></div>

          {/* Error Modal para mobile - contenido en el main */}
          <Error error={error} onClose={() => setError(null)} containedMode={true} />
          
          {/* Loader Modal para mobile - contenido en el main */}
          <Loader isLoading={isLoading} message="Creating your account..." containedMode={true} />
        </main>
      </div>
    </div>
  );
};

export default Home;
