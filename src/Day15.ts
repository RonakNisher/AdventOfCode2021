import {loadFile} from "./Utils";

const directions: number[][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
let cost: Map<string, number> = new Map();

interface Point {
    row: number;
    col: number;
    distance: number;
}

let unvisited: Set<Point> = new Set();
let visited: Set<string> = new Set();

export function calculateMinDistance(grid: number[][]) {

    unvisited.clear();
    visited.clear();
    cost.clear();

    unvisited.add({ row: 0, col: 0, distance: 0 });

    while (unvisited.size !== 0) {
        let smallestPoint: Point;
        let dist: number = 100000;
        for (let value of unvisited.values()) {
            if (value.distance < dist) {
                smallestPoint = value;
                dist = value.distance;
            }
        }

        unvisited.delete(smallestPoint);

        const smallestRow: number = smallestPoint.row;
        const smallestCol: number = smallestPoint.col;

        visited.add("" + smallestRow + smallestCol);
        let shouldAddNeighbours: boolean = true;
        const key: string = "" + smallestRow + smallestCol;
        if (cost.has(key)) {
            const smallestDist: number = cost.get(key);
            if (smallestPoint.distance <= smallestDist) {
                cost.set(key, smallestPoint.distance);
            }
            else {
                shouldAddNeighbours = false;
            }
        }
        else {
            cost.set(key, smallestPoint.distance);
        }

        if (shouldAddNeighbours) {
            directions.forEach(x => {
                const newRow: number = smallestRow + x[0];
                const newCol: number = smallestCol + x[1];
                if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
                    if (!visited.has("" + newRow + newCol)) {
                        const newKey: string = "" + newRow + newCol;
                        const hasEntry: boolean = cost.has(newKey);

                        if (!hasEntry || cost.get(newKey) > dist + grid[newRow][newCol]) {
                            unvisited.add({
                                row: newRow,
                                col: newCol,
                                distance: dist + grid[newRow][newCol]
                            });

                            cost.set(newKey, dist + grid[newRow][newCol]);
                        }
                    }
                }
            })
        }
    }
}

let input: string[];
input = loadFile("inputs/Day15.txt", "\n");

let grid: number[][] = new Array(input.length);
for (let i: number = 0; i < input.length; i++) {
    grid[i] = [];
}

let gridPart2: number[][] = new Array(input.length * 5);
for (let i: number = 0; i < input.length * 5; i++) {
    gridPart2[i] = [];
}

let i: number = 0;
input.forEach(x => {
    x.split("").map(x => parseInt(x)).forEach(y => grid[i].push(y));
    i++;
})

const inpCols: number = input[0].length;
for (let i: number = 0; i < input.length ; i++) {
    const str: string = input[i];

    for (let j: number = 0; j < inpCols; j++) {
        let val: number = parseInt(str[j]);

        for (let c = 0; c < 5; c++) {
            gridPart2[i][j + (c * inpCols)] = val;
            val = (val === 9) ? 1 : val + 1;
        }
    }
}

for (let i: number = input.length; i < gridPart2.length; i++) {
    for (let j: number = 0; j < gridPart2[0].length; j++) {
        const prevVal = gridPart2[i - input.length][j];
        gridPart2[i][j] = (prevVal === 9) ? 1 : prevVal + 1;
    }
}

calculateMinDistance(grid);
let part1: number = cost.get("" + (grid.length - 1) + (grid[0].length - 1));

calculateMinDistance(gridPart2);
let part2: number = cost.get("" + (gridPart2.length - 1) + (gridPart2[0].length - 1));

console.log("Part 1 ", part1);
console.log("Part 2 ", part2);

