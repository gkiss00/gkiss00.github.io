import { useState } from "react";
import { Filter, Image } from "../../../../model/rayTracing/model";

const ImageForm: React.FC<any> = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [image, setImage] = useState<Image>(new Image());

    const show = () => {
        setIsActive(!isActive);
    }

    const setHeight = (event: any) => {
        const value: number = +event.target.value;
        image.height = value;
        setImage({...image});
    }

    const setWidth = (event: any) => {
        const value: number = +event.target.value;
        image.width = value;
        setImage({...image});
    }

    const setAntiAliasing = (event: any) => {
        const value: number = +event.target.value;
        image.antiAliasing = value;
        setImage({...image});
    }

    const changeFilter = (event: any) => {
        const select: HTMLSelectElement = document.getElementById("filter") as HTMLSelectElement;
        const index: number = select.selectedIndex;
        const option: HTMLSelectElement = select.options[index] as unknown as HTMLSelectElement;
        const value = option.value;
        image.filter = value;
        setImage({...image});
    }

    return (
        <div className="imageFormSection">
            <label onClick={show}>Config {isActive ? "^" : "ˇ"}</label>
            {isActive ?
            <>
                <label>Height</label>
                <input id="height" type="number" min="1" onChange={setHeight} value={image.height}></input>
                <label>Width</label>
                <input id="width" type="number" min="1" onChange={setWidth} value={image.width}></input>
                <label>Anti-Aliasing</label>
                <input id="width" type="number" min="1" max="9" onChange={setAntiAliasing} value={image.antiAliasing}></input>
                <label>Filter</label>
                <select id="filter" onChange={changeFilter} value={image.filter}>
                    {Object.values(Filter).map(filter => {
                        return <option id={filter} value={filter}>{filter}</option>
                    })}
                </select>
            </>
            :
            <></>
            }
            
        </div>
    );
}

export default ImageForm;