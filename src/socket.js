"use client";

import { io } from "socket.io-client";


//hacer que el socket se reconecte automaticamente
export const socket = io({ reconnection: true });
