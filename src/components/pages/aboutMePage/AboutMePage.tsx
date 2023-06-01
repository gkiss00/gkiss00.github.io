import React, { useEffect } from "react"
import * as THREE from 'three';
import './AboutMePage.scss'
import Info from '../../info/Info'
import ExperienceList from "./components/ExperienceList"
import Skills from "./components/Skills";
import Car from "./components/Car";

const AboutMePage: React.FC<any> = () => {
    const studies: string[] = ["Software Engineering at 19 coding school", "Management Computing at EPFC Brussels"]
    const jobs: string[] = ["Java developer / Software Engineer at BNP Pariba Fortis"]
    const skills: string[] = ["Java", "C", "C++", "HTML", "CSS", "JavaScript", "TypeScript"]

    return (
        <section className="aboutMePage" id="aboutMePage">
            <div className="amAboutMe">
                <div className="amAboutMeText">
                    <h1 className="amTitle">My Resume</h1>
                    <p className="amDescription">What I like about programming is that there is always something new to learn. For me it is a passion more than a full time job.</p>   
                </div>
                <Skills></Skills>
            </div>
            <ExperienceList></ExperienceList>
            <p className="amLicense">License B</p>
            <Car></Car>
        </section>
    )
}

export default AboutMePage;