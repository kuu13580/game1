const D_WIDTH = 800;
const D_HEIGHT = 600;

// // 1, Phaser3の設定データ
// const config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   physics: {
//       default: 'arcade',
//       arcade: {
//           gravity: { y: 200 }
//       }
//   },
//   scene: {
// 		preload: preload,// 素材の読み込み時の関数
// 		create: create,// 画面が作られた時の関数
// 	},
// };

// // 2, Phaser3オブジェクトを作る
// let phaser = new Phaser.Game(config);
import "phaser";

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
  }
}





// //Scene A
// export class SceneA extends Phaser.Scene {

//     constructor (){
//             super({ key: 'SceneA' });
//      }

  
//     create(){
      
//       let sceneName = this.add.text(400, 280, 'SceneA').setFontSize(80).setFontFamily("Arial").setOrigin(0.5).setInteractive();
      
//       let change = this.add.text(400, 350, 'Change Scene!').setFontSize(50).setFontFamily("Arial").setOrigin(0.5).setInteractive();
      
//       change.on('pointerdown', function (pointer) {
//       this.scene.start('Example');
//        }, this);
//      }
//   };
  
//   //Scene B
//  export class SceneB extends Phaser.Scene {
  
//     constructor (){
//             super({ key: 'SceneB' });
//      }
  
//     create(){
      
//       let sceneName = this.add.text(150, 70, 'SceneB').setFontSize(30).setFontFamily("Arial").setOrigin(0.5).setInteractive();
      
//       let change = this.add.text(150, 130, 'Change Scene!').setFontSize(20).setFontFamily("Arial").setOrigin(0.5).setInteractive();
      
//       change.on('pointerdown', function (pointer) {
//       this.scene.start('SceneA');
//        }, this);
//      }
     
//   };
  
