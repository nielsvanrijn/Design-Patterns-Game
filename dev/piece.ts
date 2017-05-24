class Piece {

    public x: number;
    public y: number;

    public width: number = 30;
    public height: number = 30;

    public tail: Piece;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    moveToPoint(p: Piece) {
        if (this.tail != null) {
            this.tail.moveToPoint(this);
        }
        this.x = p.x;
        this.y = p.y;
    }

}