"use client";

import React, { useEffect, useRef, useState } from "react";
import MessageArea from "@/components/chat/MessageArea";

export default function Messages(props) {
  const { messagesData, chat } = props;

  const [messages, setMessages] = useState(() => {
    return messagesData;
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessages = (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const updateMessageId = (tempId, newId) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === tempId ? { ...msg, id: newId } : msg
      )
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 text-white overflow-auto h-full">
        {messages?.map((message) => (
          <div key={message.id}>{message.body}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageArea
        roomId={chat}
        handleMessages={handleMessages}
        updateMessageId={updateMessageId}
      />
    </div>
  );
}
