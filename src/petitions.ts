import axios from "axios";
import { revalidate } from "./app/actions";
import { AuthResponse } from "./types";

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

async function getData(user_id) {
  const res = await fetch(`http://localhost:8080/user_rooms/${user_id}`, {
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

async function setReadedMessages(roomId, userId) {
  const res = await fetch(
    `http://localhost:8082/messages/set_readed/${roomId}/${userId}`,
    {
      method: "PUT",
    }
  );
}

async function getRooms() {
  const res = await fetch("http://localhost:8080/rooms", {
    method: "GET",
    next: { tags: ["rooms"] },
  });

  return res.json();
}

async function registerTemporal(): Promise<AuthResponse> {
  const res = await fetch("http://localhost:4000/users/register_temporal", {
    method: "POST",
    next: { tags: ["user"] },
  });

  return res.json();
}

async function registerCurrentUser(
  user_id: number,
  username: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(
    `http://localhost:4000/users/update_user_type/${user_id}`,

    {
      method: "PUT",
      body: JSON.stringify({
        username,
        password,
      }),
      next: { tags: ["user"] },
    }
  );

  return res.json();
}

async function register(name: string, password: string): Promise<AuthResponse> {
  const res = await fetch("http://localhost:4000/users/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

async function login(name: string, password: string): Promise<AuthResponse> {
  const res = await fetch("http://localhost:3004/users/login", {
    method: "POST",
    body: JSON.stringify({
      name,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export {
  setReadedMessages,
  register,
  joinRoom,
  getUserById,
  login,
  getData,
  getMessagesByChat,
  sendMessage,
  getRooms,
  registerTemporal,
  registerCurrentUser,
};
