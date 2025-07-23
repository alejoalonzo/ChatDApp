import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { images } from "@/Utils/images";

const FriendCard = ({ el, i, onSelect }) => {
    const imageSrc = images[`image${(i % 12) + 1}`] || images.image1;
    return (
        <div className="group bg-[#2e353d] border border-[#454b57] rounded-2xl p-6 text-center space-y-4 hover:border-[#FFBF00] transition-all duration-200">
            <div>
                <div className="flex justify-center">
                    <Image
                        src={imageSrc}
                        alt="user"
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">{el[1] || 'Friend'}</h3>
                    <p className="text-gray-400 text-xs truncate">{el[0] ? `${el[0].slice(0, 14)} ... ${el[0].slice(-4)}` : 'No address'}</p>
                </div>
            </div>
            <div>
                <button
                    className="bg-[#FFBF00] text-black px-4 py-2 mt-2 rounded-full hover:bg-[#e6a800] transition-colors duration-200 inline-block cursor-pointer"
                    onClick={onSelect}
                >
                    Message
                </button>
            </div>
        </div>
    );
}

export default FriendCard;
