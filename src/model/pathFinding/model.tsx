export default class Node {
    y: number;
    x:number;
    up: Node | null;
    down: Node | null;
    left: Node | null;
    right: Node | null;
    check: boolean;
    dist: number;
    status: Status;

    constructor(y: number, x:number) {
        this.y = y;
        this.x = x;
        this.up = null;
        this.down = null;
        this.left = null;
        this.right = null;
        this.check = false;
        this.dist = 1000000;
        this.status = Status.EMPTY;
    }
}

export enum Status {
    EMPTY,
    BLOCKED,
    START,
    END
}