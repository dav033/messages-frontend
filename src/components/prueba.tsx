"use client";

import { useUser } from "@/providers/UserContext";
import SidebarServer from "./sidebar/SidebarServer";

export default function Prueba() {
  const user = useUser();

  return <SidebarServer />;
}
