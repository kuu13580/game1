import "phaser";
import { Example } from "./scenes/Example";
import { Title } from "./scenes/Title";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 }
      }
  },
  scene: [Title, Example]
};

const game = new Phaser.Game(config);


import { io } from "socket.io-client";

const socket = io("localhost:3000");

// receive a message from the server
socket.on("hello from server", (...args) => {
  console.log(args);
});

