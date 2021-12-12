import {loadFile} from "./Utils";

let input: string[];
input = loadFile("inputs/Day11.txt", "\n");

const directions: number[][] = [[1, 0], [-1, 0], [0, 1], [0, -1],[-1, -1], [-1, 1], [1, -1], [1, 1]];
const seen: Set<string> = new Set<string>();

let grid: number[][] = [];

let part1: number = 0;
let part2: number = 0;
input.forEach(x => {
    grid.push(x.split("").map(y => parseInt(y)));
});

let round: number = 0;

while (round < 250) {
    part2 = 0;
    let foundNewFlashes: boolean = true;
    seen.clear();
    
    // +1
    for (let row: number = 0; row < grid.length; row++) {
        for (let col: number = 0; col < grid[0].length; col++) {
            grid[row][col] = grid[row][col] + 1;
        }
    }

    while (foundNewFlashes) {
        foundNewFlashes = false;

        for (let row: number = 0; row < grid.length; row++) {
            for (let col: number = 0; col < grid[0].length; col++) {
                if (seen.has("" + row + col))
                    continue;

                if (grid[row][col] > 9) {
                    seen.add("" + row + col);

                    directions.forEach( x => {
                        const newRow: number = row + x[0];
                        const newCol: number = col + x[1];
    
                        if (!((newRow < 0) || (newRow >= grid.length) || (newCol < 0) || (newCol >= grid[0].length))) {
                            grid[newRow][newCol] += 1;
                        }
                    });
                }
            }
        }
    
        for (let row: number = 0; row < grid.length; row++) {
            for (let col: number = 0; col < grid[0].length; col++) {
                if (grid[row][col] > 9 && !seen.has("" + row + col))
                    foundNewFlashes = true;
            }
        }
        
    }

    for (let row: number = 0; row < grid.length; row++) {
        for (let col: number = 0; col < grid[0].length; col++) {
            if (grid[row][col] > 9) {
                part1++;
                part2++;
                grid[row][col] = 0;
            }
        }
    }

    let found: boolean = true;
    for (let row: number = 0; row < grid.length; row++) {
        if (grid[row].some(x => x !== 0)) {
            found = false;
        }
    }

    if (found) {
        console.log("**********************************");
        console.log("Part 2 ", round + 1);
        console.log("**********************************");
        break;
    }

    round++;

    if (round === 100)
        console.log("Part 1 ", part1);
}