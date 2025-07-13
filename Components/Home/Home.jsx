"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { User } from "lucide-react";            <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
              CHAT DAPP
            </h1>
//INTERNAL IMPORTS
import { ChatAppContext } from "@/Context/ChatAppContext";
import { NavBar } from "@/Components";
import { ConnectToContract, ConnectWallet } from "@/Utils/apiFeature";

const Home = () => {
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
          <main className="flex-1 p-4 flex flex-col justify-center">
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
                {/* Indicador de estado online */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              <button className="bg-[#FFBF00] hover:bg-[#ffc000] text-black font-medium py-2 px-6 rounded-full transition-colors duration-200">
                Create Account
              </button>
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

              {/* Columna derecha - Imagen */}
              <div className="flex justify-center">
                <Image
                  src="/assets/images/illustration2.png"
                  alt="Chat DApp Illustration"
                  width={400}
                  height={300}
                  className="rounded-3xl"
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Contenido mobile - Sin contenedor */}
      <div className="sm:hidden">
        <NavBar />
        <main className="container mx-auto p-4 overflow-y-auto">
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
              {/* Indicador de estado online */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <button className="bg-[#FFBF00] hover:bg-[#ffc000] text-black font-medium py-2 px-6 rounded-full transition-colors duration-200">
              Create Account
            </button>
          </div>

          {/* Título principal */}
          <div className="text-center space-y-2 mb-6" style={{ marginTop: '40px' }}>
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

          {/* Imagen ilustrativa */}
          <div className="flex justify-center mb-6 px-[5%]">
            <Image
              src="/assets/images/illustration2.png"
              alt="Chat DApp Illustration"
              width={300}
              height={225}
              className="rounded-3xl w-full max-w-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4"></div>
        </main>
      </div>
    </div>
  );
};

export default Home;
