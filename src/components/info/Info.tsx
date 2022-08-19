import React from "react";
import './Info.scss'

interface InfoInterface {
    title: string;
    content: string[];
}

const Info : React.FC<InfoInterface> = (props) => {
    return (
        <div className="info">
            <h2>{props.title}</h2>
            <ul>
                {props.content.map(elem => {
                    return <li>{elem}</li>
                })}
            </ul>
        </div>
    )
}

export default Info;