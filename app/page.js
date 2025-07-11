"use client";

import Image from "next/image";
import { useContext, useState } from "react";

//INTERNAL IMPORTS
import { ChatAppContext } from "@/Context/ChatAppContext";
import { NavBar, UserCard, Filter, Friend } from "@/Components";
import { ConnectToContract, ConnectWallet } from "@/Utils/apiFeature";

export default function Home() {
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
          <main className="flex-1 p-4">
            <h1 className="text-2xl font-bold mb-4 text-white">
              Hey BlockChain
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <UserCard />
              <Filter />
              <Friend />
            </div>
          </main>
        </div>
      </div>

      {/* Contenido mobile - Sin contenedor */}
      <div className="sm:hidden">
        <NavBar />
        <main className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-white">Hey BlockChain</h1>

          <div className="grid grid-cols-1 gap-4">
            <UserCard />
            <Filter />
            <Friend />
          </div>
        </main>
      </div>
    </div>
  );
}
