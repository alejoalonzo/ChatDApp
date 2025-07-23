import React, { useState } from "react";
import Link from "next/link";
import { Search, Trash2, UserPlus } from "lucide-react";

//internal imports
// import { ChatAppContext } from "@/Context/ChatAppContext";
// import { Model } from "..";


const Filter = ({ searchText, setSearchText, onSearch }) => {
    const [showAddFriend, setShowAddFriend] = useState(false);
    return (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:space-y-0 space-y-4">
            {/* Search bar */}
            <div className="flex items-center bg-[#2e353d] border border-[#454b57] rounded-2xl p-4 space-x-4 md:w-[35%] w-full">
                <button
                    type="button"
                    onClick={onSearch}
                    className="focus:outline-none"
                >
                    <Search className="text-gray-400 w-5 h-5 cursor-pointer" />
                </button>
                <input
                    type="text"
                    value={searchText}
                    onChange={e => {
                        setSearchText(e.target.value);
                        onSearch();
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            onSearch();
                        }
                    }}
                    placeholder="Search..."
                    className="bg-transparent outline-none flex-1 text-white placeholder-gray-400"
                />
            </div>
            {/* Buttons Container */}
            <div className="flex items-center justify-between md:justify-end md:space-x-3 lg:flex-1">
                {/* Button clear chat */}
                <button
                    className="flex items-center justify-center space-x-2 bg-[#2e353d] text-white rounded-full py-2 px-4 hover:bg-[#3a424b] transition-colors duration-200 flex-1 max-w-[45%] md:max-w-none md:flex-none md:px-3 md:py-1.5 cursor-pointer"
                    onClick={() => setShowAddFriend(false)}
                >
                    <Trash2 className="w-4 h-4 md:w-3.5 md:h-3.5" />
                    <span className="md:text-sm">Clear Chat</span>
                </button>
                {/* Add Friend Button como link a All Users (sin legacyBehavior) */}
                <Link
                  href="/allUsers"
                  className="flex items-center justify-center space-x-2 bg-[#FFBF00] text-black rounded-full py-2 px-4 hover:bg-[#e6a800] transition-colors duration-200 flex-1 max-w-[45%] md:max-w-none md:flex-none md:px-3 md:py-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 md:w-3.5 md:h-3.5" />
                  <span className="md:text-sm">Add Friends</span>
                </Link>
            </div>
        </div>
    );
}

export default Filter;