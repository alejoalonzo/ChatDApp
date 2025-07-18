"use client";

import React, { useState, useContext, useEffect } from "react";

//Internal Imports
import { ChatAppContext } from "@/Context/ChatAppContext";
import { UserCard, DashboardLayout } from "@/Components";

const AllUsers = () => {
  const { userList, addFriend } = useContext(ChatAppContext);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {/* Header fijo */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-bold text-white">Find your friends</h2>
        </div>

        {/* Scroll area para las cards */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {userList.map((el, i) => (
              <UserCard key={i} el={el} i={i} addFriend={addFriend} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllUsers;
