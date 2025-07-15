"use client";

import React, { useState, useContext, useEffect } from "react";

//Internal Imports
import { ChatAppContext } from "@/Context/ChatAppContext";
import { UserCard, DashboardLayout } from "@/Components";

const AllUsers = () => {
  const { userList, addFriend } = useContext(ChatAppContext);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Find your friends</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userList.map((el, i) => (
            <UserCard key={i} el={el} i={i} addFriend={addFriend} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllUsers;
