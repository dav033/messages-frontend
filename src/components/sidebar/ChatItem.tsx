"use client";

import { Chat as ChatIcon } from "@/icons/Chat.icon";
import { useUser } from "@/providers/UserContext";
import Link from "next/link";
import React, { useEffect, useCallback } from "react";
import { Chat, Message } from "@/types";
import { socket } from "@/socket";
import { useParams } from "next/navigation";
import { useChatBox } from "@/providers/ChatBoxContext";
import { setReadedMessages } from "@/petitions";

interface ChatItemProps {
  chat: Chat;
  userInformation: {
    id: string;
  };
}

const ChatItem: React.FC<ChatItemProps> = React.memo(
  function ChatItem({ chat, userInformation }) {
    const { user } = useUser();
    const { handleChats, handleUnreadedMessages } = useChatBox();
    const params = useParams();

    const handleSocketMessage = useCallback(
      async (data: Message) => {
        const chatP = params.chat;

        if (data.receiver != chat.id) {
          return;
        }

        if (!chatP || chatP != data.receiver) {
          handleUnreadedMessages(
            chat.id,
            user.id,
            chat.unreaded_messages,
            data
          );
        } else if (chatP === data.receiver && data.sender !== user.id) {
          await setReadedMessages(chat.id, user.id);
        }

        handleChats(data);
      },
      [
        chat.id,
        chat.unreaded_messages,
        handleChats,
        handleUnreadedMessages,
        params.chat,
        user.id,
      ]
    );

    useEffect(() => {
      socket.on("messageData", handleSocketMessage);

      return () => {
        socket.off("messageData", handleSocketMessage);
      };
    }, [handleSocketMessage]);

    return (
      <Link
        as={`/chats/${chat?.id}`}
        href={`/chats/${chat?.id}`}
        className="flex items-center p-3 hover:bg-gray-800 cursor-pointer w-full rounded"
      >
        <div className="w-9 h-9 rounded-full mr-1 bg-green-500 flex justify-center items-center">
          <ChatIcon className="text-xl" />
        </div>
        <div className="h-9 flex-col justify-center p-1">
          <h4 className="text-xs leading-none mb-1">{chat.name}</h4>
          <h5 className="text-xs text-gray-400 truncate max-w-36 leading-none">
            {chat.last_message
              ? chat.last_message.sender === user?.id
                ? "you: " + chat.last_message.body
                : chat.last_message.sender + ": " + chat.last_message.body
              : ""}
          </h5>
        </div>

        <span className="ml-auto mr-0 rounded-full bg-sky-500 py-1 px-2 text-xs">
          {chat.unreaded_messages.length}
        </span>
      </Link>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.chat.id === nextProps.chat.id &&
      prevProps.chat.name === nextProps.chat.name &&
      prevProps.chat.last_message?.sender ===
        nextProps.chat.last_message?.sender &&
      prevProps.chat.last_message?.body === nextProps.chat.last_message?.body &&
      prevProps.userInformation.id === nextProps.userInformation.id
    );
  }
);

export default ChatItem;
