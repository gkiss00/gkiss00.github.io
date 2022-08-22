import React, {useState, useEffect} from "react";
import Node, {Status} from "../../../model/pathFinding/model";
import './PathFindingPage.scss'

const PathFindingPage: React.FC<any> = () => {
    const [width, setWidth] = useState<number>(40);
    const [height, setHeight] = useState<number>(30);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [selectStatus, setSelectedStatus] = useState<number>(0);

    const status: (string |Status)[] = Object.values(Status);

    function initNodes() {
        const n: Node[] = [];
        for(let i = 0; i < height; ++i) {
            for(let j = 0; j < width; ++j) {
                n.push(new Node(i, j));
            }
        }
        setNodes(n);
    }

    const changeStatus = (event: any) =>{
        event.preventDefault();
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
    }

    useEffect(() => {
        initNodes()
    }, []);

    return (
        <section className="pathFindingPage">
            <form className="input">
                <label>Width:
                    <input className="inputNumber" type="number" name="width" value={width}></input>
                </label>
                <div className="startPoint square" onClick={() => {setSelectedStatus(2); console.log(status[selectStatus])}}></div>
                <div className="obstacle square" onClick={() => {setSelectedStatus(1); console.log(status[selectStatus])}}></div>
                <div className="endPoint square" onClick={() => {setSelectedStatus(3); console.log(status[selectStatus])}}></div>
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