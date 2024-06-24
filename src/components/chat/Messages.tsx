import React, { useEffect, useRef, useState } from "react";
import MessageArea from "@/components/chat/MessageArea";
import { revalidate } from "@/app/actions";

export default function Messages(props) {
  const { messagesData, chat } = props;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesData]);

  return (
    <div className="flex-1 text-white overflow-auto h-full">
      {messagesData?.map((message) => (
        <div key={message.id}>{message.body}</div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
