"use client";

import { revalidate } from "@/app/actions";
import { Chat } from "@/icons/Chat.icon";
import { socket } from "@/socket";
import Link from "next/link";
import { useEffect } from "react";

export default function ChatItem({ chat }: any) {
  const { id } = chat;

  return (
    <Link
      onClick={() => {
        revalidate("messages")
      }}
      prefetch={false}
      href={`/chats/${chat.id}`}
      className="flex items-center p-3 hover:bg-gray-800 cursor-pointer w-full rounded"
    >
      <div className="w-9 h-9 rounded-full mr-1 bg-green-500 flex justify-center items-center">
        <Chat className="text-xl" />
      </div>
      <div className="bg-red- h-9 flex-col justify-center p-1">
        <h4 className="text-xs bg-blue- leading-none mb-1">{chat.name}</h4>
        <h5 className="text-xs text-gray-400 bg-purple- leading-none">
          you: hey
        </h5>
      </div>
    </Link>
  );
}
