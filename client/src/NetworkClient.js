import { io } from "socket.io-client";

export default class CNetworkClient {
  constructor(url) {
    this.socket = io(url);
    console.log("network constructor");
    // 部屋の更新を通知
    this.socket.on("updateRoom", (room) => {
      console.log(room);
      document.getElementById("output").innerText = room.users.reduce((acc, cur, i) => {
        acc += `${cur.name}\n`;
        return acc;
      }, "参加者\n");
    });
  }
  
  send(identifier, ...data) {
    this.socket.emit(identifier, ...data);
  }

  receive(identifier) {
    return new Promise((resolve) => {
      this.socket.on(identifier, (res) => {
        resolve(res);
      });
    });
  }
}