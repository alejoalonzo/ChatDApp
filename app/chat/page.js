"use client";

import React, { useState, useContext, useEffect } from "react";

//Internal Imports
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Filter, DashboardLayout } from "@/Components";

const chat = () => {
  const { userList, addFriend } = useContext(ChatAppContext);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {/* Fixed Filter at top */}
        <div className="sticky top-0 z-10 p-4 border-b border-[#454b57]">
          <Filter />
        </div>

        {/* Content area for friends and chats */}
        <div className="flex-1 p-4">
          {/* Aquí irá el contenido de amigos y chats */}
          <div className="text-white text-center py-8">
            <p className="text-gray-400">Friends and chats will appear here</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default chat;
