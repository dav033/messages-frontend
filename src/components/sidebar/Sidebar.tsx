"use client";
import { useUser } from "@/providers/UserContext";
import DropdownActionList from "../DropdownActionList";
import Actions from "./Actions";
import Chats from "./Chats";
import Friends from "./Friends";
import { useEffect, useState, useTransition } from "react";
import { getData } from "@/app/actions";

export default function Sidebar() {
  const { user } = useUser();

  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function fetchChats() {
      if (user) {
        const response = await getData(user.id);
        setChats(response);
      }
    }
    fetchChats();
  }, [user]);
  return (
    <div className="bg-gray-900 w-[350px] h-[100vh] text-white px-3">
      <h1 className="font-bold px-3 py-7">Chat App</h1>

      <Actions />

      <DropdownActionList title="Friends">
        <Friends />
      </DropdownActionList>

      <DropdownActionList title="Chats">
        <Chats chats={chats} />
      </DropdownActionList>
    </div>
  );
}
