"use client";

import Messages from "@/components/chat/Messages";
import { useEffect, useState } from "react";

import { getMessagesByChat } from "@/petitions";
import MessageArea from "@/components/chat/MessageArea";

export default function Chat({ params }) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessagesByChat(params.chat);
      setData(messages);
      setLoading(false);
    };

    fetchMessages();
  }, [params.chat]);

  const handleMessages = (msg) => {
    setData((prevData) => [...prevData, msg]);
  };

  const updateMessageId = (tempId, newId) => {
    setData((prevData) =>
      prevData.map((msg) => (msg.id === tempId ? { ...msg, id: newId } : msg))
    );
  };

  return (
    <div className="bg-gray-950 flex flex-col h-screen">
      {!loading && <Messages messagesData={data} chat={params.chat} />}
      <MessageArea
        roomId={params.chat}
        handleMessages={handleMessages}
        updateMessageId={updateMessageId}
      />
    </div>
  );
}
