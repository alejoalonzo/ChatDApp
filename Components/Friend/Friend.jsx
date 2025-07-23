import React, { useContext } from "react";

import FriendCard from "./card/card";
import { ChatAppContext } from "@/Context/ChatAppContext";


const Friend = ({ friendList, onSelectFriend }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {Array.isArray(friendList) && friendList.length > 0 ? (
                friendList.map((el, i) => (
                    <FriendCard key={i} el={el} i={i} onSelect={() => onSelectFriend(el)} />
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500">No friends found.</p>
            )}
        </div>
    );
}


export default Friend;
