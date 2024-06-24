import DropdownActionList from "../DropdownActionList";
import Actions from "./Actions";
import Chats from "./Chats";
import Friends from "./Friends";
import { getUserById } from "../../petitions";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { getData } from "../../petitions";

export default async function Sidebar() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId");

  let user_res = null;
  let data_res = [];
  if (userId) {
    user_res = await getUserById(userId.value);
    data_res = await getData(userId.value);
  }

  return (
    <div className="bg-gray-900 w-[350px] h-[100vh] text-white px-3">
      <h1 className="font-bold px-3 py-7">Chat App</h1>

      <Actions />

      <DropdownActionList title="Friends">
        <Friends />
      </DropdownActionList>

      <DropdownActionList title="Chats">
        <Suspense fallback={<div>huw</div>}>
          <Chats chatsData={data_res} user={user_res} />
        </Suspense>
      </DropdownActionList>
    </div>
  );
}
