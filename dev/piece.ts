class Piece {

    public x: number;
    public y: number;

    public width: number;
    public height: number;

    public tail: Piece;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
    }

    moveToPoint(p: Piece) {
        if (this.tail != null) {
            this.tail.moveToPoint(this);
        }
        this.x = p.x;
        this.y = p.y;
    }

}