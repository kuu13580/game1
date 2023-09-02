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
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  if (!name || !password) return;
  network.send("join", name, password);
  network.receive("updateRoom").then((room) => {
    document.getElementById("output").innerText = "joined";
    document.getElementById("name").setAttribute("disabled", true);
    document.getElementById("password").setAttribute("disabled", true);
    document.getElementById("btn").setAttribute("disabled", true);
  });
}
document.getElementById("btn").addEventListener("click", debug);
