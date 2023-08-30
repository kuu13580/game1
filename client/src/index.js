import "phaser";
import { Example, PlayerSelect } from "./scenes/Example";
import { Field } from "./scenes/Field"
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
  scene: [Field, Title, PlayerSelect, Example]
};

const game = new Phaser.Game(config);

const network = new CNetworkClient("localhost:3000");
// 作成
function debug() {
  const value = document.getElementById("input").value;
  if (value == "") {
    network.send("create", "user1");
    network.receive("updateRoom").then((room) => {
      document.getElementById("output").innerText = "created: " + room.id;
    });
  } else {
    network.send("enter", "user2", value);
    network.receive("updateRoom").then((room) => {
      document.getElementById("output").innerText = "joined: " + room.id;
    });
  }
  console.log("debug");
}
document.getElementById("btn").addEventListener("click", debug);
