"use client";
import { useUser } from "@/providers/UserContext";
import Link from "next/link";
import React, { useEffect } from "react";

interface Props {
  icon: React.ElementType;
  title: string;
  to: string;
  handleOpen?: () => void;
}

export default function ActionItem(props: Props) {
  const { icon: Icon, title, to, handleOpen } = props;
  const { user } = useUser();
  return (
    <Link
      className="flex justify-star items-center px-2 mb-2 hover:bg-gray-800 transition-bg duration-300 ease-in-out h-7 rounded"
      onClick={user?.temporal && handleOpen ? handleOpen : undefined}
      href={!handleOpen ? to : ""}
    >
      <Icon className="text-md mr-1" />

      <span className="text-sm">{title}</span>
    </Link>
  );
}
