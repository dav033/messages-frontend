"use client"

import { Profile } from "@/icons/Profile.icon";
import ActionItem from "./ActionItem";
import { Settings } from "@/icons/Settings.icon";
import { Home } from "@/icons/Home.icon";

export default function Actions() {
  return (
    <div>
      <ActionItem icon={Home} title="Home" to="/" />
      <ActionItem icon={Profile} title="Profile" to="/profile" />
      <ActionItem icon={Settings} title="Settings" to="/settings" />
    </div>
  );
}
