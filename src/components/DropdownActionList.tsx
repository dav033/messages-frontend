"use client";
import { Arrowdrop } from "@/icons/ArrowDrop.icon";
import React, { useState } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function DropdownActionList(props: Props) {
  const { title, children } = props;
  const [open, setOpen] = useState(true);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div
        className="flex items-center justify-between px-1 py-2 cursor-pointer  text-white   hover:bg-gray-800 "
        onClick={handleToggle}
      >
        <span className="text-sm">
          {title} {open.valueOf()}
        </span>

        <Arrowdrop
          className={`transition-rotate duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`relative  transition-all duration-300 ${
          open ? "h-44 overflow-auto" : "h-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
