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
    exist: boolean;
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
        this.exist = false;
        this.dist = 1000000;
        this.status = Status.EMPTY;
    }

    distWith(node: Node): number {
        return Math.abs(this.x - node.x) + Math.abs(this.y -node.y);
        //return Math.sqrt(Math.pow(this.x - node.x, 2) + Math.pow(this.y -node.y, 2));
    }

    equals(node: Node): boolean {
        return this.x == node.x && this.y == node.y;
    }
}

export class State {
    index: number;
    node: Node;
    previousState: State | undefined;

    constructor(node:Node) {
        this.index = 0;
        this.node = node;
        this.previousState = undefined;
    }

    setPreviousState(previousState: State) {
        this.index = previousState.index + 1;
        this.previousState = previousState;
    }
}

export class PriorityQueue {
    queue: State[] = [];

    constructor() {}

    push(node: State) {
        if(this.queue.length == 0){
            this.queue.push(node);
            return ;
        }
        let i = 0;
        while(i < this.queue.length && this.queue[i].node.dist + this.queue[i].index > node.node.dist + node.index) {
            ++i;
        }
        const tmp1 = this.queue.slice(0, i);
        const tmp2 = this.queue.slice(i, this.queue.length);
        this.queue = [...tmp1, node, ...tmp2];
    }

    pop(): State {
        return this.queue.pop() as State;
    }
}