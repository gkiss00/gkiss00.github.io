import { useState } from "react";
import { Camera, Vector3 } from "../../../../model/rayTracing/model";
import VectorForm from "./VectorForm";

const CameraForm: React.FC<any> = (props) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [camera, setCamera] = useState<Camera>(props.camera);

    const show = () => {
        setIsActive(!isActive);
    }

    const updateCameraPov = (pov: Vector3) => {
        camera.pov = pov;
        setCamera({...camera});
        props.update(camera);
    }

    const updateCameraDir = (dir: Vector3) => {
        camera.dir = dir;
        setCamera({...camera});
        props.update(camera);
    }

    const updateCameraUp = (up: Vector3) => {
        camera.up = up;
        setCamera({...camera});
        props.update(camera);
    }

    const setAngle = (event: any) => {
        const value: number = +event.target.value;
        camera.angle = value;
        setCamera({...camera});
        props.update(camera);
    }

    return (
        <div className="rtFormSection rtCameraFormSection">
            <h2 onClick={show}>Camera {isActive ? "^" : "ˇ"}</h2>
            {
                isActive ?
                <>
                    <VectorForm update={updateCameraPov} vector={camera.pov} label="Point Of vue"></VectorForm>
                    <VectorForm update={updateCameraDir} vector={camera.dir} label="Direction"></VectorForm>
                    <VectorForm update={updateCameraUp} vector={camera.up} label="Up"></VectorForm>
                    <div className="rtFormDiv">
                        <label>Angle :</label>
                        <input id="rtCameraAngle" type="number" onChange={setAngle} value={camera.angle}></input>
                    </div>
                </>
                :
                <></>
            }
        </div>
    );
}

export default CameraForm;