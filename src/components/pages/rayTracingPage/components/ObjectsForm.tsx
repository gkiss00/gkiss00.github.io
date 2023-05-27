import { useState } from "react";
import { Object, Vector3 } from "../../../../model/rayTracing/model";
import ObjectForm from "./ObjectForm";

const ObjectsForm: React.FC<any> = (props) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [objects, setObjects] = useState<Object[]>([new Object()]);

    const show = () => {
        setIsActive(!isActive);
    }

    const updateObjects = (object: Object) => {
        setObjects([object]);
    }

    return (
        <div className="rtFormSection rtObjectsFormSection">
            <h2 onClick={show}>Objects {isActive ? "^" : "ˇ"}</h2>
            {
                isActive ?
                <>
                    {
                        objects.map(obj => {
                            return <ObjectForm update={updateObjects} object={obj}></ObjectForm>
                        })
                    }
                    <button id="rtAddObject" onClick={(event) => event.preventDefault()}>+</button>
                </>
                :
                <></>
            }
        </div>
    );
}

export default ObjectsForm;