"use client";

import ChatItem from "./ChatItem";

export default function Chats({ chats }: any) {
  console.log(chats);

  
  return (
    <div>
      {chats.map((chat: any) => {
        return <ChatItem key={chat.id} chat={chat} />;
      })}
    </div>
  );
}
