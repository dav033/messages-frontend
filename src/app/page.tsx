import Rooms from "@/components/home/Rooms";
import { Suspense } from "react";
import RoomActions from "@/components/home/RoomActions";

export default async function Home() {
  return (
    <div className="bg-gray-950 h-[100vh] overflow-auto relative">
      <RoomActions />
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <Rooms />
      </Suspense>
    </div>
  );
}
