import React, { useEffect } from "react"
import * as THREE from 'three';
import './AboutMePage.scss'
import Info from '../../info/Info'
import ExperienceList from "./components/ExperienceList"

const AboutMePage: React.FC<any> = () => {
    const studies: string[] = ["Software Engineering at 19 coding school", "Management Computing at EPFC Brussels"]
    const jobs: string[] = ["Java developer / Software Engineer at BNP Pariba Fortis"]
    const skills: string[] = ["Java", "C", "C++", "HTML", "CSS", "JavaScript", "TypeScript"]
    const skills2: string[] = ["Java", "C", "C++", "HTML", "CSS", "JS", "TS"]

    

    useEffect(() => {
        const degrees = 360 / skills2.length;
        const amSkills = document.getElementById("amSkills");
        if(amSkills != null) {
            for(let i = 0; i < skills2.length; ++i) {
                const node = document.createElement("p");
                node.textContent = skills2[i];
                node.className = "test";
                node.style.top = `calc(375px + (400px * sin(${degrees * i}deg)))`
                node.style.right = `calc(375px + (400px * cos(${degrees * i}deg)))`
                node.style.transform = `rotateX(-90deg) rotateY(${degrees * i + -90}deg)`;
                console.log(amSkills);
                console.log(amSkills.clientHeight);
                amSkills?.appendChild(node);
            }
        }
    })

    /*
    return (
        <section className="aboutMePage">
            <div className="aboutMeSection">
                <img className="profilePicure" src={require("./../../../assets/cpy.jpg")} alt="profil picture"></img>
                <p id="aboutMeDescription">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </div>
            <div className="pacrousSection">
                <Info title="Studies" content={studies}></Info>
                <Info title="Jobs" content={jobs}></Info>
                <Info title="Skills" content={skills}></Info>
            </div>
        </section>
    )
    */

    return (
        <section className="aboutMePage" id="aboutMePage">
            <h1 className="amTitle">My Resume</h1>
            <p className="amDescription">What I like about programming is that there is always something new to learn. For me it is a passion more than a full time job.</p>
            <ExperienceList></ExperienceList>
            <div className="amSkills" id="amSkills">

            </div>
        </section>
    )
}

export default AboutMePage;