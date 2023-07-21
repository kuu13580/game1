import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.Server(app);
const io = new Server(server);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("send message", (message) => {
    console.log(message);
  });
});