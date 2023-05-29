import { useState } from "react";
import { Filter, Image } from "../../../../model/rayTracing/model";

const ImageForm: React.FC<any> = (props) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [image, setImage] = useState<Image>(props.config);

    const show = () => {
        setIsActive(!isActive);
    }

    const setHeight = (event: any) => {
        event.preventDefault();
        const value: number = +event.target.value;
        image.height = value;
        setImage({...image});
        props.update(image);
    }

    const setWidth = (event: any) => {
        event.preventDefault();
        const value: number = +event.target.value;
        image.width = value;
        setImage({...image});
        props.update(image);
    }

    const setAntiAliasing = (event: any) => {
        event.preventDefault();
        const value: number = +event.target.value;
        image.antiAliasing = value;
        setImage({...image});
        props.update(image);
    }

    const changeFilter = (event: any) => {
        event.preventDefault();
        const select: HTMLSelectElement = document.getElementById("rtImageFilter") as HTMLSelectElement;
        const index: number = select.selectedIndex;
        const option: HTMLSelectElement = select.options[index] as unknown as HTMLSelectElement;
        const value = option.value;
        image.filter = value;
        setImage({...image});
        props.update(image);
    }

    return (
        <div className="rtFormSection rtImageFormSection">
            <h2 onClick={show}>Config {isActive ? "^" : "ˇ"}</h2>
            {isActive ?
            <>
            <div className="rtFormDiv">
                <label>Height</label>
                <input id="rtImageHeight" type="number" min="1" onChange={setHeight} value={image.height}></input>    
            </div>
            <div className="rtFormDiv">
                <label>Width</label>
                <input id="rtImageWidth" type="number" min="1" onChange={setWidth} value={image.width}></input>
            </div>
            <div className="rtFormDiv">
                <label>Anti-Aliasing</label>
                <input id="rtImageAntiAliasing" type="range" min="1" max="9" onChange={setAntiAliasing} value={image.antiAliasing}></input>
            </div>
            <div className="rtFormDiv">
                <label>Filter</label>
                <select id="rtImageFilter" onChange={changeFilter} value={image.filter}>
                    {Object.values(Filter).map(filter => {
                        return <option id={filter} value={filter}>{filter}</option>
                    })}
                </select>
            </div>  
            </>
            :
            <></>
            }
            
        </div>
    );
}

export default ImageForm;