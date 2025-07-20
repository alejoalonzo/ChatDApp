"use client";

import React, { useState, useContext, useEffect } from "react";

//Internal Imports
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Filter, DashboardLayout, Friend } from "@/Components";

const chat = () => {
  const { userList, addFriend, friendList } = useContext(ChatAppContext);

  console.log("Chat page - friendList:", friendList);

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
          {/* Content area for friends and chats */}
          <div className="flex-1 p-4">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Your Friends
              </h3>
              {friendList && friendList.length > 0 ? (
                <Friend />
              ) : (
                <div className="text-white text-center py-8">
                  <p className="text-gray-400">
                    No friends added yet. Go to All Users to add some friends!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default chat;
