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

export { joinRoom, getMessagesByChat };
