var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Up"] = 2] = "Up";
    Direction[Direction["Down"] = 3] = "Down";
})(Direction || (Direction = {}));
var Game = (function () {
    function Game(canvas) {
        this.snekColor = 0;
        this.canvas = canvas;
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        this.tileSize = 30;
    }
    Game.prototype.start = function () {
        this.restart();
        setInterval(function () { return game.loop(); }, 100);
    };
    Game.prototype.restart = function () {
        this.snakeHead = new Point(30, 30);
        this.snakeHead.tail = new Point(30, 30);
        this.snakeHead.tail.tail = new Point(0, 30);
        this.direction = Direction.Right;
        this.placeFood();
    };
    Game.prototype.loop = function () {
        this.move();
        if (this.gameOver()) {
            this.restart();
        }
        this.draw();
    };
    Game.prototype.snakeOutsideBounds = function () {
        return (this.snakeHead.x < 0 ||
            this.snakeHead.y < 0 ||
            this.snakeHead.x + this.snakeHead.width > this.canvas.width ||
            this.snakeHead.y + this.snakeHead.height > this.canvas.height);
    };
    Game.prototype.snakeTouchingItself = function () {
        var p = this.snakeHead.tail;
        while (p != null) {
            if (p.x == this.snakeHead.x &&
                p.y == this.snakeHead.y)
                return true;
            p = p.tail;
        }
        return false;
    };
    Game.prototype.gameOver = function () {
        return this.snakeOutsideBounds() || this.snakeTouchingItself();
    };
    Game.prototype.draw = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var p = this.snakeHead;
        while (p != null) {
            this.context.fillStyle = "hsl(" + this.snekColor + ", 100%, 50%)";
            if (this.snekColor < 360) {
                this.snekColor = this.snekColor + 1;
            }
            else {
                this.snekColor = this.snekColor - 360;
            }
            this.context.fillRect(p.x, p.y, p.width - 1, p.height - 1);
            p = p.tail;
            this.context.fillStyle = "hsl(" + this.snekColor + ", 100%, 50%)";
        }
        this.context.fillRect(this.food.x, this.food.y, this.food.width - 1, this.food.height - 1);
    };
    Game.prototype.move = function () {
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
    };
    Game.prototype.moveLeft = function () {
        if (this.direction != Direction.Right)
            this.direction = Direction.Left;
    };
    Game.prototype.moveRight = function () {
        if (this.direction != Direction.Left)
            this.direction = Direction.Right;
    };
    Game.prototype.moveUp = function () {
        if (this.direction != Direction.Down)
            this.direction = Direction.Up;
    };
    Game.prototype.moveDown = function () {
        if (this.direction != Direction.Up)
            this.direction = Direction.Down;
    };
    Game.prototype.eat = function () {
        this.food.tail = this.snakeHead;
        this.snakeHead = this.food;
        this.placeFood();
    };
    Game.prototype.randomInt = function (upperRange, lowerRange) {
        return Math.round((Math.floor(Math.random() * (upperRange - lowerRange + 1)) + lowerRange));
    };
    Game.prototype.placeFood = function () {
        var noOfTiles = (this.canvas.width / this.tileSize) * (this.canvas.height / this.tileSize);
        var a = new Array(noOfTiles);
        for (var i = 0; i < noOfTiles; i++) {
            var x = (i % (this.canvas.width / this.tileSize)) * this.tileSize;
            var y = (Math.floor(i / (this.canvas.width / this.tileSize))) * this.tileSize;
            if (i == 799) {
                var b = i;
            }
            a[i] = new Point(x, y);
        }
        var snakeParts = new Array();
        var p = this.snakeHead;
        while (p != null) {
            snakeParts.push(p);
            p = p.tail;
        }
        var validPoints = new Array();
        for (var i = 0; i < a.length; i++) {
            if (!this.pointInArray(a[i], snakeParts))
                validPoints.push(a[i]);
        }
        var newPointIndex = this.randomInt(validPoints.length - 1, 0);
        this.food = validPoints[newPointIndex];
    };
    Game.prototype.pointInArray = function (p, pointArray) {
        for (var i = 0; i < pointArray.length; i++) {
            var pointAtIndex = pointArray[i];
            if (pointAtIndex.x == p.x && pointAtIndex.y == p.y)
                return true;
        }
        return false;
    };
    return Game;
}());
function keyboardListener(e) {
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
}
;
var game;
window.onload = function () {
    document.onkeydown = keyboardListener;
    var el = document.getElementById('game-canvas');
    game = new Game(el);
    game.start();
};
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
    }
    Point.prototype.moveToPoint = function (p) {
        if (this.tail != null) {
            this.tail.moveToPoint(this);
        }
        this.x = p.x;
        this.y = p.y;
    };
    return Point;
}());
//# sourceMappingURL=snake.js.map