import React from "react";
import './GlowingCube.scss'

interface GlowingCubeInterface{
    project: string,
}

const GlowingCube : React.FC<GlowingCubeInterface> = (props) => {
    return (
        <div className="glowingCube">
            <div className="glowingContent">
                <p>{props.project}</p>
            </div>
            <div className="glowingLiftableTurnalble">
                <div className="glowingTop"></div>
                <div className="glowingFront glowingSide"></div>
                <div className="glowingBack glowingSide"></div>
                <div className="glowingLeft glowingSide"></div>
                <div className="glowingRight glowingSide"></div>
            </div>
            <div className="glowingBottom"></div>
        </div>
    )
}

export default GlowingCube;