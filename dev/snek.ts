/// <reference path="Piece.ts"/>

class Snek extends Piece {

    private game: Game;
    private food: Food;

    public snekHead: Piece;
    public snekColor = 0;

    private direction: Direction;

    constructor(game:Game){
        super(0,0)
        this.game = game;
    }

    public restart(){
        this.snekHead = new Piece(60, 30);
        this.snekHead.tail = new Piece(30, 30);
        this.snekHead.tail.tail = new Piece(0, 30);

        this.direction = Direction.Right;
    }

    public move() {

        var xNew = this.snekHead.x;
        var yNew = this.snekHead.y;

        switch (this.direction) {
            case Direction.Left:
                xNew -= this.game.tileSize;
                break;
            case Direction.Right:
                xNew += this.game.tileSize;
                break;
            case Direction.Up:
                yNew -= this.game.tileSize;
                break;
            case Direction.Down:
                yNew += this.game.tileSize;
                break;
            default:
                break;
        }

        if (xNew == this.game.food.x &&
            yNew == this.game.food.y) {
            this.eat();
        }
        else {
            this.snekHead.tail.moveToPoint(this.snekHead);
            this.snekHead.x = xNew;
            this.snekHead.y = yNew;
        }
    }
    
    moveLeft() {
        if (this.direction != Direction.Right) this.direction = Direction.Left;
    }

    moveRight() {
        if (this.direction != Direction.Left) this.direction = Direction.Right;
    }

    moveUp() {
        if (this.direction != Direction.Down) this.direction = Direction.Up;
    }

    moveDown() {
        if (this.direction != Direction.Up) this.direction = Direction.Down;
    }
    
    eat() {        
        this.game.food.tail = this.snekHead;
        this.snekHead = this.game.food;

        this.game.placeFood();
    }
    
}