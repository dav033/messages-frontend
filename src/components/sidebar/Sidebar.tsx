"use server";
import DropdownActionList from "../DropdownActionList";
import Actions from "./Actions";
import Chats from "./Chats";
import Friends from "./Friends";
import { getData } from "@/app/actions";
import { cookies } from "next/headers";

export default async function Sidebar() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId");

  let data = [];
  if (userId) {
    data = await getData(userId.value);
  }

  return (
    <div className="bg-gray-900 w-[350px] h-[100vh] text-white px-3">
      <h1 className="font-bold px-3 py-7">Chat App</h1>

      <Actions />

      <DropdownActionList title="Friends">
        <Friends />
      </DropdownActionList>

      <DropdownActionList title="Chats">
        <Chats chats={data} />
      </DropdownActionList>
    </div>
  );
}
