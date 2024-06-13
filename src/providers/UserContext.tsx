"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/socket";

const userContext = createContext(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    } else {
      const registerTemporalUser = async () => {
        try {
          const response = await axios.post(
            "http://localhost:4000/users/register_temporal"
          );

          const userData = response.data;
          setUser(userData);
          localStorage.setItem("userData", JSON.stringify(userData));
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

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export const useUser = () => useContext(userContext);
