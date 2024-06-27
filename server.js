const http = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let connectedUsers = [];

app.prepare().then(() => {
  const httpServer = http.createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("login", (userId) => {
      connectedUsers.push({ socketId: socket.id, userId: userId, rooms: [] });
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
      connectedUsers = connectedUsers.filter(
        (user) => user.socketId !== socket.id
      );
    });

    socket.on("joinRoom", (room) => {
      socket.join(room);
    });

    socket.on("message", (data) => {
      const { roomId, message } = data;

      socket.to(roomId).emit("message", message);
      socket.to(roomId).emit("messageData", message);
    });
  });

  httpServer.once("error", (err) => {
    process.exit(1);
  });

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}  ${dev ? "dev" : ""}`);
  });
});
