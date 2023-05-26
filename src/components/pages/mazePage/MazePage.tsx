import React, {useEffect, useState} from "react";
import "./MazePage.scss"
import { Cell } from "../../../model/maze/model";

const MazePage: React.FC<any> = () => {
    const [width, setWidth] = useState<number>(10);
    const [height, setHeight] = useState<number>(10);

    const grid: Cell[][] = [];

    // CREATE CELLS
    for(let h = 0; h < height; ++h) {
        for(let w = 0; w < width; ++w) {
            grid[h][w] = new Cell();
        }
    }

    // LINK
    for(let h = 0; h < height; ++h) {
        for(let w = 0; w < width; ++w) {
            if(h != 0) { // link to top cell
                const currentCell: Cell = grid[h][w];
                const upCell: Cell = grid[h - 1][w];
                currentCell.top = upCell;
            }
            if(h != height -1) { // link to bottom cell
                const currentCell: Cell = grid[h][w];
                const bottomCell: Cell = grid[h + 1][w];
                currentCell.bottom = bottomCell;
            }
            if(w != 0) { // link to left cell
                const currentCell: Cell = grid[h][w];
                const leftCell: Cell = grid[h][w - 1];
                currentCell.left = leftCell;
            }
            if(w != width - 1) { // link to right cell
                const currentCell: Cell = grid[h][w];
                const rightCell: Cell = grid[h][w + 1];
                currentCell.right = rightCell;
            }
        }
    }

    // Chose first two cells and put them in a SET
    // WHILE SET !contains all cells
    //      pick a random cell and the one next to it
    //      compare the set they are apart from
    //      if same
    //          => do nothing
    //      else
    //          => create new SET or combine SET
    
    return (
        <section id="mazePage" className="mazePage">
            
        </section>
    )
}

export default MazePage;