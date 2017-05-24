/// <reference path="snek.ts"/>

class Game{
    private static instance: Game;

    public canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    
    public tileSize: number;
    private pauseDuration: number = 200;

    public snek: Snek;
    public food: Piece;

    //Get Instance of game or create one (SingleTon)
    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private constructor() {
        //Main Canvas of the game
        let canvas = <HTMLCanvasElement> document.getElementById('game-canvas');

        // Create Canvas
        this.canvas = canvas;
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");

        // Tilesize is based on canvas size. 600/30 means 20x20 grid
        this.tileSize = 30;

        // Create net instances of snek & food
        this.snek = new Snek();
        this.food = new Food();

        // Listen to keyboard input
        window.addEventListener("keydown", (e: KeyboardEvent) => this.keyboardListener(e));

        // Start te game
        this.start();
    }

    private start() {
        this.restart();
        setInterval(() => this.loop(), this.pauseDuration);
    }

    private restart() {
        // This restart function will spawn the snek & place a food somewhere on the grid
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

        let noOfTiles = (this.canvas.width / this.tileSize) * (this.canvas.height / this.tileSize);

        var a: Piece[] = new Array(noOfTiles);

        for (let i = 0; i < noOfTiles; i++) {
            let x = (i % (this.canvas.width / this.tileSize)) * this.tileSize;
            let y = (Math.floor(i / (this.canvas.width / this.tileSize))) * this.tileSize;
            if (i == 799) {
                let b = i;
            }
            a[i] = new Piece(x, y);
        }

        var snekParts: Piece[] = new Array();
        let p = this.snek.snekHead;

        while (p != null) {
            snekParts.push(p);
            p = p.tail;
        }

        let validPoints: Piece[] = new Array();

        for (let i = 0; i < a.length; i++) {
            if (!Util.pointInArray(a[i], snekParts)) validPoints.push(a[i]);
        }

        let newPointIndex = Util.randomInt(validPoints.length - 1, 0);
        this.food = validPoints[newPointIndex];
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

// load game
window.addEventListener("load", function () {
    Game.getInstance();
});