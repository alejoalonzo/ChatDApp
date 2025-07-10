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
      <NavBar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Hey BlockChain</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UserCard />
          <Filter />
          <Friend />
        </div>
      </main>
    </div>
  );
}
