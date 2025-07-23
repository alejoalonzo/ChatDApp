"use client";

import React, { useState, useContext, useEffect } from "react";

//Internal Imports
import { ChatAppContext } from "@/Context/ChatAppContext";
import { UserCard, DashboardLayout } from "@/Components";

const AllUsers = () => {
  const { userList, addFriend, account } = useContext(ChatAppContext);

  // Suponiendo que cada usuario tiene una propiedad 'address' o 'id' que identifica al usuario actual
  const sortedUserList = React.useMemo(() => {
    console.log("userList:", userList);
    console.log("account:", account);
    if (!userList || !account) return userList;
    // Puedes cambiar 'address' por la propiedad correcta después de ver el log
    const currentIndex = userList.findIndex(
      u => u.accountAddress?.toLowerCase() === account?.toLowerCase()
    );
    if (currentIndex === -1) return userList;
    const arr = [...userList];
    const [current] = arr.splice(currentIndex, 1);
    return [current, ...arr];
  }, [userList, account]);

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
            {sortedUserList.map((el, i) => (
              <UserCard key={i} el={el} i={i} addFriend={addFriend} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllUsers;
