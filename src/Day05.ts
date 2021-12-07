import {loadFile} from "./Utils";

export function draw(grid: number[][], line: string, includeDiagonals: boolean): void {
    let points: number[] = line.split(/[->,]/).filter(x => x != '').map(x => parseInt(x));

    let start: number = 0;
    let end: number = 0;

    if (points[0] !== points[2] && points[1] !== points[3]) {
        if (!includeDiagonals)
            return;

        let xAxisDelta = (points[2] - points[0]) / Math.abs(points[2] - points[0]);
        let yAxisDelta = (points[3] - points[1]) / Math.abs(points[3] - points[1]);
        let i: number = points[0];
        let j: number = points[1];
        for (; i !== points[2] && j !== points[3]; i += xAxisDelta, j += yAxisDelta) {
            grid[j][i] += 1;
        }
        grid[j][i] += 1;

        return;
    }

    let isHorizontalLine: boolean = points[1] === points[3];
    let constant: number = isHorizontalLine ? points[1] : points[0];

    if (!isHorizontalLine) {
        start = Math.min(points[1], points[3]);
        end = Math.max(points[1], points[3]);
    } else {
        start = Math.min(points[0], points[2]);
        end = Math.max(points[0], points[2]);
    }

    for (let i: number = start; i <= end; i++) {
        isHorizontalLine ? grid[constant][i]+=1 : grid[i][constant]+=1;
    }
}

let input: string[];
input = loadFile("inputs/Day05.txt", "\n");

let grid: number[][] = [];
let gridPart2: number[][] = [];
let maxLen: number = 1000;
for (let i: number = 0; i <= maxLen; i++) {
    grid[i] = [0];
    gridPart2[i] = [0];
    for (let j: number = 0; j <= maxLen; j++) {
        grid[i][j] = 0;
        gridPart2[i][j] = 0;
    }
}

input.forEach( x => {
    draw(grid, x, false /* includeDiagonals */);
    draw(gridPart2, x, true /* includeDiagonals */);
});

console.log("------------------------------------------------------");
let part1: number = 0;
let part2: number = 0;

for (let i: number = 0; i <= maxLen; i++) {
    part1 += grid[i].filter(x => x >= 2).length;
    part2 += gridPart2[i].filter(x => x >= 2).length;
}
    
console.log("Part 1 ", part1);
console.log("Part 2 ", part2);
console.log("------------------------------------------------------");
