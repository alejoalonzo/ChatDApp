"use client";

import Image from "next/image";
import { useState, useContext, useEffect } from "react";

//INTERNAL IMPORTS
import { ChatAppContext } from "@/Context/ChatAppContext";
import { CreateAccountForm, Error, Loader, CreateAccountButton, UserActive, MetaMaskConnectionPrompt } from "@/Components";
import { CheckIfMetaMaskInstalled } from "@/Utils/apiFeature";

const HomeContent = () => {
  const { account, userName } = useContext(ChatAppContext);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showMetaMaskPrompt, setShowMetaMaskPrompt] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Cerrar el prompt de MetaMask automáticamente cuando la wallet se conecte y mostrar el formulario
  useEffect(() => {
    if (account && showMetaMaskPrompt) {
      setShowMetaMaskPrompt(false);
      setShowCreateAccount(true); // Mostrar el formulario después de conectar la wallet
    }
  }, [account, showMetaMaskPrompt]);

  const handleCreateAccountClick = () => {
    if (!CheckIfMetaMaskInstalled()) {
      setError("This decentralized application requires MetaMask to function. Please install MetaMask from https://metamask.io and refresh the page.");
      return;
    }

    // Si MetaMask está instalado pero no hay cuenta conectada
    if (!account) {
      setShowMetaMaskPrompt(true);
      return;
    }

    setShowCreateAccount(!showCreateAccount);
  };

  const handleCancelForm = () => {
    setShowCreateAccount(false);
  };

  const handleCancelMetaMaskPrompt = () => {
    setShowMetaMaskPrompt(false);
  };

  return (
    <>
      {/* Contenido principal para desktop/tablet */}
      <div className="hidden sm:block">
        {/* Botón Create Account arriba a la derecha - FIJO EN TOP */}
        <div className="flex justify-between items-center mb-6 absolute top-4 left-4 right-4 z-10">
          {/* Imagen de usuario con indicador online */}
          <UserActive />

          <CreateAccountButton 
            variant="desktop" 
            onClick={handleCreateAccountClick}
          />
        </div>

        {/* Layout de dos columnas para desktop y tablet - CENTRADO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center flex-1 pt-16">
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

          {/* Columna derecha - Imagen, Form o MetaMask Prompt */}
          <div className="flex justify-center">
            {showMetaMaskPrompt ? (
              <MetaMaskConnectionPrompt 
                variant="desktop"
                onCancel={handleCancelMetaMaskPrompt}
              />
            ) : !showCreateAccount ? (
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
      </div>

      {/* Contenido mobile */}
      <div className="sm:hidden">
        {/* Botón Create Account arriba a la derecha */}
        <div className="flex justify-between items-center mb-6">
          {/* Imagen de usuario con indicador online */}
          <UserActive />

          <CreateAccountButton 
            variant="mobile" 
            onClick={handleCreateAccountClick}
          />
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

        {/* Imagen ilustrativa, Form o MetaMask Prompt */}
        <div className="flex justify-center mb-6 px-[5%]">
          {showMetaMaskPrompt ? (
            <MetaMaskConnectionPrompt 
              variant="mobile"
              onCancel={handleCancelMetaMaskPrompt}
            />
          ) : !showCreateAccount ? (
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

        {/* Error Modal para mobile */}
        <Error error={error} onClose={() => setError(null)} containedMode={true} />
        
        {/* Loader Modal para mobile */}
        <Loader isLoading={isLoading} message="Creating your account..." containedMode={true} />
      </div>
    </>
  );
};

export default HomeContent;
