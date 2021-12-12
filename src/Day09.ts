import {loadFile} from "./Utils";

let sizes: Array<number> = new Array<number>();
const directions:number[][] = [ [1, 0], [-1, 0], [0, 1], [0, -1]];

let seen: Set<string> = new Set<string>();
export function getSize(grid: number[][], row: number, col: number, value: number) {

    if (seen.has("" + row + col))
        return 0;

    seen.add("" + row + col);

    if ((row < 0) || (row >= grid.length) || (col < 0) || (col >= grid[0].length)) {
        return 0;
    }

    if (grid[row][col] >= 9)
        return 0;

    let res: number = 1;

    directions.forEach(x => {
        const newRow: number = x[0] + row;
        const newCol: number = x[1] + col;

        res += getSize(grid, newRow, newCol, value + 1);
    });

    return res;
}

export function isLowestPoint(grid: number[][], row: number, col: number) {

    let isLowest: boolean = true;
    directions.forEach (x => {
        const newRow: number = x[0] + row;
        const newCol: number = x[1] + col;
        if ((newRow < 0) || (newRow >= grid.length) || (newCol < 0) || (newCol >= grid[0].length)) {
            
        }
        else {
            if (grid[row][col] >= grid[newRow][newCol])
                isLowest = false;
        }
    });

    if (isLowest) {
        seen.clear();

        const size: number = getSize(grid, row, col, grid[row][col]);
        sizes.push(size);
    }
    
    return isLowest ? (grid[row][col] + 1) : 0;
}

// Start

let input: string[];
input = loadFile("inputs/Day09.txt", "\n");

let grid: number[][] = [];

let part1: number = 0;
let part2: number = 0;
input.forEach (x => {
    grid.push(x.split("").map(y => parseInt(y)));
});

for (let i: number = 0; i < grid.length; i++) {
    for (let j: number = 0; j < grid[0].length; j++) {
        part1 += isLowestPoint(grid, i, j);
    }
}

console.log("Part 1 ", part1);
console.log("Part 2 ", sizes.sort((n1, n2) => n2 - n1).splice(0, 3).reduce((prev, curr) => prev * curr));