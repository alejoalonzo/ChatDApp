import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { images } from "@/Utils/images";

const FriendCard = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-md">
            <Image src={images.profile} alt="Profile Picture" className="w-16 h-16 rounded-full" />
            <h2 className="mt-2 text-lg font-semibold">Friend's Name</h2>
            <p className="text-sm text-gray-600">Friend's Status</p>
            <Link href="/chat" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Message</Link>
        </div>
    )

}

export default FriendCard;
