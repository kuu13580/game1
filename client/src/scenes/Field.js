// バトルフィールド共通
const SQRT3 = Math.sqrt(3);
export class Field extends Phaser.Scene {
    constructor (){
        super({ key: 'Field' }
        );
        this.setSettings(100,100,20,3,2);
    }
    
    // 設定を保存
    setSettings(x, y, r, xMargin, yMargin){
        this.settings = {
            "x": x,
            "y": y,
            "r": r,
            "xMargin": xMargin,
            "yMargin": yMargin
        }
    }

    create(){
        this.drawField(15, 10);
    }

    // 六角形を描画する
    drawHexagon(x, y) {
        const r = this.settings.r;
        const width = SQRT3 * r;
        const data = [[width/2,0], [width,r/2], [width,3*r/2], [width/2,2*r], [0,3*r/2], [0,r/2]];
        const hex = this.add.polygon(x, y, data, "0xffffff").setOrigin(0.5);
        return hex;
    }

    // n個六角形を描画する
    drawHexagonLine(x, y, n) {
        const r = this.settings.r;
        const margin = this.settings.xMargin;
        for(let i = 0; i < n; i++){
            const X = x + margin * i + SQRT3 * r * i;
            this.drawHexagon(X, y);
        }
    }

    // n✕m個の六角形を描画する
    drawField(n, m){
        const x = this.settings.x;
        const y = this.settings.y;
        const r = this.settings.r;
        const xMargin = this.settings.xMargin;
        const yMargin = this.settings.yMargin;
        const height = yMargin + 3 * r / 2;

        for (let i = 0; i < m; i++){
            const X = i % 2 == 0 ? x : x + xMargin / 2 + SQRT3 * r / 2;
            // if (i % 2 == 0){
            //     X = x;
            // } else {
            //     X = x + xMargin / 2 + SQRT3 * r / 2;
            // }
            const Y = y + height * i;
            this.drawHexagonLine(X, Y, n);
        }
    }
};