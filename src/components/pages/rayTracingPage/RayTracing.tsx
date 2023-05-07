import React, {useEffect} from "react";
import createModule from '../../../c_code/rt/rt.mjs';
import "./RayTracing.scss"

const RayTracingPage: React.FC<any> = () => {
    const [image, setImage] = React.useState('');

    const test = async () => {
        const mod: any = await createModule();
        //createModule().then((mod: any) => {
            console.log("RT");
            const outputPtr = mod._rt()
    
            const base64Size = ((26 + (400 * 400 * 3)) * 4 / 3) + 2;
            const myArr = new Uint8Array(base64Size);
            myArr.set(mod.HEAPU8.subarray(outputPtr, Number(outputPtr) + base64Size));
    
            const utf8Decode = new TextDecoder();
            const msg = utf8Decode.decode(myArr);
            //console.log(msg);
    
            setImage(msg);
        //})
    }

    test();

    return (
        <section id="rayTracingPage" className="rayTracingPage">
            <img src={`data:image/bmp;base64, ${image}`} />
        </section>
    )
}

export default RayTracingPage;