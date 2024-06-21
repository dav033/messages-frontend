"use client";

import { useEffect } from "react";
import ChatItem from "./ChatItem";
import { socket } from "@/socket";
import React from "react";

interface ChatsProps {
  chats: any[];
  user: any;
}

const Chats: React.FC<ChatsProps> = React.memo(function ChatsComponent({ chats, user }: ChatsProps) {
  useEffect(() => {
    if (chats) {
      console.log("ejecutando")
      const rooms = chats.map((chat: any) => chat.id.toString());
      socket.emit("joinRoom", rooms);
    }
  }, [chats]);

  return (
    <div>
      {chats?.map((chat: any) => (
        <ChatItem key={chat.id} chat={chat} userInformation={user} />
      ))}
    </div>
  );
});

export default Chats;
