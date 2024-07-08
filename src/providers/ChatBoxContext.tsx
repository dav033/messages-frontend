"use client";

import { Message } from "@/types";
import { createContext, useContext, useState } from "react";

const ChatBoxContext = createContext(null);

interface UnreadedMessages {
  roomId: string;
  messages: Message[];
}

export function ChatBoxContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lastMessages, setLastMessages] = useState([]);
  const [unreadedMessages, setUnreadedMessages] = useState<UnreadedMessages[]>(
    []
  );

  const handleUnreadedMessages = (
    roomId,
    userId,
    initialUnread: Message[],
    msg?: Message
  ) => {
    if (msg) {
      setUnreadedMessages((prevData) => {
        const roomIndex = prevData.findIndex((room) => room.roomId == roomId);

        if (roomIndex !== -1) {
          // Crear una copia del array de mensajes y añadir el nuevo mensaje
          const newMessages = [...prevData[roomIndex].messages, msg];

          const updatedRoom = {
            ...prevData[roomIndex],
            messages: newMessages,
          };

          return [
            ...prevData.slice(0, roomIndex),
            updatedRoom,
            ...prevData.slice(roomIndex + 1),
          ];
        } else {
          return [
            ...prevData,
            { roomId: roomId, messages: [...initialUnread, msg] },
          ];
        }
      });
    }
  };

  const handleChats = (message) => {
    setLastMessages((prevData) => {
      const newMessages = [...prevData];
      const existingMessageIndex = newMessages.findIndex(
        (msg) => msg.receiver === message.receiver
      );

      if (existingMessageIndex !== -1) {
        newMessages.splice(existingMessageIndex, 1);
      }

      newMessages.unshift(message);

      return newMessages;
    });
  };

  return (
    <ChatBoxContext.Provider
      value={{
        lastMessages,
        handleChats,
        unreadedMessages,
        handleUnreadedMessages,
      }}
    >
      {children}
    </ChatBoxContext.Provider>
  );
}

export const useChatBox = () => useContext(ChatBoxContext);
