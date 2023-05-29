import { useEffect, useState } from "react";
import { Vector3 } from "../../../../model/rayTracing/model";

const VectorForm: React.FC<any> = (props) => {
    const [vector, setVector] = useState<Vector3>(props.vector as Vector3);

    const setX = (event: any) => {
        event.preventDefault();
        const value: number = +event.target.value;
        vector.x = value;
        props.update(vector);
        setVector({...vector});
    }

    const setY = (event: any) => {
        event.preventDefault();
        const value: number = +event.target.value;
        vector.y = value;
        props.update(vector);
        setVector({...vector});
    }

    const setZ = (event: any) => {
        event.preventDefault();
        const value: number = +event.target.value;
        vector.z = value;
        props.update(vector);
        setVector({...vector});
    }

    if(vector != undefined) {
        return (
            <div className="rtVectorFormSection">
                <label>{props.label}</label>
                <div className="rtFormDiv">
                    <label>X :</label>
                    <input className="rtVectorFormInput" type="number" onChange={setX} value={vector.x}></input>
                    <label>Y :</label>
                    <input className="rtVectorFormInput" type="number" onChange={setY} value={vector.y}></input>
                    <label>Z :</label>
                    <input className="rtVectorFormInput" type="number" onChange={setZ} value={vector.z}></input>
                </div>
            </div>
        );
    } else {
        return <></>
    }
}

export default VectorForm;