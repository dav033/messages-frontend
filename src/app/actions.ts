"use server";

import { revalidateTag } from "next/cache";

export async function revalidate(tag: string) {
  revalidateTag(tag);
}

export async function getRooms() {
  const res = await fetch("http://localhost:8080/rooms", {
    method: "GET",
    next: { tags: ["rooms"] },
    cache: "no-cache",
  });

  return res.json();
}
