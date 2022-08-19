import React from "react"
import "./Cube.scss"

const Cube : React.FC<any> = () => {
    return (
        <div className="cubeContainer">
            <div className="face front">
                <div className="face1"></div>
            </div>
            <div className="face back"></div>
            <div className="face left"></div>
            <div className="face right"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
        </div>
    )
}

export default Cube;