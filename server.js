const http = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let connectedUsers = []; // Array to store connected users

app.prepare().then(() => {
  const httpServer = http.createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // console.log("a user connected", socket.id);

    // Handle user identification, for example through a login event
    socket.on("login", (userId) => {
      connectedUsers.push({ socketId: socket.id, userId: userId, rooms: [] });
      // console.log("User logged in: ", userId);
      // console.log("Connected users: ", connectedUsers);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
      connectedUsers = connectedUsers.filter(
        (user) => user.socketId !== socket.id
      );
      // console.log("Connected users: ", connectedUsers);
    });

    socket.on("joinRoom", (room) => {
      // console.log("ERE", room);
      socket.join(room);

      // user.rooms.push(room);
      // console.log(`User ${user.userId} joined room: ${room}`);
    });

    socket.on("message", (data) => {
      const { roomId, message } = data;

      // console.log("AWA", roomId, message);

      socket.to(roomId).emit("message", message);
    });
  });

  httpServer.once("error", (err) => {
    // console.error(err);
    process.exit(1);
  });

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}  ${dev ? "dev" : ""}`);
  });
});
