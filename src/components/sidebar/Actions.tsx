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
import AuthDialog from "./AuthDialog";

export default function Actions() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <AuthDialog open={open} handleClose={handleClose} />
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
