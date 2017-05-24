/// <reference path="Piece.ts"/>

class Food extends Piece {
    private game: Game;
    private food: Piece;

    constructor(game:Game){
        super(0,0);
        this.game = game;
    }

    // public placeFood() {

    //     var noOfTiles = (this.game.canvas.width / this.game.tileSize) * (this.game.canvas.height / this.game.tileSize);

    //     var a: Piece[] = new Array(noOfTiles);

    //     for (var i = 0; i < noOfTiles; i++) {
    //         var x = (i % (this.game.canvas.width / this.game.tileSize)) * this.game.tileSize;
    //         var y = (Math.floor(i / (this.game.canvas.width / this.game.tileSize))) * this.game.tileSize;
    //         if (i == 799) {
    //             var b = i;
    //         }
    //         a[i] = new Piece(x, y);
    //     }

    //     var snekParts: Piece[] = new Array();
    //     var p = this.game.snek.snekHead;

    //     while (p != null) {
    //         snekParts.push(p);
    //         p = p.tail;
    //     }

    //     var validPoints: Piece[] = new Array();

    //     for (var i = 0; i < a.length; i++) {
    //         if (!Util.pointInArray(a[i], snekParts)) validPoints.push(a[i]);
    //     }

    //     var newPointIndex = Util.randomInt(validPoints.length - 1, 0);
    //     this.food = validPoints[newPointIndex];
    //     //this.game.food = <Food>validPoints[newPointIndex];
    // }
}