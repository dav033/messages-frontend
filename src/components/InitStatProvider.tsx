"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { useEffect } from "react";

export default function InitStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { registerTemporalUser, user } = useUserStore((state) => state);

  useEffect(() => {
    async function prueba() {
      await registerTemporalUser();
    }

    if (!user) {
      prueba();

      return () => {};
    }
  }, [registerTemporalUser]);
  return <>{children}</>;
}
