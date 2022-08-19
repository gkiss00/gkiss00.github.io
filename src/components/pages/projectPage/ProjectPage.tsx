import React from "react";
import './ProjectPage.scss';
import GlowingCube from "../../glowingCube/GlowingCube";

const ProjectPage : React.FC<any> = () => {
    return (
        <section className="projectPage">
            <GlowingCube project="Ray Traycer"></GlowingCube>
            <GlowingCube project="Cryptography"></GlowingCube>
            <GlowingCube project="TODO"></GlowingCube>
        </section>
    )
}

export default ProjectPage;