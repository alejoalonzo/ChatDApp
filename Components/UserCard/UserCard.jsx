import React from "react";
import Image from "next/image";
import { images } from "@/Utils/images";

const UserCard = ({ el, i, addFriend}) => {
    console.log(el);
    const handleAddFriend = () => {
        console.log('Add Friend clicked:', { name: el.name, accountAddress: el.accountAddress });
        addFriend({ name: el.name, accountAddress: el.accountAddress });
    } 
    return (
        <div className="bg-[#2e353d] border border-[#454b57] rounded-2xl p-6 text-center space-y-4 hover:border-[#FFBF00] transition-all duration-200">
            <div className="flex justify-center">
                <Image 
                    src={images[`image${i+1}`]} 
                    alt="user" 
                    width={100} 
                    height={100} 
                    className="rounded-full object-cover"
                />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">{el.name}</h3>
                <p className="text-gray-400 text-xs truncate">{el.accountAddress.slice(0,14)} ... {el.accountAddress.slice(-4)}</p>
                <button 
                    onClick={handleAddFriend}
                    className="bg-[#FFBF00] text-black px-4 py-2 mt-2 rounded-full hover:bg-[#e6a800] transition-colors duration-200"
                >
                    Add Friend
                </button>
            </div>
        </div>
    );
}

export default UserCard;
