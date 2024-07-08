"use client";

import { Suspense, useEffect, useState } from "react";
import { socket } from "@/socket";
import React from "react";
import ChatItemSkeleton from "./ChatItemSkeleton";
import { useChatBox } from "@/providers/ChatBoxContext";

const ChatItem = React.lazy(() => import("./ChatItem"));

interface ChatsProps {
  chatsData: any[];
  user: any;
}

const Chats: React.FC<ChatsProps> = ({ chatsData, user }: ChatsProps) => {
  const { lastMessages, unreadedMessages } = useChatBox();

  const [loading, setLoading] = useState(true);

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
    if (unreadedMessages.length > 0) {
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          const new_message = unreadedMessages.find(
            (msg) => chat.id == msg.roomId
          );

          if (new_message) {
            return { ...chat, unreaded_messages: new_message.messages };
          }
          return chat;
        });

        return updatedChats;
      });
    }
  }, [unreadedMessages]);

  useEffect(() => {
    if (chatsData) {
      setChats([...chatsData]);
      const rooms = chatsData.map((chat: any) => chat.id.toString());
      socket.emit("joinRoom", rooms);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [chatsData]);

  if (!chats || loading) return <ChatItemSkeleton />;

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
