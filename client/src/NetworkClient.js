import { io } from "socket.io-client";

export default class CNetworkClient {
  constructor(url) {
    this.socket = io(url);
    console.log("network constructor");
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