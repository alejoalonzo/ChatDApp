"use client";

import React, { useState, useContext, useEffect } from "react";

//Internal Imports
import Chat from "@/Components/Friend/chat/chat";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Filter, DashboardLayout, Friend } from "@/Components";

const chat = () => {
  const {
    userList,
    addFriend,
    friendList,
    sendMessage,
    readMessages,
    friendMessages,
    account,
    loading,
    currentUserName,
    currentUserAddress,
  } = useContext(ChatAppContext);

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredFriends, setFilteredFriends] = useState(friendList);

  useEffect(() => {
    setFilteredFriends(friendList);
  }, [friendList]);

  const handleSelectFriend = friend => {
    setSelectedFriend({
      name: friend[1],
      address: friend[0],
    });
  };

  const handleSearch = () => {
    if (!searchText.trim()) {
      setFilteredFriends(friendList);
      return;
    }
    const filtered = friendList.filter(f =>
      f[1]?.toLowerCase().includes(searchText.trim().toLowerCase())
    );
    setFilteredFriends(filtered);
  };
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full min-h-0">
        {/* Fixed Filter at top */}
        <div className="sticky top-0 z-10 p-4 border-b border-[#454b57]">
          <Filter
            searchText={searchText}
            setSearchText={setSearchText}
            onSearch={handleSearch}
          />
        </div>

        {/* Nueva área con grid para friends y mensajes */}
        <div className="flex-1 p-4 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full min-h-0">
            {/* Columna de amigos */}
            <div className="mb-6 flex flex-col h-full min-h-0">
              <h3 className="text-xl font-semibold text-white mb-4">
                Your Friends
              </h3>
              {/* Scroll area para las cards de amigos */}
              <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-8 custom-scrollbar">
                {filteredFriends && filteredFriends.length > 0 ? (
                  <Friend
                    friendList={filteredFriends}
                    onSelectFriend={handleSelectFriend}
                  />
                ) : (
                  <div className="text-white text-center py-8">
                    <p className="text-gray-400">No friends found.</p>
                  </div>
                )}
              </div>
            </div>
            {/* Área de mensajes de referencia con scroll */}
            <div className="lg:col-span-2 flex flex-col h-full min-h-0">
              <div
                className="w-full h-full min-h-0 bg-[#23272f] rounded-xl border border-[#454b57] flex flex-col text-gray-400 text-xl"
                style={{ transition: "none" }}
              >
                <div className="flex-1 min-h-0 overflow-y-auto p-6 custom-scrollbar">
                  {/* Chat */}
                  <Chat
                    functionName={sendMessage}
                    readMessages={readMessages}
                    friendMessages={friendMessages}
                    account={account}
                    loading={loading}
                    currentUserName={currentUserName}
                    currentAddress={currentUserAddress}
                    selectedFriend={selectedFriend}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default chat;
