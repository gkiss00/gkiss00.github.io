import React, {useState, useEffect} from "react";
import Node, {Status, State, PriorityQueue} from "../../../model/pathFinding/model";
import './PathFindingPage.scss'

const PathFindingPage: React.FC<any> = () => {
    const [width, setWidth] = useState<number>(40);
    const [height, setHeight] = useState<number>(30);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [selectedHTMLStatus, setSelectedHTMLStatus] = useState<HTMLElement | undefined>(undefined);
    const [selectStatus, setSelectStatus] = useState<Status>(Status.EMPTY);
    const [startNode, setStartNode] = useState<Node>();
    const [endNode, setEndNode] = useState<Node>();
    const [drawing, setDrawing] = useState<boolean>(false);

    const directions: string[] = ['up', 'down', 'left', 'right'];
    const border = "red 4px solid";
    const none = "none";

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

    useEffect(() => {
        initNodes();
    }, []);

    const handleChangeStatus = (event: any) => {
        event.preventDefault();
        const elem = event.target as HTMLElement;
        if(selectedHTMLStatus == undefined) {
            elem.style.border = border;
            setSelectedHTMLStatus(elem);
        } else {
            if(elem.id == selectedHTMLStatus.id) {
                selectedHTMLStatus.style.border = none;
                setSelectedHTMLStatus(undefined);
            } else {
                selectedHTMLStatus.style.border = none;
                elem.style.border = border;
                setSelectedHTMLStatus(elem);
            }
        }
    }

    function getNode(x: number, y: number): Node {
        return nodes[(y * width) + x];
    }

    const changeStatus = (event: any) =>{
        event.preventDefault();
        if (event._reactName != "onMouseOver" && event._reactName != "onClick" && event._reactName != "onMouseDown")
            return ;
        if (event._reactName == "onMouseOver" && drawing == false)
            return ;
        const cellId: string = event.target.id;
        const coords = cellId.split("-");
        const x = Number(coords[0]);
        const y = Number(coords[1]);
        const node: Node = getNode(x, y);
        node.status = selectStatus;
        setNodes(nodes);
        if(selectStatus == Status.START) {
            const elem = document.getElementById(event.target.id) as HTMLElement;
            elem.style.backgroundColor = "green";
            setStartNode(node);
        }
        if(selectStatus == Status.END) {
            const elem = document.getElementById(event.target.id) as HTMLElement;
            elem.style.background = "red";
            setEndNode(node);
        }
        if(selectStatus == Status.BLOCKED) {
            const elem = document.getElementById(event.target.id) as HTMLElement;
            elem.style.backgroundColor = "black";
        }
    }

    function initBoard(end: Node) {
        const n: Node[] = [];
        for(let y = 0; y < height; ++y) {
            for(let x = 0; x < width; ++x) {
                const node = getNode(x, y);
                if(y - 1 >= 0)
                    node.up = getNode(x, y - 1);
                if(y + 1 < height)
                    node.down = getNode(x, y + 1);
                if(x - 1 >= 0)
                    node.left = getNode(x - 1, y);
                if(x + 1 < width)
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
        const priorityQueue: PriorityQueue = new PriorityQueue();
        priorityQueue.push(initialState);
        while(end.distWith(currentState.node) != 0 && priorityQueue.queue.length != 0) {
            currentState = priorityQueue.pop();
            currentState.node.check = true;
            const elem: HTMLElement = document.getElementById(currentState.node.x + "-" + currentState.node.y) as HTMLElement;
            elem.style.backgroundColor = "green";
            const currentNode: Node = currentState.node;
            for (let dir of directions) {
                if((currentNode as any)[dir]) {
                    const nextNode: Node = (currentNode as any)[dir];
                    if(!nextNode.check) {
                        nextNode.check = true;
                        if(nextNode.status != Status.BLOCKED) {
                            const newState = new State(nextNode);
                            newState.setPreviousState(currentState);
                            priorityQueue.push(newState);
                        }
                    }
                }
            }
            await delay(30);
        }
        if(priorityQueue.queue.length == 0){
            //console.log("impossible")
        } else {
            while(currentState.previousState != undefined) {
                currentState = currentState.previousState;
                const elem = document.getElementById(currentState.node.x + "-" + currentState.node.y) as HTMLElement;
                elem.style.backgroundColor = "blue";
                await delay(30);
            }
        }
    }

    const refresh = () => {
        setStartNode(undefined);
        setEndNode(undefined);
        initNodes();
        for (let y = 0; y < height; ++y) {
            for(let x = 0; x < width; ++x) {
                const elem = document.getElementById(x + "-" + y) as HTMLElement;
                elem.style.backgroundColor = "var(--color-snow-white)";
            }
        }
    }

    const cells = [];
    for (let y = 0; y < height; ++y) {
        for(let x = 0; x < width; ++x) {
            const id = "" + x + "-" + y;
            cells.push(<div id={id} className="cell" onMouseOver={changeStatus} onClick={changeStatus} onMouseDown={(event) => {setDrawing(true); changeStatus(event)}} onMouseUp={() => setDrawing(false)}></div>)
        }
    }

    return (
        <section className="pathFindingPage">
            <form className="input">
                <div id="startPoint" className="square" onClick={(event) => {setSelectStatus(Status.START); handleChangeStatus(event)}}></div>
                <div id="obstacle" className="square" onClick={(event) => {setSelectStatus(Status.BLOCKED); handleChangeStatus(event)}}></div>
                <div id="endPoint" className="square" onClick={(event) => {setSelectStatus(Status.END); handleChangeStatus(event)}}></div>
                <div id="start" className="square" onClick={run}></div>
                <div id="refresh" className="square" onClick={refresh}></div>
            </form>
            <div className="board" style={{
                gridTemplateColumns: `repeat(${width}, 1fr)`,
                gridTemplateRows:`repeat(${height}, 1fr)`
            }} >
                {cells}
            </div>
        </section>
    )
}

export default PathFindingPage;