import "phaser";
import { Example } from "./scenes/Example";
import { Title } from "./scenes/Title";
import CNetworkClient from "./NetworkClient";

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

const network = new CNetworkClient("localhost:3000");
network.receive("first").then((res) => {
  console.log(res);
});
