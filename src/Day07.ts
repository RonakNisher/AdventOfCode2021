import {loadFile} from "./Utils";

// Start

let input: number[];
input = loadFile("inputs/Day07.txt", ",").map(x => parseInt(x));

let posToAlign: number = 0;
let posToAlignPart2: number = 0;
let minFuel: number = 100000000;
let minFuelPart2: number = 100000000;
let fuel: number = 0;
let fuelPart2: number = 0;
let diff: number = 0;

let maxPos: number = Math.max(...input);
let minPos: number = Math.min(...input);

for (let k: number = minPos; k < maxPos; k++) {

    for (let i: number = 0; i < input.length; i++) {
        diff = Math.abs(input[i] - k);
        
        fuel += diff;
        fuelPart2 += (diff * (diff + 1)/2);        
    }

    if (fuel < minFuel) {
        minFuel = fuel;
        posToAlign = k;
    }

    if (fuelPart2 < minFuelPart2) {
        minFuelPart2 = fuelPart2;
        posToAlignPart2 = k;
    }

    fuel = 0;
    fuelPart2 = 0;
}

console.log("Part 1 ", minFuel);
console.log("Part 2 ", minFuelPart2);

