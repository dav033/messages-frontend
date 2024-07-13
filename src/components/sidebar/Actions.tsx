"use client";

import { Profile } from "@/icons/Profile.icon";
import ActionItem from "./ActionItem";
import { Settings } from "@/icons/Settings.icon";
import { Home } from "@/icons/Home.icon";
import Dialog from "../Dialog/Dialog";
import { useState } from "react";
import DialogHeader from "../Dialog/DialogHeader";
import DialogTitle from "../Dialog/DialogTitle";
import DialogDescription from "../Dialog/DialogDescription";
import DialogFooter from "../Dialog/DialogFooter";
import Button from "../Button";

export default function Actions() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="text-black">
        <DialogHeader>
          <DialogTitle>Login to Access Content</DialogTitle>

          <DialogDescription>
            You need to log in or register to access the chat app.
          </DialogDescription>

          <div className="flex flex-col p-2">
            <Button className="mb-2" variant="outlined" color="black">
              Register whit current user
            </Button>
            <Button className="mb-2" variant="outlined" color="black">
              Register
            </Button>
            <Button variant="outlined" color="black">
              Login
            </Button>
          </div>

          <DialogFooter className="justify-center">
            <Button className="mx-auto" onClick={handleClose}> Cancel</Button>
          </DialogFooter>
        </DialogHeader>
      </Dialog>
      <ActionItem icon={Home} title="Home" to="/" />
      <ActionItem
        icon={Profile}
        title="Profile"
        to="/profile"
        handleOpen={handleOpen}
      />
      <ActionItem icon={Settings} title="Settings" to="/settings" />
    </div>
  );
}
