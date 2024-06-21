"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/socket";
import { getCookie, setCookie } from "@/helpers";

const userContext = createContext(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const userIdFromCookie = getCookie("userId");

    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      setCookie("userId", JSON.parse(storedUserData).id, 7); // Almacena la cookie por 7 días
    } else if (userIdFromCookie) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/users/${userIdFromCookie}`
          );

          const userData = response.data;
          setUser(userData);
          setCookie("userId", userData, 7); // Almacena la cookie por 7 días

          localStorage.setItem("userData", JSON.stringify(userData));
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();
    } else {
      const registerTemporalUser = async () => {
        try {
          const response = await axios.post(
            "http://localhost:4000/users/register_temporal"
          );

          const userData = response.data;
          setUser(userData);
          localStorage.setItem("userData", JSON.stringify(userData));
          setCookie("userId", userData.id, 7); // Almacena la cookie por 7 días
        } catch (error) {
          console.error(error);
        }
      };

      registerTemporalUser();
    }
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit("login", user.id);
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [user]);

  useEffect(() => {
    socket.on("message", (data) => {
      const roomId = data.receiver;
      
    });
  });

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export const useUser = () => useContext(userContext);
