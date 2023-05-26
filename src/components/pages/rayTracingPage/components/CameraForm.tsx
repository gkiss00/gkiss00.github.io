import { useState } from "react";
import { Camera } from "../../../../model/rayTracing/model";

const CameraForm: React.FC<any> = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [camera, setCamera] = useState<Camera>(new Camera());

    const show = () => {
        setIsActive(!isActive);
    }

    const setPovX = (event: any) => {
        const value: number = +event.target.value;
        camera.pov.x = value;
        setCamera({...camera});
    }

    const setPovY = (event: any) => {
        const value: number = +event.target.value;
        camera.pov.y = value;
        setCamera({...camera});
    }

    const setPovZ = (event: any) => {
        const value: number = +event.target.value;
        camera.pov.z = value;
        setCamera({...camera});
    }

    const setDirX = (event: any) => {
        const value: number = +event.target.value;
        camera.dir.x = value;
        setCamera({...camera});
    }

    const setDirY = (event: any) => {
        const value: number = +event.target.value;
        camera.dir.y = value;
        setCamera({...camera});
    }

    const setDirZ = (event: any) => {
        const value: number = +event.target.value;
        camera.dir.z = value;
        setCamera({...camera});
    }

    const setUpX = (event: any) => {
        const value: number = +event.target.value;
        camera.up.x = value;
        setCamera({...camera});
    }

    const setUpY = (event: any) => {
        const value: number = +event.target.value;
        camera.up.y = value;
        setCamera({...camera});
    }

    const setUpZ = (event: any) => {
        const value: number = +event.target.value;
        camera["up"]["z"] = value;
        setCamera({...camera});
    }

    const setAngle = (event: any) => {
        const value: number = +event.target.value;
        camera.angle = value;
        setCamera({...camera});
    }

    return (
        <div className="cameraFormSection">
            <label onClick={show}>Camera {isActive ? "^" : "ˇ"}</label>
            {
                isActive ?
                <>
                    <label>Point of vue</label>
                    <label>X :</label>
                    <input id="povX" type="number" onChange={setPovX} value={camera.pov.x}></input>
                    <label>Y :</label>
                    <input id="povY" type="number" onChange={setPovY} value={camera.pov.y}></input>
                    <label>Z :</label>
                    <input id="povZ" type="number" onChange={setPovZ} value={camera.pov.z}></input>
                    <label>Direction</label>
                    <label>X :</label>
                    <input id="dirX" type="number" onChange={setDirX} value={camera.dir.x}></input>
                    <label>Y :</label>
                    <input id="dirY" type="number" onChange={setDirY} value={camera.dir.y}></input>
                    <label>Z :</label>
                    <input id="dirZ" type="number" onChange={setDirZ} value={camera.dir.z}></input>
                    <label>Up</label>
                    <label>X :</label>
                    <input id="upX" type="number" onChange={setUpX} value={camera.up.x}></input>
                    <label>Y :</label>
                    <input id="upY" type="number" onChange={setUpY} value={camera.up.y}></input>
                    <label>Z :</label>
                    <input id="upZ" type="number" onChange={setUpZ} value={camera.up.z}></input>
                    <label>Angle :</label>
                    <input id="angle" type="number" onChange={setAngle} value={camera.angle}></input>
                </>
                :
                <></>
            }
            
        </div>
    );
}

export default CameraForm;