import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ConvertTime } from "@/Utils/apiFeature";
import { Loader } from  "lucide-react";


const Chat = ({
  functionName,
  readMessages,
  friendMessages,
  account,
  loading,
  currentUserName,
  currentAddress,
  selectedFriend,
}) => {
  //Use State for managing chat messages
  const [messages, setMessages] = React.useState('');

  // Mostrar datos del amigo seleccionado
  console.log("Chat Component - selectedFriend:", selectedFriend);
  return (
    <div>
      <h2>Chat Component</h2>
      {selectedFriend ? (
        <div className="mb-4">
          <div className="text-white">Chatting with: <span className="font-bold">{selectedFriend.name}</span></div>
          <div className="text-gray-400 text-xs">Address: {selectedFriend.address}</div>
        </div>
      ) : (
        <div className="text-gray-400 mb-4">Select a friend to start chatting</div>
      )}
      {/* Render chat UI here */}
    </div>
  );
};

export default Chat;
