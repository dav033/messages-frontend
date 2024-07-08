"use client";

import { Chat } from "@/icons/Chat.icon";
import Button from "../Button";
import { joinRoom } from "@/petitions";
import { useUser } from "@/providers/UserContext";

interface Props {
  id: number;
  type_room: string;
  messages: number[];
  users: number[];
  name: string;
}

export default function RoomItem(props: Props) {
  const { id, type_room, name } = props;
  const { user } = useUser();

  const isTheUserInRoom = () => {
    if (user) {
      return props.users.includes(user.id);
    }
  };

  return (
    <div className="mb-6 bg-gray-900 p-4 rounded flex items-center ">
      <div className="w-10 h-10 p-1 mr-4 bg-yellow-500 rounded-full flex items-center justify-center">
        <Chat className="text-2xl" />
      </div>

      <div>
        <h3 className="font-medium">{name}</h3>

        <span className="text-sm text-gray-400">10 members, 5 online</span>
      </div>

      {!isTheUserInRoom() && (
        <Button
          onClick={() => joinRoom(id, user.id)}
          className="ml-auto"
          variant="filled"
          color="accent"
        >
          Join
        </Button>
      )}
    </div>
  );
}
