/// <reference path="Piece.ts"/>

enum Direction {
    Left, Right, Up, Down
}

class Snek extends Piece {
    public snekHead: Piece;
    public snekColor = 0;

    private direction: Direction;

    constructor(){
        super(0,0);
    }

    public restart(){
        this.snekHead = new Piece(60, 30);
        this.snekHead.tail = new Piece(30, 30);
        this.snekHead.tail.tail = new Piece(0, 30);

        this.direction = Direction.Right;
    }

    public move() {
        let g : Game = Game.getInstance();

        let xNew = this.snekHead.x;
        let yNew = this.snekHead.y;

        switch (this.direction) {
            case Direction.Left:
                xNew -= g.tileSize;
                break;
            case Direction.Right:
                xNew += g.tileSize;
                break;
            case Direction.Up:
                yNew -= g.tileSize;
                break;
            case Direction.Down:
                yNew += g.tileSize;
                break;
            default:
                break;
        }

        if (xNew == g.food.x &&
            yNew == g.food.y) {
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
        let g : Game = Game.getInstance();
        g.food.tail = this.snekHead;
        this.snekHead = g.food;

        g.placeFood();
    }
    
}