import {loadFile} from "./Utils";

let input: string[];
input = loadFile("inputs/Day02.txt", "\n");
console.log(input.length);

let depth: number = 0;
let depthPart2: number = 0;
let horizontal: number = 0;
let aim: number = 0;
let direction: string;
let value: number = 0;

input.forEach((line: string) => {    
    let instruction = line.split(' ');
    direction = instruction[0];
    value = parseInt(instruction[1]);
    
    switch (direction) {
        case 'forward':
            horizontal += value;
            depthPart2 += (aim * value);
            break;

        case 'up':
            depth -= value;
            aim -= value;
            break;

        case 'down':
            depth += value;
            aim += value;
            break;
    }

});

console.log("Part1: Horizontal ", horizontal, " Depth ", depth, "Answer ", depth * horizontal);
console.log("Part2: Horizontal ", horizontal, " Depth ", depthPart2, " aim ", aim, " Answer ", depthPart2 * horizontal);

// Part 2



