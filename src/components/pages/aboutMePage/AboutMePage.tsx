import React, { useEffect } from "react"
import './AboutMePage.scss'
import Info from './../../info/Info'
import createModule from './../../../c_code/add.mjs';

const AboutMePage: React.FC<any> = () => {
    const studies: string[] = ["Software Engineering at 19 coding school", "Management Computing at EPFC Brussels"]
    const jobs: string[] = ["Java developer / Software Engineer at BNP Pariba Fortis"]
    const skills: string[] = ["Java", "C", "C++", "HTML", "CSS", "JavaScript", "TypeScript"]

    const a: number = 1
    const b: number = 2
    
    useEffect(() => {
        //console.log(Module.ccall("add", "number", ["number", "number"], [a, b]));
    }, []);

    createModule().then((mod: any) => {
        /*
        // GET/SEND int OK
        console.log(mod._add(a, b))
        console.log(mod._sub(a, b))
        // GET string OK
        console.log(mod._ft_memory(5))
        console.log(mod.UTF8ToString(mod._ft_str()))

        // SEND string OK
        const charArray: Uint8Array = new TextEncoder().encode('Lorem ipsum');
        let ptr: any = mod._malloc(charArray.length);
        let chunk: any = mod.HEAPU8.subarray(ptr, ptr + charArray.length);
        chunk.set(charArray);
        console.log(mod._ft_strlen(chunk.byteOffset));
        mod._free(ptr);

        // SEND STRUCT
        // create a var containing the address of struct
    
        // Create a struct
        const addr = mod._create_struct();
        mod._set_struct(addr, 5, 6);
        console.log("res", mod._calc_struct(addr));
        /*
        mod._structCreate(ppStruct);
        // Get the actual location of the object
        var pStruct = mod.getValue(ppStruct, "i32");
        mod._structPrint(pStruct); // print default values
        // To query the values from struct, again created two more pointers pa & pb
        var pa = mod._malloc(4);
        var pb = mod._malloc(4);
    
        mod._structQuery(pStruct, pa, pb); // query values
        var a = mod.getValue(pa, "i32");    // ask for 4 byte int value
        var b = mod.getValue(pb, "double"); // ask for double
        console.log("Queried values {" + a + ", "+ b + "}");
        // set new value
        mod._structSet(pStruct, 10, 7.25);
        mod._structPrint(pStruct);
        
        // Cleanup
        mod._structDestory(pStruct);
        mod._free(pa);
        mod._free(pb);
        mod._free(ppStruct);
        */
    })
    
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
}

export default AboutMePage;