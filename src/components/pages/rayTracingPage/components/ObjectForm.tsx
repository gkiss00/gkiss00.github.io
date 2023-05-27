import { useState } from "react";
import { Object, Vector3, OBJECT_VALUES, Color } from "../../../../model/rayTracing/model";
import VectorForm from "./VectorForm";
import ColorForm from "./ColorForm";

const ObjectForm: React.FC<any> = (props) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [object, setObject] = useState<Object>(props.object as Object);

    const show = () => {
        setIsActive(!isActive);
    }

    const updateValue = (index: number) => (event:any) => {
        const value: number = +event.target.value;
        object.values[index] = value;
        setObject({...object});
        props.update(object);
    }

    const updateObjectTranslation = (translation: Vector3) => {
        object.translation = translation;
        setObject({...object});
        props.update(object);
    }

    const updateObjectScaling = (scaling: Vector3) => {
        object.scaling = scaling;
        setObject({...object});
        props.update(object);
    }

    const updateObjectRotation = (rotation: Vector3) => {
        object.rotation = rotation;
        setObject({...object});
        props.update(object);
    }

    const updateObjectColor = (color: Color) => {
        object.color = color;
        setObject({...object});
        props.update(object);
    }

    if(object != undefined) {
        return (
            <div className="rtFormSection rtObjectFormSection">
                <h2 onClick={show}>{object.type} {isActive ? "^" : "ˇ"}</h2>
                {
                    isActive ?
                    <>
                    {
                        OBJECT_VALUES.get(object.type)?.map((name, index) => {
                            return (
                                <div className="rtFormDiv">
                                    <label>{name} :</label>
                                    <input type="number" value={object.values[index]} onChange={updateValue(index)}></input>
                                </div>
                            );
                        })
                    }
                        <VectorForm update={updateObjectTranslation} vector={object.translation} label="Transalation" x="0" y ="0" z="0"></VectorForm>
                        <VectorForm update={updateObjectScaling} vector={object.scaling} label="Scaling" x="1" y ="1" z="1"></VectorForm>
                        <VectorForm update={updateObjectRotation} vector={object.rotation} label="Rotation" x="0" y ="0" z="0"></VectorForm>
                        <ColorForm update={updateObjectColor} color={object.color}></ColorForm>
                    </>
                    :
                    <></>
                }
            </div>
        );
    } else {
        return <></>
    }
    
}

export default ObjectForm;