"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/socket";
import { getCookie, setCookie } from "@/helpers";
import { Message } from "@/types";

const userContext = createContext(null);

interface UnreadedMessages {
  roomId: string;
  messages: Message[];
}

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [lastMessages, setLastMessages] = useState([]);
  const [unreadedMessages, setUnreadedMessages] = useState<UnreadedMessages[]>(
    []
  );

  const handleUnreadedMessages = (
    roomId,
    userId,
    initialUnread: Message[],
    msg?: Message
  ) => {
    if (msg) {
      setUnreadedMessages((prevData) => {
        const roomIndex = prevData.findIndex((room) => room.roomId == roomId);
  
        if (roomIndex !== -1) {
          // Crear una copia del array de mensajes y añadir el nuevo mensaje
          const newMessages = [...prevData[roomIndex].messages, msg];
          
          // Crear una copia del objeto de la sala actualizada
          const updatedRoom = {
            ...prevData[roomIndex],
            messages: newMessages,
          };
  
          // Crear una copia del array de datos previos con la sala actualizada
          return [
            ...prevData.slice(0, roomIndex),
            updatedRoom,
            ...prevData.slice(roomIndex + 1),
          ];
        } else {
          // Si la sala no existe, crear una nueva
          return [
            ...prevData,
            { roomId: roomId, messages: [...initialUnread, msg] },
          ];
        }
      });
    }
  };
  

  const handleChats = (message) => {
    setLastMessages((prevData) => {
      const newMessages = [...prevData];
      const existingMessageIndex = newMessages.findIndex(
        (msg) => msg.receiver === message.receiver
      );

      if (existingMessageIndex !== -1) {
        newMessages.splice(existingMessageIndex, 1);
      }

      newMessages.unshift(message);

      return newMessages;
    });
  };

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/${userId}`
        );
        const userData = response.data;
        setUser(userData);
        setCookie("userId", userData.id, 7);
        localStorage.setItem("userData", JSON.stringify(userData));
      } catch (error) {
        console.error(error);
      }
    };

    const registerTemporalUser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/users/register_temporal"
        );
        const userData = response.data;
        setUser(userData);
        setCookie("userId", userData.id, 7);
        localStorage.setItem("userData", JSON.stringify(userData));
      } catch (error) {
        console.error(error);
      }
    };

    const initUser = async () => {
      const inicio = performance.now();
      const storedUserData = localStorage.getItem("userData");
      const userIdFromCookie = getCookie("userId");

      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUser(userData);
        setCookie("userId", userData.id, 7);

        const tiempoTranscurrido = performance.now() - inicio;
        console.log("Tiempo transcurrido: " + tiempoTranscurrido / 1000);
      } else if (userIdFromCookie) {
        await fetchUserData(userIdFromCookie);
      } else {
        await registerTemporalUser();
      }
    };

    initUser();
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit("login", user.id);

      socket.on("message", (data) => {
        const roomId = data.receiver;
      });

      return () => {
        socket.off("message");
      };
    }
  }, [user]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        lastMessages,
        handleChats,
        unreadedMessages,
        handleUnreadedMessages,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export const useUser = () => useContext(userContext);
