import React, { useEffect } from "react"
import './AboutMePage.scss'
import Info from './../../info/Info'
import createModule from './../../../c_code/rt/rt.mjs';

const AboutMePage: React.FC<any> = () => {
    const [image, setImage] = React.useState('');
    const studies: string[] = ["Software Engineering at 19 coding school", "Management Computing at EPFC Brussels"]
    const jobs: string[] = ["Java developer / Software Engineer at BNP Pariba Fortis"]
    const skills: string[] = ["Java", "C", "C++", "HTML", "CSS", "JavaScript", "TypeScript"]

    const a: number = 1
    const b: number = 2
    
    useEffect(() => {
        //console.log(Module.ccall("add", "number", ["number", "number"], [a, b]));
    }, []);

    createModule().then((mod: any) => {
        const outputPtr = mod._rt()

        const base64Size = (((26 + (400 * 400 * 3)) * 4 / 3) + 2) * 4;
        const myArr = new Uint8Array(base64Size)
        myArr.set(mod.HEAPU8.subarray(outputPtr, Number(outputPtr) + base64Size))

        const utf8Decode = new TextDecoder()
        const msg = utf8Decode.decode(myArr)

        setImage(msg);
        // GET/SEND int OK
        // const img = mod.UTF8ToString(mod._rt())
        // console.log(img);
        // setImage(img);
    })
    
    return (
        <section className="aboutMePage">
            <img src={`data:image/bmp;base64,${image}`} />
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
}

export default AboutMePage;