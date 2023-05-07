import React, { BaseSyntheticEvent, useState } from "react";
import './SortingPage.scss'
import SortingMap, { BubbleSort, SelectionSort } from "../../../model/sorting/model";

const SortingPage : React.FC<any> = () => {
    const [numberOfElement, setNumberOfElement] = useState<number>(50);
    const [sortingType, setSortingType] = useState<string>("BubbleSort");
    const numbers: number[] = [];

    for(let i = 1; i <= numberOfElement; ++i) {
        numbers.push(i);
    }

    const shuffle = () => {
        console.log("SHUFFLE");
        const allNumbers: HTMLElement = document.getElementsByClassName("numbers").item(0) as HTMLElement;
        for(let i = 1; i <= numberOfElement * 5; ++i) {
            const index1 = Math.floor(Math.random() * numberOfElement);
            const index2 = Math.floor(Math.random() * numberOfElement);
        
            const firstNumber: HTMLElement = document.getElementById("" + index1) as HTMLElement;
            const secondNumber: HTMLElement = document.getElementById("" + index2) as HTMLElement;
            if(firstNumber != null && secondNumber != null) {
                allNumbers.insertBefore(firstNumber, secondNumber);
            }
        }
    }

    const sort = async () => {
        console.log("SORT");
        sortingType;
        SortingMap.get(sortingType)?.call(1, numberOfElement);
    }

    const changeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        let value: number = +event.target.value
        setNumberOfElement(value)
    }

    const changeSortingType = (event: any) => {
        const select: HTMLSelectElement = document.getElementById("sortingTypeSelect") as HTMLSelectElement;
        const index: number = select.selectedIndex;
        const option: HTMLSelectElement = select.options[index] as unknown as HTMLSelectElement;
        const value = option.value;
        setSortingType(value);
    }

    return (
        <section className="sortingPage">
            <div className="sortingPageHeader">
                <input type="number" onChange={changeNumber} value={numberOfElement}></input>
                <select id="sortingTypeSelect" onChange={changeSortingType}>
                    {Array.from(SortingMap.keys()).map((value: string) => {
                        return <option value={value}>{value}</option>
                    })}
                </select>
                <button onClick={shuffle}>Shuffle</button>
                <button onClick={sort}>Sort</button>
            </div>
            <div className="numbers">
                {numbers.map((nb: number) => {
                    return <div id={"" + nb} className="number" style={{height:nb, width:10}}></div>
                })}
            </div> 
        </section>
    )
}

export default SortingPage;