/// <reference path="snek.ts"/>
enum Direction {
    Left, Right, Up, Down
}
class Game{
    private static instance: Game;
    public canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    
    public tileSize: number;
    private pauseDuration: number = 200;

    public snek: Snek;
    public food: Piece;
    private util: Util

    constructor(canvas: HTMLCanvasElement) {
        window.addEventListener("keydown", (e: KeyboardEvent) => this.keyboardListener(e));

        this.canvas = canvas;
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");

        this.tileSize = 30;

        this.snek = new Snek(this);
        this.food = new Food(this);

        this.start();
    }

    private start() {
        this.restart();
        setInterval(() => game.loop(), this.pauseDuration);
    }

    private restart() {
        this.snek.restart();
        this.placeFood();
    }

    private loop(): void {
        this.snek.move();

        if (this.gameOver()) {
            this.restart();
        }

        this.draw();
    }

    public placeFood() {

        var noOfTiles = (this.canvas.width / this.tileSize) * (this.canvas.height / this.tileSize);

        var a: Piece[] = new Array(noOfTiles);

        for (var i = 0; i < noOfTiles; i++) {
            var x = (i % (this.canvas.width / this.tileSize)) * this.tileSize;
            var y = (Math.floor(i / (this.canvas.width / this.tileSize))) * this.tileSize;
            if (i == 799) {
                var b = i;
            }
            a[i] = new Piece(x, y);
        }

        var snekParts: Piece[] = new Array();
        var p = this.snek.snekHead;

        while (p != null) {
            snekParts.push(p);
            p = p.tail;
        }

        var validPoints: Piece[] = new Array();

        for (var i = 0; i < a.length; i++) {
            if (!Util.pointInArray(a[i], snekParts)) validPoints.push(a[i]);
        }

        var newPointIndex = Util.randomInt(validPoints.length - 1, 0);
        this.food = validPoints[newPointIndex];
        //this.food = <Food>validPoints[newPointIndex];
    }

    private gameOver(): boolean {
        return Util.snekOutsideBounds(this.snek, this.canvas) || Util.snekTouchingItself(this.snek);
    }

    private draw() {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let p = this.snek.snekHead;

        while (p != null) {
            
            this.context.fillStyle = "hsl("+this.snek.snekColor+", 100%, 50%)" ;
            if(this.snek.snekColor < 360){
                this.snek.snekColor = this.snek.snekColor + 0.5;
            }else{
                this.snek.snekColor = this.snek.snekColor - 360;
            }
            
            this.context.fillRect(p.x, p.y, p.width-1, p.height-1);
            p = p.tail;
            
            this.context.fillStyle = "hsl("+(360-this.snek.snekColor)+", 100%, 50%)" ;
        }

        this.context.fillRect(this.food.x, this.food.y, this.food.width-1, this.food.height-1);
        
    }
    private keyboardListener(e: KeyboardEvent) {
        if (e.keyCode == 37) {
            this.snek.moveLeft();
        }
        else if (e.keyCode == 39) {
            this.snek.moveRight();
        }
        else if (e.keyCode == 38) {
            this.snek.moveUp();
        }
        else if (e.keyCode == 40) {
            this.snek.moveDown();
        }
    }

}

var game: Game;

//load
window.onload = () => {
    var el = <HTMLCanvasElement> document.getElementById('game-canvas');
    game = new Game(el);
};