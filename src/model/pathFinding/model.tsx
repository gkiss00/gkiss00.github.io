export enum Status {
    EMPTY,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    BLOCKED,
    START,
    END
}

export default class Node {
    x:number;
    y: number;
    up: Node | null;
    down: Node | null;
    left: Node | null;
    right: Node | null;
    check: boolean;
    dist: number;
    status: Status;

    constructor(x:number, y: number) {
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

    distWith(node: Node) {
        return Math.abs(this.x -node.x) + Math.abs(this.y -node.y);
    }
}

export class State {
    node: Node;
    previousState: State | undefined;

    constructor(node:Node) {
        this.node = node;
        this.previousState = undefined;
    }
}

export class PriorityQueue {
    queue: State[] = [];

    constructor() {
        console.log("constructor 2", this.queue)
    }

    push(node: State) {
        this.queue.push(node);
        this.queue.sort(function(a:State, b:State) {
            return b.node.dist - a.node.dist;
        });
    }

    pop(): State {
        return this.queue.pop() as State;
    }
}