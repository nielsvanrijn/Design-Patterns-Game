class Point {

    x: number;
    y: number;

    width: number;
    height: number;

    tail: Point;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
    }

    moveToPoint(p: Point) {
        if (this.tail != null) {
            this.tail.moveToPoint(this);
        }
        this.x = p.x;
        this.y = p.y;
    }

}