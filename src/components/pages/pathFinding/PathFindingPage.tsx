import React, {useState, useEffect} from "react";
import Node, {Status, State, PriorityQueue} from "../../../model/pathFinding/model";
import './PathFindingPage.scss'

const PathFindingPage: React.FC<any> = () => {
    const [width, setWidth] = useState<number>(40);
    const [height, setHeight] = useState<number>(30);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [selectStatus, setSelectedStatus] = useState<Status>(Status.EMPTY);
    const [startNode, setStartNode] = useState<Node>();
    const [endNode, setEndNode] = useState<Node>();

    const directions: string[] = ['up', 'down', 'left', 'right'];

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

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
        event.preventDefault();
        const cellId: string = event.target.id;
        const coords = cellId.split("-");
        const x = Number(coords[0]);
        const y = Number(coords[1]);
        const node: Node = getNode(x, y);
        node.status = selectStatus;
        setNodes(nodes);
        if(selectStatus == Status.START)
            setStartNode(node);
        if(selectStatus == Status.END)
            setEndNode(node);
        /*document.getElementById(cellId)?.classList.add("startPoint");
        const elem: HTMLElement | null = document.getElementById(cellId);
        if(elem)
            elem.style.backgroundColor = "green";
        //document.getElementById(cellId)?.style.backgroundColor = "green";
        console.log(document.getElementById(cellId)?.classList);
        */
    }

    useEffect(() => {
        initNodes();
    }, []);

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

    async function run() {
        let start: Node = startNode as Node;
        let end: Node = endNode as Node;
        initBoard(end);

        const initialState = new State(start);
        let currentState: State = initialState;
        const priotityQueue: PriorityQueue = new PriorityQueue();
        priotityQueue.push(initialState);
        while(end.distWith(currentState.node) != 0) {
            currentState = priotityQueue.pop();
            const elem: HTMLElement | null = document.getElementById(currentState.node.x + "-" + currentState.node.y);
            if(elem)
                elem.style.backgroundColor = "green";
            const currentNode: Node = currentState.node;
            for (let dir of directions) {
                if((currentNode as any)[dir]) {
                    const nextNode: Node = (currentNode as any)[dir];
                    if(!nextNode.check) {
                        nextNode.check = true;
                        if(nextNode.status != Status.BLOCKED) {
                            const newState = new State(nextNode);
                            newState.previousState = currentState;
                            priotityQueue.push(newState);
                        }
                    }
                }
            }
            await delay(300);
        }
    }

    const cells = [];
    for (let y = 0; y < height; ++y) {
        for(let x = 0; x < width; ++x) {
            const id = "" + x + "-" + y;
            cells.push(<div id={id} className="cell"></div>)
        }
    }

    return (
        <section className="pathFindingPage">
            <form className="input">
                <label>Width:
                    <input className="inputNumber" type="number" name="width" value={width}></input>
                </label>
                <div className="startPoint square" onClick={() => {setSelectedStatus(Status.START); console.log(status[selectStatus])}}></div>
                <div className="obstacle square" onClick={() => {setSelectedStatus(Status.BLOCKED); console.log(status[selectStatus])}}></div>
                <div className="endPoint square" onClick={() => {setSelectedStatus(Status.END); console.log(status[selectStatus])}}></div>
                <button type='button' onClick={run}>run</button>
            </form>
            <div className="board" style={{
                gridTemplateColumns: `repeat(${width}, 1fr)`,
                gridTemplateRows:`repeat(${height}, 1fr)`
            }} onClick={changeStatus}>
                {cells}
            </div>
        </section>
    )
}

export default PathFindingPage;