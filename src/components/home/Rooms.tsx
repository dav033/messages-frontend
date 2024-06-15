"use server";
import RoomItem from "./RoomItem";
import { getRooms } from "@/app/actions";

export default async function Rooms() {
  const data = await getRooms();

  return (
    <div className="text-white py-4 px-8">
      {data.map((room: any) => (
        <RoomItem key={room.id} {...room} />
      ))}
    </div>
  );
}
