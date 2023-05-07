import React, { BaseSyntheticEvent, useState } from "react";
import './SortingPage.scss'

const SortingPage : React.FC<any> = () => {
    const [numberOfElement, setNumberOfElement] = useState<number>(50);
    const numbers: number[] = [];
    for(let i = 1; i <= numberOfElement; ++i) {
        numbers.push(i);
    }

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

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
        const allNumbers: HTMLElement = document.getElementsByClassName("numbers").item(0) as HTMLElement;
        // shitty sort
        // for (let i = 0; i < numberOfElement - 1; ++i) {
        //     const firstNumber: HTMLElement = allNumbers.children.item(i) as HTMLElement;
        //     const secondNumber: HTMLElement = allNumbers.children.item(i + 1) as HTMLElement;
        //     firstNumber.style.backgroundColor = "red";
        //     secondNumber.style.backgroundColor = "blue";
        //     const height1: number = +firstNumber.id;
        //     const height2: number = +secondNumber.id;
        //     if (height1 > height2) {
        //         // swap height
        //         const heightCopy = firstNumber.style.height;
        //         firstNumber.style.height = secondNumber.style.height;                    secondNumber.style.height = heightCopy;
        //         // swap id
        //         const firstIdCopy = firstNumber.id;
        //         const secondIdCopy = secondNumber.id;
        //         secondNumber.id = "" + (numberOfElement + 1);
        //         firstNumber.id = secondIdCopy;
        //         secondNumber.id = firstIdCopy;
        //         i = -1;
        //     }
        
        //     await delay(5);
        //     firstNumber.style.backgroundColor = "white";
        //     secondNumber.style.backgroundColor = "white";
        // }
        // bubble sort
        for(let i = 0; i < numberOfElement - 1; ++i) {
            for(let j = 0; j < numberOfElement - i - 1; ++j) {
                const firstNumber: HTMLElement = allNumbers.children.item(j) as HTMLElement;
                const secondNumber: HTMLElement = allNumbers.children.item(j + 1) as HTMLElement;
                const height1: number = +firstNumber.id;
                const height2: number = +secondNumber.id;
                firstNumber.style.backgroundColor = "red";
                secondNumber.style.backgroundColor = "blue";
                if (height1 > height2) {
                    // swap height
                    const heightCopy = firstNumber.style.height;
                    firstNumber.style.height = secondNumber.style.height;
                    secondNumber.style.height = heightCopy;
                    // swap id
                    const firstIdCopy = firstNumber.id;
                    const secondIdCopy = secondNumber.id;
                    secondNumber.id = "" + (numberOfElement + 1);
                    firstNumber.id = secondIdCopy;
                    secondNumber.id = firstIdCopy;
                }
                await delay(10);
                firstNumber.style.backgroundColor = "white";
                secondNumber.style.backgroundColor = "white";
            }
        }
    }

    const changeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        let value: number = +event.target.value
        setNumberOfElement(value)
    }

    return (
        <section className="sortingPage">
            <div className="sortingPageHeader">
                <input type="number" onChange={changeNumber} value={numberOfElement}></input>
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