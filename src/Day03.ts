import {loadFile} from "./Utils";

export function filterInput(arr: string[], significantBit: string): string {

    let countOf1: number = 0;
    let countOf0: number = 0;
    let filterBit: string;

    for (let i: number = 0; i < arr[0].length; i++) {

        countOf0 = 0;
        countOf1 = 0;

        arr.forEach((line: string) => {
            if (line[i] == '0')
                countOf0++;
            else
                countOf1++;
        });

        if (countOf0 !== countOf1) {
            if (significantBit == '1')
                filterBit = (countOf0 > countOf1) ? '0' : '1';
            else   
                filterBit = (countOf0 < countOf1) ? '0' : '1';
        }
        else
            filterBit = significantBit;

        arr = arr.filter((s: string) => {
            return (s[i] == filterBit);
        })

        if (arr.length == 1) {
            break;
        }
    }

    return arr[0];
}

// Start

let input: string[];
input = loadFile("inputs/Day03.txt", "\n");

let gammeRate: number = 0;
let gammeRateBinary: string = '';
let epsilonRate: number = 0;
let epsilonRateBinary: string = '';

let countOf1: number = 0;
let countOf0: number = 0;

for (let i: number = 0; i < input[0].length; i++) {
    countOf0 = 0;
    countOf1 = 0;
    input.forEach((line : string) => {
        if (line.charAt(i) == '0')
            countOf0++;
        else
            countOf1++;
    });
    if (countOf1 > countOf0){
        gammeRateBinary = gammeRateBinary.concat('1');
        epsilonRateBinary = epsilonRateBinary.concat('0');
    }
    else {
        gammeRateBinary = gammeRateBinary.concat('0');
        epsilonRateBinary = epsilonRateBinary.concat('1');
    }
}

gammeRate = parseInt(gammeRateBinary, 2);
epsilonRate = parseInt(epsilonRateBinary, 2);
console.log("gammeRateBinary ", gammeRateBinary, " -> ", gammeRate);
console.log("epsilonRateBinary ", epsilonRateBinary, " -> ", epsilonRate);
console.log("Part 1: ", gammeRate * epsilonRate);

// Part 2
let arr: string[] = [...input];
let oxygenRateBinary: string  = filterInput(arr, '1');

arr = [...input];
let co2RateBinary: string = filterInput(arr, '0');

let oxygenRate: number = parseInt(oxygenRateBinary, 2);
let co2Rate: number = parseInt(co2RateBinary, 2);

console.log("oxygenRateBinary ", oxygenRateBinary, " -> ", oxygenRate);
console.log("co2RateBinary ", co2RateBinary, " -> ", co2Rate);
console.log("Part 2: ", oxygenRate * co2Rate);


