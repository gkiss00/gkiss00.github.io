import React, {useState, useEffect} from "react";
import { runInContext } from "vm";
import Node, {Status, State, PriorityQueue} from "../../../model/pathFinding/model";
import './PathFindingPage.scss'

const PathFindingPage: React.FC<any> = () => {
    const [width, setWidth] = useState<number>(40);
    const [height, setHeight] = useState<number>(30);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [selectStatus, setSelectedStatus] = useState<number>(0);

    const status: (string |Status)[] = Object.values(Status);

    function initNodes() {
        const n: Node[] = [];
        for(let y = 0; y < height; ++y) {
            for(let x = 0; x < width; ++x) {
                n.push(new Node(x, y));
            }
        }
        setNodes(n);
    }

    function getNode(x: number, y: number) {
        return nodes[(y * width) + x];
    }

    const changeStatus = (event: any) =>{
        /*event.preventDefault();
        const cellId: string = event.target.id;
        const coords = cellId.split("-");
        const x = Number(coords[0]);
        const y = Number(coords[1]);
        const n: Node = nodes[(y * width) + x];
        console.log(n);
        document.getElementById(cellId)?.classList.add("startPoint");
        const elem: HTMLElement | null = document.getElementById(cellId);
        if(elem)
            elem.style.backgroundColor = "green";
        //document.getElementById(cellId)?.style.backgroundColor = "green";
        console.log(document.getElementById(cellId)?.classList);
        */
    }

    useEffect(() => {
        initNodes();
        //run();
    }, []);

    function run() {
        function initBoard(end: Node) {
            const n: Node[] = [];
            for(let y = 0; y < height; ++y) {
                for(let x = 0; x < width; ++x) {
                    const node = getNode(x, y);
                    node.up = getNode(x, y - 1);
                    node.down = getNode(x, y + 1);
                    node.left = getNode(x - 1, y);
                    node.right = getNode(x + 1, y);
                    node.dist = node.distWith(end);
                    n.push(node);
                }
            }
            setNodes(n);
        }
        let start: Node = getNode(0, 0);
        let end: Node = getNode(20, 20);
        initBoard(end);

        const initialState = new State(start);
        let currentState: State = initialState;
        const queue: PriorityQueue = new PriorityQueue();
        queue.push(initialState);

        let i = 0;
        while(end.distWith(currentState.node) != 0) { //
            if(i == 5)
                break;
            console.log(i);
            currentState = queue.pop();
            console.log(queue);
            const currentNode: Node = currentState.node;
            if(currentNode.up) {
                console.log("up")
                const newState = new State(currentNode.up);
                newState.previousState = currentState;
                queue.push(newState);
            }
            if(currentNode.down) {
                console.log("down")
                const newState = new State(currentNode.down);
                newState.previousState = currentState;
                queue.push(newState);
            }
            if(currentNode.left) {
                console.log("left")
                const newState = new State(currentNode.left);
                newState.previousState = currentState;
                queue.push(newState);
            }
            if(currentNode.right) {
                console.log("right")
                const newState = new State(currentNode.right);
                newState.previousState = currentState;
                queue.push(newState);
            }
            console.log(queue);
            ++i;
        }
        //while(currentState.previousState != undefined) {
        //    console.log(currentState);
        //}
    }

    return (
        <section className="pathFindingPage">
            <form className="input">
                <label>Width:
                    <input className="inputNumber" type="number" name="width" value={width}></input>
                </label>
                <div className="startPoint square" onClick={() => {setSelectedStatus(2); console.log(status[selectStatus])}}></div>
                <div className="obstacle square" onClick={() => {setSelectedStatus(1); console.log(status[selectStatus])}}></div>
                <div className="endPoint square" onClick={() => {setSelectedStatus(3); console.log(status[selectStatus])}}></div>
                <button type='button' onClick={run}>run</button>
            </form>
            <div className="board" style={{
                gridTemplateColumns: `repeat(${width}, 1fr)`,
                gridTemplateRows:`repeat(${height}, 1fr)`
            }} onClick={changeStatus}>
                {nodes.map(node => {
                    const id = "" + node.x + "-" + node.y;
                    return <div id={id} className="cell"></div>
                })}
            </div>
        </section>
    )
}

export default PathFindingPage;