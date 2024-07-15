"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { socket } from "@/socket";
import React from "react";
import ChatItemSkeleton from "./ChatItemSkeleton";
import { useChatBox } from "@/providers/ChatBoxContext";

const ChatItem = React.lazy(() => import("./ChatItem"));

interface ChatsProps {
  chatsData: any[];
  user: any;
}

const Chats = React.memo(({ chatsData, user }: ChatsProps) => {
  const { lastMessages, unreadedMessages, handleUnreadedMessages } =
    useChatBox();
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (chatsData && user) {
      setChats([...chatsData]);
      const rooms = chatsData.map((chat: any) => chat.id.toString());
      socket.emit("joinRoom", rooms);
      setLoading(false);

      chatsData.forEach((chat: any) => {
        handleUnreadedMessages(chat.id, user.id, chat.unreaded_messages);
      });
    } else {
      setLoading(false);
    }
  }, [chatsData, user]);

  useEffect(() => {
    if (lastMessages) {
      setChats((prevChats) =>
        prevChats.map((chat) => {
          const new_message = lastMessages.find(
            (msg) => chat.id == msg.receiver
          );
          return new_message ? { ...chat, last_message: new_message } : chat;
        })
      );
    }
  }, [lastMessages]);

  useEffect(() => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        const new_message = unreadedMessages.find(
          (msg) => chat.id === msg.roomId
        );
        return {
          ...chat,
          unreaded_messages: new_message ? new_message.messages : [],
        };
      })
    );
  }, [unreadedMessages]);

  if (loading) return <ChatItemSkeleton />;

  return (
    <Suspense fallback={<ChatItemSkeleton />}>
      <div>
        {chats.map((chat: any) => (
          <ChatItem key={chat.id} chat={chat} userInformation={user} />
        ))}
      </div>
    </Suspense>
  );
});

Chats.displayName = "Chats";

export default Chats;
