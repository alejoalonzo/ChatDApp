import React, { useContext } from "react";

import FriendCard from "./card/card";
import { ChatAppContext } from "@/Context/ChatAppContext";


const Friend = () => {
    const { 
        sendMessage, 
        account, 
        friendList, 
        readMessages, 
        userName, 
        loading,
        currentUserName,
        currentUserAddress,
        readUser
    } = useContext(ChatAppContext);
    console.log( "Friend List: ", friendList);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FriendCard />
            <FriendCard />
            <FriendCard />
        </div>
    );
}


export default Friend;
