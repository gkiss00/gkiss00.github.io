import React, {useEffect, useState} from "react";
import createModule from '../../../c_code/rt/rt.mjs';
import "./RayTracing.scss"
import ImageForm from "./components/ImageForm";
import CameraForm from "./components/CameraForm";
import ObjectsForm from "./components/ObjectsForm";
import { Camera } from "../../../model/rayTracing/model";

const RayTracingPage: React.FC<any> = () => {
    const [image, setImage] = useState('');

    const loadImage = async () => {
        const mod: any = await createModule();
        console.log("RT");
        const outputPtr = mod._rt()
    
        const base64Size = ((26 + (400 * 400 * 3)) * 4 / 3) + 2;
        const myArr = new Uint8Array(base64Size);
        myArr.set(mod.HEAPU8.subarray(outputPtr, Number(outputPtr) + base64Size));
    
        const utf8Decode = new TextDecoder();
        const msg = utf8Decode.decode(myArr);
    
        setImage(msg);
    }

    loadImage();

    return (
        <section id="rayTracingPage" className="rayTracingPage">
            <img src={`data:image/bmp;base64, ${image}`} />
            <form>
                <ImageForm></ImageForm>
                <CameraForm></CameraForm>
                <ObjectsForm></ObjectsForm>
            </form>
        </section>
    )
}

export default RayTracingPage;