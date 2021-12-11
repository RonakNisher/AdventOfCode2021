import {loadFile} from "./Utils";

export function findNumbers(patterns: string[]) {
    let mapPatternToNumber: Map<number, string> = new Map();
    let remainingPatterns: Set<string> = new Set();
    
    patterns = patterns.map( x => { return x.split("").sort().join(""); });

    patterns.forEach( (x, index) => {
        const len: number = x.length;

        if (len === 2) {
            mapPatternToNumber.set(1, x);
        }
        else if (len === 4) {
            mapPatternToNumber.set(4, x);
        }
        else if (len === 3) {
            mapPatternToNumber.set(7, x);
        }
        else if (len === 7) {
            mapPatternToNumber.set(8, x);
        }
        else {
            remainingPatterns.add(x);
        }
    });

    // We can find the number 3 if length is 5 and it includes all letters from the number 1
    // We can find the number 9 if length is 5 and it includes all letters from the number 4
    remainingPatterns.forEach(x => {
        if (x.length === 5) {
            if (mapPatternToNumber.get(1).split("").every(char => x.includes(char))) {
                mapPatternToNumber.set(3, x);
                remainingPatterns.delete(x);
            }
        }
        else if (x.length === 6) {
            if (mapPatternToNumber.get(4).split("").every(char => x.includes(char))) {
                mapPatternToNumber.set(9, x);
                remainingPatterns.delete(x);
            }
        }
    });

    // Level 2
    // We can find the number 0 if it includes all letters from the number 1
    remainingPatterns.forEach(x => {
        if (x.length === 6) {
            if (mapPatternToNumber.get(1).split("").every(char => x.includes(char))) {
                mapPatternToNumber.set(0, x);
                remainingPatterns.delete(x);
            }
        }
    });

    // level 3
    // We can find the number 6 if the length is 6
    remainingPatterns.forEach(x => {
        if (x.length === 6) {
            mapPatternToNumber.set(6, x);
            remainingPatterns.delete(x);
        }
    });

    // level 4 -> find 5
    // We can find the number 5 if all letters of it are included in 6
    remainingPatterns.forEach(x => {
        if (x.split("").every(char => mapPatternToNumber.get(6).includes(char))) {
            mapPatternToNumber.set(5, x);
            remainingPatterns.delete(x);
        }
    });

    // final letter
    // the only letter left now should be 2
    remainingPatterns.forEach(x => {
        mapPatternToNumber.set(2, x);
        remainingPatterns.delete(x);
    });
    
    const segments: Map<string, number>  = new Map();
    for (let i: number = 0; i <= 9; i++)
    {
        segments.set(mapPatternToNumber.get(i), i);
    }

    return segments;
}

// Start

let input: string[];
input = loadFile("inputs/Day08.txt", "\n");

let part1: number = 0;
let part2: number = 0;
input.forEach (x => {
const data: string[] = x.split(" | ");

const segments: Map<string, number> = findNumbers(data[0].split(" "));
const results: string[] = data[1].split(" ").map(x => { return x.split("").sort().join("");})
let multiplier: number = 1000;
let final: number = 0;
results.forEach( x => {
    const digit: number = segments.get(x);
    final += (digit * multiplier);
    multiplier /= 10;

    if (digit === 1 || digit === 4 || digit === 7 || digit === 8)
        part1++;
})

part2 += final;
});

console.log("Part 1 ", part1);
console.log("Part 2 ", part2);