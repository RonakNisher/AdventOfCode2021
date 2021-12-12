import {loadFile} from "./Utils";

let input: string[];
input = loadFile("inputs/Day10.txt", "\n");

let part1: number = 0;
let incompleteScores: number[] = [];
input.forEach (x => {
    let stack: string[] = [];
    let corrupted: boolean = false;
    for (let i: number = 0; i < x.length; i++) {
        const char: string = x[i];

        if (stack.length === 0) {
            stack.push(char);
        }
        else {
            switch (char) {
                case '(': 
                case '[': 
                case '{': 
                case '<': 
                {
                    stack.push(char);
                    break;
                }

                case ')': {
                    if (stack[stack.length - 1] === '(')
                        stack.pop()
                    else {
                        corrupted = true;
                        part1 += 3;
                    }
                    break;
                }

                case ']': {
                    if (stack[stack.length - 1] === '[')
                        stack.pop()
                    else {
                        corrupted = true;
                        part1 += 57;
                    }
                    break;
                }

                case '}': {
                    if (stack[stack.length - 1] === '{')
                        stack.pop()
                    else {
                        corrupted = true;
                        part1 += 1197;
                    }
                    break;
                }

                case '>': {
                    if (stack[stack.length - 1] === '<')
                        stack.pop();
                    else {
                        corrupted = true;
                        part1 += 25137;
                    }
                    break;
                }
            }

            if (corrupted)
                break;
        }
    }

    if (!corrupted) {
        // Part 2
        let score: number = 0;
        while (stack.length !== 0) {
            const char: string = stack.pop();

            score *= 5;

            switch (char) {
                 case '(': {
                     score += 1;
                     break;
                 }

                case '[': {
                    score += 2;
                    break;
                }

                case '{': {
                    score += 3;
                    break;
                }

                case '<': {
                    score += 4;
                    break;
                }
            }
        }

        incompleteScores.push(score);
    }
});

console.log("Part 1 ", part1);
console.log("Part 2 ", incompleteScores.sort((n1, n2) => n1 - n2)[Math.floor(incompleteScores.length / 2)]);

