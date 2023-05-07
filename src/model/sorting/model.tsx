const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const SwapElements = (firstNumber: HTMLElement, secondNumber: HTMLElement, numberOfElement: number) => {
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

export const BubbleSort = async (numberOfElement: number) => {
    const allNumbers: HTMLElement = document.getElementsByClassName("numbers").item(0) as HTMLElement;
    for(let i = 0; i < numberOfElement - 1; ++i) {
        for(let j = 0; j < numberOfElement - i - 1; ++j) {
            const firstNumber: HTMLElement = allNumbers.children.item(j) as HTMLElement;
            const secondNumber: HTMLElement = allNumbers.children.item(j + 1) as HTMLElement;
            const height1: number = +firstNumber.id;
            const height2: number = +secondNumber.id;
            firstNumber.style.backgroundColor = "red";
            secondNumber.style.backgroundColor = "blue";
            if (height1 > height2) {
                SwapElements(firstNumber, secondNumber, numberOfElement);
            }
            await delay(10);
            firstNumber.style.backgroundColor = "white";
            secondNumber.style.backgroundColor = "white";
        }
    }
}

export const SelectionSort = async (numberOfElement: number) => {
    const allNumbers: HTMLElement = document.getElementsByClassName("numbers").item(0) as HTMLElement;
    for(let i = 0; i < numberOfElement - 1; ++i) {
        let minId = i;
        for(let j = i; j < numberOfElement; ++j) {
            const firstNumber: HTMLElement = allNumbers.children.item(minId) as HTMLElement;
            const secondNumber: HTMLElement = allNumbers.children.item(j) as HTMLElement;
            const height1: number = +firstNumber.id;
            const height2: number = +secondNumber.id;
            if(height1 > height2) {
                minId = j;
            }
        }
        const firstNumber: HTMLElement = allNumbers.children.item(minId) as HTMLElement;
        const secondNumber: HTMLElement = allNumbers.children.item(i) as HTMLElement;
        firstNumber.style.backgroundColor = "red";
        secondNumber.style.backgroundColor = "blue";
        SwapElements(firstNumber, secondNumber, numberOfElement);
        await delay(10);
        firstNumber.style.backgroundColor = "white";
        secondNumber.style.backgroundColor = "white";
    }
}

const SortingMap = new Map<string, (numberOfElement: number) => Promise<void>>();

SortingMap.set("BubbleSort", BubbleSort);
SortingMap.set("SelectionSort", SelectionSort);

export default SortingMap;