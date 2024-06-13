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
  console.log(message);
  const res = await fetch(`http://localhost:8082/messages`, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res);

  return res.json();
}

export async function obtenerItem(id) {
  return id;
}
