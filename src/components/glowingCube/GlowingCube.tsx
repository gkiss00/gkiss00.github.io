import React from "react";
import { Outlet, Link } from "react-router-dom";
import './GlowingCube.scss'

interface GlowingCubeInterface{
    project: string,
}

const GlowingCube : React.FC<GlowingCubeInterface> = (props) => {

const path = `project/${props.project}`;
    return (
        <div className="glowingCube">
            <div className="glowingContent">
                <p><Link to={path}>{props.project}</Link></p>
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