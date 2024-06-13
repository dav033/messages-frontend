"use server";
import RoomItem from "./RoomItem";
import { revalidate } from "@/app/actions";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getData() {
  const res = await fetch("http://localhost:8080/rooms", {
    method: "GET",
    next: { tags: ["rooms"] },
  });
  await sleep(1000);

  revalidate("rooms");

  return res.json();
}

export default async function Rooms() {
  const data = await getData();

  return (
    <div className="text-white py-4 px-8">
      {data.map((room: any) => (
        <RoomItem key={room.id} {...room} />
      ))}
    </div>
  );
}
