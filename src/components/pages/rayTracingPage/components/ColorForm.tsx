import { useState } from "react";
import { Color } from "../../../../model/rayTracing/model";

const ColorForm: React.FC<any> = (props) => {
    const [color, setColor] = useState<Color>(props.color as Color);

    const setR = (event: any) => {
        const value: number = +event.target.value;
        color.r = value;
        setColor({...color});
        props.update(color);
    }

    const setG = (event: any) => {
        const value: number = +event.target.value;
        color.g = value;
        setColor({...color});
        props.update(color);
    }

    const setB = (event: any) => {
        const value: number = +event.target.value;
        color.b = value;
        setColor({...color});
        props.update(color);
    }

    const setA = (event: any) => {
        const value: number = +event.target.value;
        color.a = value;
        setColor({...color});
        props.update(color);
    }

    if(color != undefined) {
        return (
            <div className="rtColorFormSection">
                <label>Color</label>
                <div className="rtFormDiv">
                    <label>R :</label>
                    <input className="rtColorFormInput" type="number" onChange={setR} value={color.r}></input>
                    <label>G :</label>
                    <input className="rtColorFormInput" type="number" onChange={setG} value={color.g}></input>
                    <label>B :</label>
                    <input className="rtColorFormInput" type="number" onChange={setB} value={color.b}></input>
                    <label>A :</label>
                    <input className="rtColorFormInput" type="number" onChange={setA} value={color.a}></input>
                </div>
            </div>
        );
    } else {
        return <></>
    }
    
}

export default ColorForm;