"use client";

import Messages from "@/components/chat/Messages";
import { useEffect, useState } from "react";
import { getMessagesByChat, setReadedMessages } from "@/petitions";
import MessageArea from "@/components/chat/MessageArea";
import { useUser } from "@/providers/UserContext";

export default function Chat({ params }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const storedMessages = localStorage.getItem(`messages_${params.chat}`);
    if (storedMessages) {
      setData(JSON.parse(storedMessages));
      setLoading(false);
    }

    const fetchMessages = async () => {
      const messages = await getMessagesByChat(params.chat);
      setData(messages);
      localStorage.setItem(`messages_${params.chat}`, JSON.stringify(messages));
      setLoading(false);
    };

    fetchMessages();
  }, [params.chat]);

  useEffect(() => {
    if (user) {
      console.log("setReadedMessages");
      const owo = setReadedMessages(params.chat, user.id);
    }
  }, [user, params.chat]);

  const handleMessages = (msg) => {
    setData((prevData) => {
      const updatedData = [...prevData, msg];
      localStorage.setItem(
        `messages_${params.chat}`,
        JSON.stringify(updatedData)
      );
      return updatedData;
    });
  };

  const updateMessageId = (tempId, newId) => {
    setData((prevData) => {
      const updatedData = prevData.map((msg) =>
        msg.id === tempId ? { ...msg, id: newId } : msg
      );
      localStorage.setItem(
        `messages_${params.chat}`,
        JSON.stringify(updatedData)
      );
      return updatedData;
    });
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
