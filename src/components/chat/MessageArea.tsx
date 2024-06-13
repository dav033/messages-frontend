"use client";

import { Send } from "@/icons/Send.icon";
import { sendMessage } from "@/app/actions";
import Button from "../Button";
import { useUser } from "@/providers/UserContext";
import { socket } from "@/socket";

export default function MessageArea(props) {
  const { roomId } = props;
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target[0].value.trim();
    if (!message) return;

    console.log(message, user.id, roomId);

    const response = await sendMessage({
      body: message,
      typeM: "text",
      sender: user.id.toString(),
      receiver: roomId,
    });

    socket.emit("message", user.id)

    console.log(response);
  };

  return (
    <form
      className="mt-auto bg-transparent p-4 flex"
      onSubmit={handleSubmit} // Usar onSubmit en lugar de action
    >
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
