"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/socket";
import { getCookie, setCookie } from "@/helpers";
import { registerTemporal } from "@/petitions";
import { AuthResponse } from "@/types";
import { revalidate } from "@/app/actions";

const userContext = createContext(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthResponse>(null);

  const initNewUser = (newUser: AuthResponse) => {
    setUser(newUser);
    setCookie("userId", newUser.id, 7);
    revalidate("chats");
    localStorage.setItem("userData", JSON.stringify(newUser));
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
        const response: AuthResponse = await registerTemporal();
        setUser(response);
        setCookie("userId", response.id, 7);
        localStorage.setItem("userData", JSON.stringify(response));
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
        initNewUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export const useUser = () => useContext(userContext);
