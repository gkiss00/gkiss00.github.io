import React, {useEffect, useState} from "react";
import createModule from '../../../c_code/rt/rt.mjs';
import "./RayTracing.scss"
import ImageForm from "./components/ImageForm";
import CameraForm from "./components/CameraForm";
import ObjectsForm from "./components/ObjectsForm";
import { Camera, Image, Object, createCopyBook } from "../../../model/rayTracing/model";

const RayTracingPage: React.FC<any> = () => {
    const [image, setImage] = useState<string>('');
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

    const load = (value: boolean) => async (event: any) => {
        event.preventDefault();
        const copyBook = createCopyBook(config, camera, objects);
        loadImage(copyBook, value);
    }

    const loadImage = async (copyBook: string, load: boolean) => {
        if(image == '' || load == true) {
            const module: any = await createModule();

            // send copy book
            const utf8Encode = new TextEncoder();
            const bytes = utf8Encode.encode(copyBook);
            const inputPtr = module._createBuffer(copyBook.length);
            module.HEAPU8.set(bytes, inputPtr);

            // get image base64 encoded
            const outputPtr = module._rt(inputPtr);
            const base64Size = ((26 + (config.height * config.width * 3)) * 4 / 3) + 2;
            const stackArray = new Uint8Array(base64Size);
            stackArray.set(module.HEAPU8.subarray(outputPtr, Number(outputPtr) + base64Size));
            const utf8Decode = new TextDecoder();
            const msg = utf8Decode.decode(stackArray);

            setImage(msg);
        }
        
    }

    loadImage(createCopyBook(config, camera, objects), false);

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
                <button onClick={load(true)}>Load</button>
            </form>
        </section>
    )
}

export default RayTracingPage;