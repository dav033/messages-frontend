import Sidebar from "./Sidebar";

export async function getData(id) {
  const res = await fetch(`http://localhost:8080/user_rooms/${id}`, {
    method: "GET",
    next: { tags: ["chats"] },
  });

  return res.json();
}

export default async function SidebarServer() {
  return <Sidebar />;
}
