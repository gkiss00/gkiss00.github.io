export class Cell {
    top: Cell | null = null;
    bottom: Cell | null = null;
    right: Cell | null = null;
    left: Cell | null = null;
    topWall: boolean = true;
    bottomWall: boolean = true;
    rightWall: boolean = true;
    leftWall: boolean = true;
}