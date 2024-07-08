import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";

export default function Messages(props) {
  const { messagesData } = props;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesData]);

  return (
    <div className="flex-1 text-white overflow-auto h-full">
      {messagesData?.map((message) => {
        //recuperar el manesaje anterior a este index
        const previousMessage = messagesData[messagesData.indexOf(message) - 1];

        let differentUser;

        if (previousMessage) {
          differentUser = previousMessage.sender !== message.sender;
        } else {
          differentUser = true;
        }

        return (
          <Message
            key={message.id}
            {...message}
            differentUser={differentUser}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
