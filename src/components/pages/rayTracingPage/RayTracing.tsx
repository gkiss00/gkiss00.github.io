import React, {useEffect, useState} from "react";
import createModule from '../../../c_code/rt/rt.mjs';
import "./RayTracing.scss"
import ImageForm from "./components/ImageForm";
import CameraForm from "./components/CameraForm";
import ObjectsForm from "./components/ObjectsForm";
import { Camera, Image, Object, createCopyBook } from "../../../model/rayTracing/model";

const RayTracingPage: React.FC<any> = () => {
    const [image, setImage] = useState('');
    const [config, setConfig] = useState<Image>(new Image());
    const [camera, setCamera] = useState<Camera>(new Camera());
    const [objects, setObjects] = useState<Object[]>([new Object()]);

    const updateConfig = (conf: Image) => {
        setConfig({...conf});
    }

    const updateCamera = (cam: Camera) => {
        setCamera({...cam});
    }

    const updateObjects = (objs: Object[]) => {
        setObjects([...objs]);
    }

    const load = (event: any) => {
        event.preventDefault();
        const copyBook = createCopyBook(config, camera, objects);
        console.log(copyBook);
    }

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
            {
                image != '' ? 
                <img src={`data:image/bmp;base64, ${image}`} />
                :
                <div className="loader"></div>
            }
            <form>
                <ImageForm config={config} update={updateConfig}></ImageForm>
                <CameraForm camera={camera} update={updateCamera}></CameraForm>
                <ObjectsForm objects={objects} update={updateObjects}></ObjectsForm>
                <button onClick={load}>Load</button>
            </form>
        </section>
    )
}

export default RayTracingPage;