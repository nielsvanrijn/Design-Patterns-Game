enum Direction {
    Left, Right, Up, Down
}
class Game{
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    snakeHead: Point;
    food: Point;

    direction: Direction;
    
    tileSize: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");

        this.tileSize = 30;       
    }

    start() {
        this.restart();
        setInterval(() => game.loop(), 100);
    }

    restart() {
        this.snakeHead = new Point(60, 30);
        this.snakeHead.tail = new Point(30, 30);
        this.snakeHead.tail.tail = new Point(0, 30);

        this.direction = Direction.Right;

        this.placeFood();
    }

    loop(): void {
        this.move();

        if (this.gameOver()) {
            this.restart();
        }

        this.draw();
    }

    snakeOutsideBounds(): boolean {
        return  (this.snakeHead.x < 0 ||
                this.snakeHead.y < 0 ||
                this.snakeHead.x + this.snakeHead.width > this.canvas.width ||
                this.snakeHead.y + this.snakeHead.height > this.canvas.height);
    }

    snakeTouchingItself(): boolean {
        var p = this.snakeHead.tail;

        while (p != null) {
            if (p.x == this.snakeHead.x &&
                p.y == this.snakeHead.y) return true;

            p = p.tail;
        }

        return false;
    }

    gameOver(): boolean {
        return this.snakeOutsideBounds() || this.snakeTouchingItself();
    }
    private snekColor = 0;
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var p = this.snakeHead;

        while (p != null) {
            
            this.context.fillStyle = "hsl("+this.snekColor+", 100%, 50%)" ;
            if(this.snekColor < 360){
                this.snekColor = this.snekColor + 1;
            }else{
                this.snekColor = this.snekColor - 360;
            }
            
            this.context.fillRect(p.x, p.y, p.width-1, p.height-1);
            p = p.tail;
            
            this.context.fillStyle = "hsl("+(360-this.snekColor)+", 100%, 50%)" ;
        }

        this.context.fillRect(this.food.x, this.food.y, this.food.width-1, this.food.height-1);
        
    }

    move() {

        var xNew = this.snakeHead.x;
        var yNew = this.snakeHead.y;

        switch (this.direction) {
            case Direction.Left:
                xNew -= this.tileSize;
                break;
            case Direction.Right:
                xNew += this.tileSize;
                break;
            case Direction.Up:
                yNew -= this.tileSize;
                break;
            case Direction.Down:
                yNew += this.tileSize;
                break;
            default:
                break;
        }

        if (xNew == this.food.x &&
            yNew == this.food.y) {
            this.eat();
        }
        else {
            this.snakeHead.tail.moveToPoint(this.snakeHead);
            this.snakeHead.x = xNew;
            this.snakeHead.y = yNew;
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
        this.food.tail = this.snakeHead;
        this.snakeHead = this.food;

        this.placeFood();
    }

    randomInt(upperRange: number, lowerRange: number): number {
        return Math.round((Math.floor(Math.random() * (upperRange - lowerRange + 1)) + lowerRange));
    }

    placeFood() {

        var noOfTiles = (this.canvas.width / this.tileSize) * (this.canvas.height / this.tileSize);

        var a: Point[] = new Array(noOfTiles);

        for (var i = 0; i < noOfTiles; i++) {
            var x = (i % (this.canvas.width / this.tileSize)) * this.tileSize;
            var y = (Math.floor(i / (this.canvas.width / this.tileSize))) * this.tileSize;
            if (i == 799) {
                var b = i;
            }
            a[i] = new Point(x, y);
        }

        var snakeParts: Point[] = new Array();
        var p = this.snakeHead;

        while (p != null) {
            snakeParts.push(p);
            p = p.tail;
        }

        var validPoints: Point[] = new Array();

        for (var i = 0; i < a.length; i++) {
            if (!this.pointInArray(a[i], snakeParts)) validPoints.push(a[i]);
        }

        var newPointIndex = this.randomInt(validPoints.length - 1, 0);
        this.food = validPoints[newPointIndex];
    }

    pointInArray(p: Point, pointArray: Point[]): boolean {
        for (var i = 0; i < pointArray.length; i++) {
            var pointAtIndex = pointArray[i];
            if (pointAtIndex.x == p.x && pointAtIndex.y == p.y) return true;
        }
        return false;
    }
}

function keyboardListener(e: KeyboardEvent) {
    if (e.keyCode == 37) {
        game.moveLeft();
    }
    else if (e.keyCode == 39) {
        game.moveRight();
    }
    else if (e.keyCode == 38) {
        game.moveUp();
    }
    else if (e.keyCode == 40) {
        game.moveDown();
    }

};

var game: Game;

window.onload = () => {
    document.onkeydown = keyboardListener;

    var el = <HTMLCanvasElement> document.getElementById('game-canvas');
    game = new Game(el);
    game.start();
};