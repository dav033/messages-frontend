"use client";

import { Suspense, useEffect, useState } from "react";
import { socket } from "@/socket";
import React from "react";
import ChatItemSkeleton from "./ChatItemSkeleton";
import { useUser } from "@/providers/UserContext";

// Lazy load ChatItem outside the component to avoid redefining it on each render
const ChatItem = React.lazy(() => import("./ChatItem"));

interface ChatsProps {
  chatsData: any[];
  user: any;
}

const Chats: React.FC<ChatsProps> = ({ chatsData, user }: ChatsProps) => {
  const { lastMessages } = useUser();

  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (lastMessages) {
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          const new_message = lastMessages.find(
            (msg) => chat.id == msg.receiver
          );

          if (new_message) {
            return { ...chat, last_message: new_message };
          }
          return chat;
        });

        return updatedChats;
      });
    }
  }, [lastMessages]);

  useEffect(() => {
    if (chatsData) {
      console.log("chatsData", chatsData);
      setChats([...chatsData]);
      const rooms = chatsData.map((chat: any) => chat.id.toString());
      socket.emit("joinRoom", rooms);
    }
  }, [chatsData]);

  return (
    <Suspense fallback={<ChatItemSkeleton />}>
      <div>
        {chats.map((chat: any) => (
          <ChatItem key={chat?.id} chat={chat} userInformation={user} />
        ))}
      </div>
    </Suspense>
  );
};

export default Chats;
