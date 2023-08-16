const D_WIDTH = 800;
const D_HEIGHT = 600;

import "phaser";
import { Input } from "phaser";


export class Title extends Phaser.Scene {
  constructor (){
    super({key: "Title"});
  }
  preload(){
    console.log("preload!!");
    this.load.image('background', './assets/soviet flag small.png');
  }
  
  create(){
    console.log("create!!");
    const bgImage = this.add.image(D_WIDTH/2, D_HEIGHT/2, 'background');
    bgImage.setDisplaySize(D_WIDTH, D_HEIGHT);

    let sceneName = this.add.text(400, 280, 'Player').setFontSize(80).setFontFamily("Arial").setOrigin(0.5).setInteractive();
      
    let change = this.add.text(400, 350, 'Change Scene!').setFontSize(50).setFontFamily("Arial").setOrigin(0.5).setInteractive();
      
    change.on('pointerdown', function (pointer) {
    this.scene.start('Example');
    }, this);
  }
}
