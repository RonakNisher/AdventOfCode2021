import {loadFile} from "./Utils";

let input: string[];
input = loadFile("inputs/Day06.txt", ",");

let fishes: number[] = input.map(x => parseInt(x));
let result: number[] = new Array(9);
result.fill(0);

fishes.forEach(x => {
    result[x]++;
});

let noOfRounds: number = 256;
let countOfNewFishes: number = 0;
for (let round: number = 1; round <= noOfRounds; round++) {

    countOfNewFishes = result[0];
    result[0] = result[1];
    result[1] = result[2];
    result[2] = result[3];
    result[3] = result[4];
    result[4] = result[5];
    result[5] = result[6];
    result[6] = result[7] + countOfNewFishes;
    result[7] = result[8];
    result[8] = countOfNewFishes;

    if (round == 80)
        console.log("Part 1 ", result.reduce((prev, curr) => { return prev + curr; }));
}

const part1: number = result.reduce((prev, curr) => { return prev + curr; });
console.log("Part 2 ", part1);

