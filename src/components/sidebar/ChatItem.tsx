"use client";

import { Chat } from "@/icons/Chat.icon";
import { useUser } from "@/providers/UserContext";
import Link from "next/link";
import React from "react";

interface ChatItemProps {
  chat: {
    id: string;
    name: string;
    last_message: {
      sender: string;
      body: string;
    } | null;
  };
  userInformation: {
    id: string;
  };
}

const ChatItem: React.FC<ChatItemProps> = React.memo(
  function ChatItem({ chat, userInformation }: ChatItemProps) {
    const { user } = useUser();

    return (
      <Link
        prefetch={true}
        as={`/chats/${chat?.id}`}
        href={`/chats/${chat?.id}`}
        className="flex items-center p-3 hover:bg-gray-800 cursor-pointer w-full rounded"
      >
        <div className="w-9 h-9 rounded-full mr-1 bg-green-500 flex justify-center items-center">
          <Chat className="text-xl" />
        </div>
        <div className="h-9 flex-col justify-center p-1">
          <h4 className="text-xs leading-none mb-1">{chat.name}</h4>
          <h5 className="text-xs text-gray-400 bg-purple- leading-none">
            {chat.last_message
              ? chat.last_message.sender === user?.id
                ? "you: " + chat.last_message.body
                : chat.last_message.sender + ": " + chat.last_message.body
              : ""}
          </h5>
        </div>
      </Link>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.chat?.id === nextProps.chat.id &&
      prevProps.chat.name === nextProps.chat.name &&
      prevProps.chat.last_message?.sender ===
        nextProps.chat.last_message?.sender &&
      prevProps.chat.last_message?.body === nextProps.chat.last_message?.body &&
      prevProps.userInformation?.id === nextProps.userInformation.id
    );
  }
);

export default ChatItem;
