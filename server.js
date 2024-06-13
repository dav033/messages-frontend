const http = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev });
const handler = app.getRequestHandler();

let connectedUsers = []; // Array to store connected users

app.prepare().then(() => {
  const httpServer = http.createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    // Handle user identification, for example through a login event
    socket.on("login", (userId) => {
      connectedUsers.push({ socketId: socket.id, userId: userId });
      console.log("User logged in: ", userId);
      console.log("Connected users: ", connectedUsers);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
      connectedUsers = connectedUsers.filter(
        (user) => user.socketId !== socket.id
      );
      console.log("Connected users: ", connectedUsers);
    });

    socket.on("message", (userId) => {
      console.log(
        "the user" + userId + "whith socket id" + socket.id + "send a message"
      );
    });
  });

  httpServer.once("error", (err) => {
    console.error(err);
    process.exit(1);
  });

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
