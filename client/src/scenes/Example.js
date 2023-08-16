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

// バトルフィールド共通
export class Field extends Phaser.Scene {
    constructor (){
        super({ key: 'Field' }
        );
    }

    create(){
        const r = 50;
        const xMargin = 10;
        const yMargin = 7
        const height = yMargin + 3 * r / 2;

        this.drawHexagonLine(200, 200, r, xMargin, 5);
        this.drawHexagonLine(200 + xMargin / 2 + SQRT3 * r / 2, 200 + height, r, xMargin, 5);
        this.drawHexagonLine(200, 200 + height * 2, r, xMargin, 5);
    }

    // 六角形を描画する
    drawHexagon(x, y, r) {
        const width = SQRT3 * r;
        const data = [[width/2,0], [width,r/2], [width,3*r/2], [width/2,2*r], [0,3*r/2], [0,r/2]];
        const hex = this.add.polygon(x, y, data, "0xffffff").setOrigin(0.5);
        return hex;
    }

    // n個六角形を描画する
    drawHexagonLine(x, y, r, margin, n) {
        for(let i = 0; i < n; i++){
            const X = x + margin * i + SQRT3 * r * i;
            this.drawHexagon(X, y, r);
        }
    }
};




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