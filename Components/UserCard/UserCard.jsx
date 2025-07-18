import React from "react";
import Image from "next/image";
import { images } from "@/Utils/images";

const UserCard = ({ el, i, addFriends}) => {
    console.log(el);
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
            </div>
        </div>
    );
}

export default UserCard;
