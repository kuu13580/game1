import express from "express";
import { Server } from "socket.io";
import http from "http";

const PORT = 3000;

class CServer {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "http://127.0.0.1"
      }
    });
  }

  start() {
    this.io.on("connection", (socket) => {
      // send a message to the client
      socket.emit("first", "connect");
    });
  }

  setup() {
    this.server.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  }
}

const server = new CServer();
server.setup();
server.start();