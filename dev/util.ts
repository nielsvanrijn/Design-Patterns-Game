class Util {
    public static randomInt(upperRange: number, lowerRange: number): number {
        return Math.round((Math.floor(Math.random() * (upperRange - lowerRange + 1)) + lowerRange));
    }
    
    public static pointInArray(p: Piece, pieceArray: Piece[]): boolean {
        for (let i = 0; i < pieceArray.length; i++) {
            let pieceAtIndex = pieceArray[i];
            if (pieceAtIndex.x == p.x && pieceAtIndex.y == p.y) return true;
        }
        return false;
    }

    public static snekOutsideBounds(snek:Snek, canvas:HTMLCanvasElement): boolean {
        return  (snek.snekHead.x < 0 ||
                snek.snekHead.y < 0 ||
                snek.snekHead.x + snek.snekHead.width > canvas.width ||
                snek.snekHead.y + snek.snekHead.height > canvas.height);
    }

    public static snekTouchingItself(snek:Snek): boolean {
        let p = snek.snekHead.tail;

        while (p != null) {
            if (p.x == snek.snekHead.x &&
                p.y == snek.snekHead.y) return true;

            p = p.tail;
        }

        return false;
    }
}