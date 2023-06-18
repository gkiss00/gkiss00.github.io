import React, { useEffect, useState } from "react"
import './AboutMePage.scss'
import NavBar from "./components/navbar/NavBar";
import { ABOUT_ME } from "../../../model/model";

const VisitePage: React.FC<any> = () => {
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
        <>
        <NavBar></NavBar>
            <div className="visitSection">
                <h2 className="visitSectionTitle">Visits</h2>
                <div className="visitList">
                    {ABOUT_ME.aboutMe.companyVisits.map((formation: any, index:number) => {
                        return (
                            <div className="visitItem">
                                <div className="visitItemCompanyImageDiv">
                                    <img className="visitItemCompanyImage" src={companyImages[index]}></img>
                                    <div className="visitItemCompanyName"  style={{backgroundColor: formation.color}}>{formation.companyName}</div>
                                </div>
                                <p className="visitItemDescription">{formation.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            </>
    )
}

export default VisitePage;