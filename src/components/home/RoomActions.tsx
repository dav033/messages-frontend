"use client";

import { useState } from "react";
import Button from "../Button";
import Dialog from "../Dialog/Dialog";
import Search from "./Search";
import DialogHeader from "../Dialog/DialogHeader";
import DialogTitle from "../Dialog/DialogTitle";
import DialogDescription from "../Dialog/DialogDescription";
import Input from "../FormComponents/Input";
import DialogFooter from "../Dialog/DialogFooter";
import { useUser } from "@/providers/UserContext";
import axios from "axios";
import { revalidate } from "@/app/actions";

export default function RoomActions() {
  const [open, setOpen] = useState(false);

  const { user } = useUser();

  const createRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/create_room", {
        users: `[${user.id}]`,
        name: e.target.roomName.value,
        type_room: "public",
      });

      revalidate("rooms");
      revalidate("chats")

      close();
    } catch (err) {
      console.error(err);
    }
  };

  const close = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div className="w-full flex items-center p-4">
      <h2 className="text-white">Chat Rooms</h2>

      <Button
        onClick={openDialog}
        className="ml-auto mr-2"
        variant="filled"
        color="accent"
      >
        New Room
      </Button>

      <Search />

      <Dialog className="" open={open} onClose={close}>
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Enter the details for your new chat room.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={createRoom}>
          <div className="grid gap-4 mb-6">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="roomName"
                label="Room Name"
                placeholder="Enter room name"
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={close}>Cancel</Button>
            <Button type="submit" variant="filled">
              Create Room
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
