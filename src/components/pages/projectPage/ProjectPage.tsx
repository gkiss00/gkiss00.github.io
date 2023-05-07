import React from "react";
import './ProjectPage.scss';
import GlowingCube from "../../glowingCube/GlowingCube";

const ProjectPage : React.FC<any> = () => {
    return (
        <section className="projectPage">
            <GlowingCube project="Ray-Tracer"></GlowingCube>
            <GlowingCube project="Path-Finding"></GlowingCube>
            <GlowingCube project="Sorting"></GlowingCube>
        </section>
    )
}

export default ProjectPage;