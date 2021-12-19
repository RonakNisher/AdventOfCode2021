import {loadFile} from "./Utils";

let minX: number = 257;
let maxX: number = 286;
let maxY: number = -57;
let minY: number = -101;

export function doesFallInTargetArea(xVelocity: number, yVelocity: number): [boolean, number] {
    let x: number = 0;
    let y: number = 0;
    let maxPos: number = -10000;

    while (true) {
        x += xVelocity;
        y += yVelocity;

        // did we overshoot?
        if (maxY < 0 && y < minY || maxY > 0 && y > maxY) { // y < maxY because y is negative
            return [false, -1];
        }

        // did we overshoot?
        if (maxX < 0 && x < minX || maxX > 0 && x > maxX) {
            return [false, -1];
        }

        // will we undershoot?
        if (xVelocity === 0 && x < minX) {
            return [false, -1];
        }

        if (y > maxPos)
            maxPos = y;

        if (((maxX > 0 && x >= minX && x <= maxX ) || (maxX < 0 && x <= minX && x >= maxX)) &&
            ((maxY > 0 && y >= minY && y <= maxY) || (maxY < 0 && y <= maxY && y >= minY))) {
            return [true, maxPos];
        }

        if (xVelocity > 0)
            xVelocity--;
        else if (xVelocity < 0)
            xVelocity++;
        
        yVelocity--;
    }
}

let input: string[];
input = loadFile("inputs/Day17.txt", "\n");

let possibleValues: Set<string> = new Set();

let maxHeight: number = -10000;
let maxHeightX: number = 0;
let maxHeightY: number = 0;

for (let i: number = 0; i < 500; i++) { // x
    for (let j: number = -500; j < 500; j++) { // y
        let [didLandInArea, pos] = doesFallInTargetArea(i, j);
        if (didLandInArea) {
            possibleValues.add("" + i + "," + j);
            if (pos > maxHeight) {
                maxHeight = pos;
                maxHeightX = i;
                maxHeightY = j;
            }
        }
        // else {
        //     // We already overshot, no need to try more velocities
        // }
    }
}

// console.log("Max Pos: ", maxHeight, " at vel ", maxHeightX, ", ", maxHeightY);
let part1: number = maxHeight;
let part2: number = possibleValues.size;

console.log("Part 1 ", part1);
console.log("Part 2 ", part2);

