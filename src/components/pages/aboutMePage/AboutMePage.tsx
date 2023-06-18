import React, { useEffect, useState } from "react"
import './AboutMePage.scss'
import NavBar from "./components/navbar/NavBar";
import { ABOUT_ME } from "../../../model/model";

const AboutMePage: React.FC<any> = () => {
    const mailTo: string = `mailto: ${ABOUT_ME.aboutMe.mail}`
    const callTo: string = `tel: ${ABOUT_ME.aboutMe.tel}`
    const adresse: string = `${ABOUT_ME.aboutMe.address.street} ${ABOUT_ME.aboutMe.address.number}`
    const adresseLink: string = "https://www.google.com/maps/place/Bd+Louis+Schmidt+77,+1040+Etterbeek/@50.8288341,4.4001398,17z/data=!3m1!4b1!4m6!3m5!1s0x47c3c4b4f5cc94a7:0x569ccb6a4803b88f!8m2!3d50.8288341!4d4.4027147!16s%2Fg%2F11csnvqy01?entry=ttu"
    const companyImages = [
        require("./siemens2.webp"),
        require("./agoria2.jpeg"),
        require("./defense2.jpeg")
    ]
    const schoolImages = [
        require("./ephec.jpeg"),
        require("./ecam.png"),
        require("./st-michel.jpeg")
    ]
    const schoolImagesUrl = [
        "url('img/ephec.jpeg')",
        "url('img/ecam.png')",
        "url('img/st-michel.jpeg')"
    ]
    const ppList = [
        require("./pp2.jpeg"),
        require("./pp.jpeg")
    ]

    const MINUTE_MS = 5000;

    useEffect(() => {
    const interval = setInterval(() => {
        console.log('Logs every minute');
        changePP()
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    const changePP = () => {
        const tmp = (index + 1) % ppList.length;
        setPP(ppList[tmp]);
        setIndex(tmp);
    }

    const test = [
    <img src={ppList[0]}></img>, <img src={ppList[1]}></img>]


    const [shifted, setShifted] = useState<number>(0);
    const [index, setIndex] = useState<number>(0);
    const [pp, setPP] = useState(ppList[1]);

    const forward = (event: any) => {
        event.preventDefault();
        let list = document.getElementById("formationListInside") as HTMLElement;
        let tmp = shifted - 1000;
        console.log(tmp);
        if(tmp < -2000) { tmp = 0; }
        list.style.transform = `translateX(${tmp}px)`;
        setShifted(tmp);
        // change background
        changeBackground();
    }

    const backward = (event: any) => {
        event.preventDefault();
        // change image
        let list = document.getElementById("formationListInside") as HTMLElement;
        let tmp = shifted + 1000;
        console.log(tmp);
        if(tmp > 0) { tmp = -2000; }
        list.style.transform = `translateX(${tmp}px)`;
        setShifted(tmp);
        // change background
        changeBackground();
    }

    const changeBackground = () => {
        /*const section = document.getElementById("formationSection") as HTMLElement;
        section.style.backgroundImage = backgroundImage;
        console.log(index, section);
        setIndex((index + 1) % 3);
        setBackgroundImage(schoolImagesUrl[index]);
        */
    }

    return (
        <section className="aboutMePage" id="aboutMePage">
            <NavBar></NavBar>

            <div id="aboutMeSection" className="aboutMeSection">
                <h2 className="aboutMeSectionTitle">{ABOUT_ME.aboutMe.name}</h2>
                <div className="aboutMeSectionAboutMe">
                    <img className="aboutMePP" src={pp}></img>
                    <p>{ABOUT_ME.aboutMe.description}</p>
                </div>
                <p className="aboutMeSectionPerspective">{ABOUT_ME.aboutMe.perspective}</p>
            </div>

            

            <div id="skillsSection" className="skillsSection">
                <h2 className="skillsSectionTitle">Skills</h2>
                <ul className="skillsSectionList">
                    {ABOUT_ME.aboutMe.skills.map((skill: any) => {
                        return <li className="skillsSectionItem">{skill}</li>
                    })}
                </ul>
            </div>

            <div id="formationSection" className="formationSection">
                <h2 className="formationSectionTitle">Education</h2>
                <div className="formationList">
                    <div className="formationListBackward">
                        <img className="formationListButton backward" src={require("./forward.png")} onClick={backward}></img>
                    </div>
                    <div className="formationListForward">
                        <img className="formationListButton" src={require("./forward.png")} onClick={forward}></img>
                    </div>
                    <div id="formationListInside" className="formationListInside">
                        {ABOUT_ME.aboutMe.formation.map((formation: any, index:number) => {
                            return (
                                <div className="formationItem">
                                    <img className="formationItemImage" src={schoolImages[index]}>
                                    </img>
                                    <div className="formationItemText">
                                        <p className="formationItemTitle">{formation.title}</p>
                                        <p className="formationItemPlace">{formation.place}</p>
                                        <p className="formationItemStart">{formation.start} - {formation.end != null ? formation.end : "aujourd'hui"}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <a className="tfeDownload" href={require('./tfe.pdf')} download="tfe-benoit-haubruge">TFE</a>
                <p className="tfeDescription">travail de fin d etude realise au sein de l entreprise degroote solution en 2023 portant sur la conception du systeme de commande et de controle hydrauliaue d une remorque auto chargeuse tractee.</p>
            </div>
            
            <div id="experienceSection" className="experienceSection">
                <h2 className="experienceSectionTitle">Experiences professionnelles</h2>
                <div className="experienceList">
                    {ABOUT_ME.aboutMe.experience.map((formation: any) => {
                        return (
                            <div className="experienceItem">
                                <h3 className="experienceItemTitle">{formation.title}</h3>
                                <div className="experienceItemPlaceAndDate">
                                    <p className="experienceItemPlace">{formation.place}</p>
                                    <p className="experienceItemStart">{formation.start} - {formation.end != null ? formation.end : "aujourd'hui"}</p>
                                </div>
                                
                                <p className="experienceItemDescription">{formation.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div id="otherSection" className="otherSection">
                <h2 className="otherSectionTitle">Passions et loisirs</h2>
                <div className="otherSectionList">
                    {ABOUT_ME.aboutMe.others.map((other: any, index:number) => {
                        return (
                            <div id={"otherSectionItem" + index} className="otherSectionItem">
                                <h3 className="otherSectionItemTitle">{other.title}</h3>
                                <p className="otherSectionItemDescription">{other.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="contactMeList">
                <div className="contactMeItem">
                    <img className="contactMeLogo" src={require("./email.png")}></img>
                    <p>Email</p>
                    <a href={mailTo}>{ABOUT_ME.aboutMe.mail}</a>
                </div>
                <div className="contactMeItem">
                    <img className="contactMeLogo" src={require("./telephone.png")}></img>
                    <p>Tel</p>
                    <a href={callTo}>{ABOUT_ME.aboutMe.tel}</a>
                </div>
                <div className="contactMeItem">
                    <img className="contactMeLogo" src={require("./address.png")}></img>
                    <p>Adresse</p>
                    <a href={adresseLink} target="_blank">{adresse}</a>
                </div>
            </div>
        </section>
    )
}

export default AboutMePage;