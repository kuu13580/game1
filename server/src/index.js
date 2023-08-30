import express from "express";
import { Server } from "socket.io";
import http from "http";
import { disconnect } from "process";

const PORT = 3000;

class CServer {
  constructor() {
    this.rooms = [];
    this.users = [];
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
      // 接続切断時
      socket.on("disconnect", () => {
        this.disconnect(socket);
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
    this.users.push(user);
    socket.join(roomId);
    this.io.to(socket.id).emit("updateRoom", room);
    console.log("\ncreated\n", "rooms", this.rooms);
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
    this.users.push(user);
    socket.join(this.rooms[roomIndex].id);
    this.io.to(socket.id).emit("updateRoom", this.rooms[roomIndex]);
    console.log("\nentered\n", "room", this.rooms[roomIndex]);
  }

  generateRoomId() {
    const id = Math.floor(Math.random() * 8999 + 1000);
    if (this.rooms.some((r) => r.id == id)) {
      // ランダムに生成したidが既に存在する場合は作り直す
      return generateRoomId();
    }
    return id;
  }

  disconnect(socket) {
    const user = this.users.find((u) => u.id == socket.id);
    if (!user) return;
    const roomIndex = this.rooms.findIndex((r) => r.id == user.roomId);
    if (roomIndex == -1) return;
    const room = this.rooms[roomIndex];
    const userIndexInRoom = room.users.findIndex((u) => u.id == socket.id);
    if (userIndexInRoom == -1) return;
    // ユーザーを削除
    room.users.splice(userIndexInRoom, 1);
    // ルームに誰もいなくなったら削除
    if (room.users.length == 0) {
      this.rooms.splice(roomIndex, 1);
    } else {
      // ルームのユーザーに変更を通知
      this.io.to(room.id).emit("updateRoom", room);
    }
    console.log("\ndisconnected\nuser", user, "\nroom", room);
  }
}


const server = new CServer();
server.setup();
server.start();