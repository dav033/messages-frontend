"use client";

import { useEffect } from "react";
import ChatItem from "./ChatItem";
import { socket } from "@/socket";

export default function Chats({ chats }: any) {
  useEffect(() => {
    if (chats) {
      let rooms = chats.map((chat: any) => chat.id.toString());

      socket.emit("joinRoom", rooms);
    }
  }, [chats]);

  return (
    <div>
      {chats?.map((chat: any) => {
        return <ChatItem key={chat.id} chat={chat} />;
      })}
    </div>
  );
}
