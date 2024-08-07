"use client";

import { Send } from "@/icons/Send.icon";
import { sendMessage } from "../../petitions";
import Button from "../Button";
import { useUser } from "@/providers/UserContext";
import { socket } from "@/socket";
import { useEffect } from "react";
import { useChatBox } from "@/providers/ChatBoxContext";

export default function MessageArea(props) {
  const { roomId, handleMessages, updateMessageId } = props;
  const { user } = useUser();
  const { handleChats } = useChatBox();
  useEffect(() => {
    socket.on("message", (data) => {
      if (data.receiver !== roomId) {
        return;
      } else {
        handleMessages(data);
      }
    });

    return () => {
      socket.off("message");
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target[0].value.trim();
    if (!message) return;
    e.target[0].value = "";

    const tempId = `temp-${Date.now()}`;
    const msg = {
      id: tempId,
      body: message,
      typeM: "text",
      sender: user.id.toString(),
      sender_name: user.name,
      receiver: roomId,
      datetime: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    handleMessages(msg);
    handleChats(msg);

    const response = await sendMessage({
      body: message,
      typeM: "text",
      sender: user.id.toString(),
      sender_name: user.name,
      receiver: roomId,
    });

    if (response?.id) {
      updateMessageId(tempId, response.id);
    }

    socket.emit("message", {
      roomId: roomId,
      message: { ...msg, id: response?.id || tempId },
    });
  };

  return (
    <form className="mt-auto bg-transparent p-4 flex" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex h-10 w-full mr-2 rounded-md border text-white border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 border-none"
      />

      <Button variant="filled" color="accent" className="p-1" type="submit">
        <Send className="text-white text-2xl " />
      </Button>
    </form>
  );
}
