import {loadFile} from "./Utils";

export function setPrevNumber(startPos: number, numberToAdd: string, inputString: string[]) {
    for (let i: number = startPos; i >= 0; i--) {
        let isNumber: boolean = inputString[i] !== "[" && inputString[i] !== "]" && inputString[i] !== ",";

        if (isNumber) {
            const newPrevNumber = parseInt(inputString[i]) + parseInt(numberToAdd);
            inputString[i] = newPrevNumber.toString();
            break;
        }
    }

    return ;
}

export function setNextNumber(startPos: number, numberToAdd: string, inputString: string[]) {

    for (let i: number = startPos; i < inputString.length; i++) {
        let isNumber: boolean = inputString[i] !== "[" && inputString[i] !== "]" && inputString[i] !== ",";
        if (isNumber) {
            const newNextNumber = parseInt(inputString[i]) + parseInt(numberToAdd);
            inputString[i] = newNextNumber.toString();
            break;
        }
    }
}

export function getReduction(left: string, right: string) : string {
    let inputStr: string[] = "[".concat(left, ",", right, "]").split("");
    let openBrackets: number = 0;

    let isFullyReduced: boolean = false;
    while (!isFullyReduced) {
        isFullyReduced = true;
        openBrackets = 0;

        // Look for a pair to reduce
        for (let i: number = 0; i < inputStr.length; i++) {

            let char: string = inputStr[i];
            if (char === "[") {
                // look for a pair that's under 4 nested loops
                if (openBrackets >= 4) {
                    isFullyReduced = false;

                    // [num1,num2]
                    if (inputStr[i + 2] === "," && inputStr[i + 4] === "]") {

                        setPrevNumber(i - 1, inputStr[i + 1], inputStr);
                        setNextNumber(i + 4, inputStr[i + 3], inputStr);

                        inputStr.splice(i, 5, "0"); // explode pair into a 0;
                        break;
                    }
                }
                else {
                    openBrackets++;
                }
            }
            else if (char === "]") {
                openBrackets--;
            }
        }

        if (isFullyReduced) {
            for (let i: number = 0; i < inputStr.length; i++) {
                let char: string = inputStr[i];

                if (char !== "]" && char !== "[" && char !== ",") {
                    const num: number = parseInt(char);
                    if (num >= 10) {

                        isFullyReduced = false;

                        const left: number = Math.floor(num / 2);
                        const right: number = Math.ceil(num / 2);

                        let newInputStr: string[] = inputStr.slice(0, i);
                        newInputStr.push("[");
                        newInputStr.push(left.toString());
                        newInputStr.push(",");
                        newInputStr.push(right.toString());
                        newInputStr.push("]");
                        newInputStr.push(...inputStr.slice(i + 1, inputStr.length + 1));

                        inputStr = newInputStr;

                        break;
                    }
                }
            }
        }
    }

    return inputStr.join("");
}

export function getMagnitude(reduced: string) {
    let finalresult: string[] = reduced.split("");

    while (finalresult.includes("[")) {
        for (let i: number = 0; i < finalresult.length - 4; i++) {
    
            // find pairs e.g.[2,9]
            if (finalresult[i] === "[" && finalresult[i + 2] === "," && finalresult[i + 4] === "]") {
                const left: number = parseInt(finalresult[i + 1]);
                const right: number = parseInt(finalresult[i + 3]);
                const magnitude: number = 3 * left + 2 * right;
                finalresult.splice(i, 5, magnitude.toString());
                break;
            }
        }
    }

    return finalresult[0];
}

let input: string[];
input = loadFile("inputs/Day18.txt", "\n");

let reduced: string = getReduction(input[0], input[1]);

for (let k: number = 2; k < input.length; k++) {
    reduced = getReduction(reduced, input[k]);
}

let part1: string = getMagnitude(reduced);

// Part 2
let magnitudes: number[] = [];

for (let i: number = 0; i < input.length; i++) {
    for (let j: number = 0; j < input.length; j++) {
        if (i == j) 
        continue;
        
        magnitudes.push(parseInt(getMagnitude(getReduction(input[i], input[j]))));
    }
}

let part2: number = Math.max(...magnitudes);

console.log("Part 1 ", part1);
console.log("Part 2 ", part2);
