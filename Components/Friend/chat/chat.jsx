import React, { useState, useEffect, useRef } from "react";
import { Loader2 as Loader, Send as SendIcon } from "lucide-react";
import { ConvertTime } from "@/Utils/apiFeature";

const Chat = ({
  functionName,
  readMessages,
  friendMessages,
  account,
  loading,
  selectedFriend,
}) => {
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);

  // Ref para el área de mensajes
  const messagesEndRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Cargar mensajes del amigo seleccionado
  useEffect(() => {
    if (selectedFriend && readMessages) {
      readMessages(selectedFriend.address);
    }
  }, [selectedFriend, readMessages]);

  // Scroll automático al final solo si el usuario está abajo
  useEffect(() => {
    if (messagesEndRef.current && autoScroll) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [friendMessages, sending, autoScroll]);

  // Detectar si el usuario hace scroll manual
  const handleScroll = () => {
    const el = messagesEndRef.current;
    if (!el) return;
    // Si el usuario está cerca del fondo (20px de margen), activar autoScroll
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 20;
    setAutoScroll(atBottom);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedFriend) return;
    setSending(true);
    try {
      await functionName({
        friendAddress: selectedFriend.address,
        message: messageInput,
      });
      setMessageInput("");
      await readMessages?.(selectedFriend.address);
    } catch (err) {
      console.error("Error sending message:", err);
    }
    setSending(false);
  };

  // Función para acortar la dirección
  const shortAddress = (addr) => {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      {selectedFriend ? (
        <div className="py-4">
          <div className="text-white text-lg font-bold">{selectedFriend.name}</div>
          <div className="text-gray-400 text-xs">{shortAddress(selectedFriend.address)}</div>
        </div>
      ) : (
        <div className="text-gray-400 py-4">Select a friend to chat</div>
      )}

      {/* Mensajes */}
      <div
        ref={messagesEndRef}
        className="flex-1 flex flex-col gap-2 overflow-y-auto p-2 custom-scrollbar chat-messages-box"
        onScroll={handleScroll}
        style={{ background: 'var(--bg-tertiary)', borderRadius: '1.5rem', border: '1px solid var(--bg-accent)' }}
      >
        {loading || sending ? (
          <div className="flex justify-center items-center mt-10">
            <Loader className="animate-spin" /> Loading...
          </div>
        ) : friendMessages?.length ? (
          friendMessages.map((msg, idx) => {
            const isMine =
              msg.sender?.toLowerCase() === account?.toLowerCase();
            return (
              <div
                key={idx}
                className={`p-2 rounded-2xl ${
                  isMine
                    ? "bg-[#2e353d] text-white self-end" // gris oscuro de la paleta
                    : "bg-gray-700 text-gray-200 self-start"
                }`}
                style={{ fontSize: '0.95rem', fontWeight: 'normal' }}
              >
                <div className="text-xs text-gray-400" style={{ fontWeight: 'normal' }}>
                  {isMine ? "Me" : selectedFriend?.name}
                </div>
                <div>{msg.msg}</div>
                <div className="text-[10px] text-gray-500">
                  {msg.time && ConvertTime(msg.time)}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500">No messages yet.</div>
        )}
      </div>

      {/* Formulario */}
      {selectedFriend && (
        <form onSubmit={handleSendMessage} className="flex gap-2 pt-4">
          <input
            type="text"
            className="flex-1 p-2 rounded-2xl text-white placeholder:text-xs"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={sending}
            style={{ fontSize: '0.95rem', background: '#3f464d' }}
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-[var(--primary)] text-black px-4 py-2 rounded-2xl transition-colors duration-200 hover:bg-[#ffc000]"
            disabled={sending || !messageInput.trim()}
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <SendIcon size={20} className="mr-1" />
          </button>
        </form>
      )}
    </div>
  );
};

export default Chat;
