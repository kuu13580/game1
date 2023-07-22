//Scene A
export class SceneA extends Phaser.Scene {

    constructor (){
            super({ key: 'SceneA' });
     }
  
    create(){
      
      let sceneName = this.add.text(400, 280, 'SceneA').setFontSize(80).setFontFamily("Arial").setOrigin(0.5).setInteractive();
      
      let change = this.add.text(400, 350, 'Change Scene!').setFontSize(50).setFontFamily("Arial").setOrigin(0.5).setInteractive();
      
      change.on('pointerdown', function (pointer) {
      this.scene.start('Example');
       }, this);
     }
  };
  
  //Scene B
 export class SceneB extends Phaser.Scene {
  
    constructor (){
            super({ key: 'SceneB' });
     }
  
    create(){
      
      let sceneName = this.add.text(150, 70, 'SceneB').setFontSize(30).setFontFamily("Arial").setOrigin(0.5).setInteractive();
      
      let change = this.add.text(150, 130, 'Change Scene!').setFontSize(20).setFontFamily("Arial").setOrigin(0.5).setInteractive();
      
      change.on('pointerdown', function (pointer) {
      this.scene.start('SceneA');
       }, this);
     }
     
  };
  
