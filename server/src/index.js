import express from "express";
import { Server } from "socket.io";
import http from "http";

const PORT = 3000;

class CServer {
  constructor() {
    this.rooms = [];
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
      // 部屋作成
      socket.on("create", (userName) => {
        this.create(socket, userName);
      });
      // 部屋に入室する
      socket.on("enter", (userName, roomId) => {
        this.enter(socket, userName, roomId);
      });
    });
  }

  setup() {
    this.server.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  }

  create(socket, userName){
    if (userName == "") {
      this.io.to(socket.id).emit("notifyError", "名前を入力してください");
      return;
    }
    const roomId = this.generateRoomId();
    const user = { id: socket.id, name: userName, roomId: roomId };
    const room = {
      id: roomId,
      users: [user],
      turnUserIndex: 0,
    };
    this.rooms.push(room);
    socket.join(roomId);
    this.io.to(socket.id).emit("updateRoom", room);
    console.log("room", this.rooms, "created");
  }

  enter(socket, userName, roomId) {
    if (userName == "") {
      this.io.to(socket.id).emit("notifyError", "名前を入力してください");
      return;
    }
    const roomIndex = this.rooms.findIndex((r) => r.id == roomId);
    if (roomIndex == -1) {
      this.io.to(socket.id).emit("notifyError", "部屋が見つかりません");
      return;
    }
    const user = { id: socket.id, name: userName, roomId: Number(roomId) };
    this.rooms[roomIndex].users.push(user);
    socket.join(this.rooms[roomIndex].id);
    this.io.to(socket.id).emit("updateRoom", this.rooms[roomIndex]);
    console.log("room", this.rooms, "entered");
  }

  generateRoomId() {
    const id = Math.floor(Math.random() * 8999 + 1000);
    if (this.rooms.some((r) => r.id == id)) {
      // ランダムに生成したidが既に存在する場合は作り直す
      return generateRoomId();
    }
    return id;
  }
}


const server = new CServer();
server.setup();
server.start();