import axios from "axios";
import { revalidate } from "./app/actions";

const joinRoom = async (room_id, user_id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/add_user/${room_id}/${user_id}`
    );

    revalidate("chats");
    revalidate("rooms");

    return response.status;
  } catch (err) {
    console.error(err);
  }
};

async function getUserById(userId) {
  const res = await fetch(
    `http://localhost:4000/users/getUserByID?id=${userId}`,
    {
      method: "GET",
      next: { tags: ["user"] },
    }
  );

  return res.json();
}

async function getData(roomId) {
  const res = await fetch(`http://localhost:8080/user_rooms/${roomId}`, {
    method: "GET",
    next: { tags: ["chats"] },
  });

  return res.json();
}

const getMessagesByChat = async (chat) => {
  const inicio = performance.now();

  const res = await fetch(`http://localhost:8082/messages/${chat}`, {
    method: "GET",
    next: { tags: [`messages-${chat}`] },
  });

  const fin = performance.now();
  const tiempoTranscurrido = fin - inicio;
  console.log("Tiempo transcurrido: " + tiempoTranscurrido / 1000);

  return res.json();
};

async function sendMessage(message) {
  const res = await fetch(`http://localhost:8082/messages`, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export { joinRoom, getUserById, getData, getMessagesByChat, sendMessage };
