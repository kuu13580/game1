import "phaser";

const SQRT3 = Math.sqrt(3);

export class Example extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'Example'});
    }

    preload ()
    {
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    create ()
    {
      this.add.image(400, 300, 'sky');

      const particles = this.add.particles(0, 0, 'red', {
          speed: 100,
          scale: { start: 1, end: 0 },
          blendMode: 'ADD'
      });

      const logo = this.physics.add.image(400, 100, 'logo');

      logo.setVelocity(100, 200);
      logo.setBounce(1, 1);
      logo.setCollideWorldBounds(true);

      particles.startFollow(logo);
    }
}




export class PlayerSelect extends Phaser.Scene {
constructor (){
    super({ key: 'PlayerSelect' });
}


create(){
    let text = this.add.text(30, 30, "Player1")    
    let change = this.add.text(400, 350, 'Change Scene!').setFontSize(50).setFontFamily("Arial").setOrigin(0.5).setInteractive();
    
    change.on('pointerdown', function (pointer) {
    this.scene.start('Field');
        }, this)
    }
};