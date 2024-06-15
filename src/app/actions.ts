"use server";

import { revalidateTag } from "next/cache";

export async function revalidate(tag: string) {
  revalidateTag(tag);
}

export async function getData(id) {
  const res = await fetch(`http://localhost:8080/user_rooms/${id}`, {
    method: "GET",
    next: { tags: ["chats"] },
  });

  return res.json();
}

export async function sendMessage(message) {
  const res = await fetch(`http://localhost:8082/messages`, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export async function getMessagesByChat(chat) {
  const res = await fetch(`http://localhost:8082/messages/${chat}`, {
    method: "GET",
    next: { tags: ["messages"] },
    cache: "no-cache",
  });

  return res.json();
}

export async function getRooms() {
  const res = await fetch("http://localhost:8080/rooms", {
    method: "GET",
    next: { tags: ["rooms"] },
    cache: "force-cache",
  });

  return res.json();
}
