import {loadFile} from "./Utils";

let input: string[];
input = loadFile("inputs/Day01.txt", "\n");

let depths: number[] = [];

input.forEach((line: string) => {
    depths.push(parseInt(line));
});

let part1: number = depths.map( (x, index) => {return Number(x > depths[index - 1])})
                        .reduce((prev, curr) => { return prev + curr });
console.log("Part1 ", part1);

let part2: number = depths.map((x, index) => { return Number(x > depths[index - 3])})
                        .reduce((prev, curr) => { return prev + curr });
console.log("part2 ", part2);