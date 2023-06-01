import React, { useEffect } from "react"

const Skills: React.FC<any> = () => {
    const skills: string[] = ["Java", "C", "C++", "HTML", "CSS", "JS", "TS"]

    useEffect(() => {
        const degrees = 360 / skills.length;
        const amSkills = document.getElementById("amSkills");
        if(amSkills != null) {
            for(let i = 0; i < skills.length; ++i) {
                const node = document.createElement("p");
                node.textContent = skills[i];
                node.className = "amSkill";
                node.style.top = `calc(375px + (420px * sin(${degrees * i + 90}deg)))`
                node.style.right = `calc(375px + (420px * cos(${degrees * i + 90}deg)))`
                node.style.transform = `rotateX(-90deg) rotateY(${degrees * i}deg)`;
                console.log(amSkills);
                console.log(amSkills.clientHeight);
                amSkills?.appendChild(node);
            }
        }
    })

    return (
        <div className="amSkillBox">
            <div className="amSkills" id="amSkills"></div>
            <div className="amSkillShadow"></div>
        </div>
    )
}

export default Skills;