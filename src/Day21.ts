import {loadFile} from "./Utils";

export function getNumberOfCases(diceThrowValue: number) : number {
    switch (diceThrowValue) {
        case 3: return 1;
        case 4: return 3;
        case 5: return 6;
        case 6: return 7;
        case 7: return 6;
        case 8: return 3;
        case 9: return 1;
    }

    return 0; // error
}

export function playGame(scoreP1: number, scoreP2: number, posP1: number, posP2: number, isP1Turn: boolean) {
    
    let totalWinsP1 = 0;
    let totalWinsP2 = 0;

    if (scoreP1 >= 21)
        return [totalWinsP1 + 1, totalWinsP2];

    if (scoreP2 >= 21)
        return [totalWinsP1, totalWinsP2 + 1];

    for (let i: number = 3; i <= 9; i++) {
        let posP1Univ: number = posP1;
        let posP2Univ: number = posP2;
        let scoreP1Univ: number = scoreP1;
        let scoreP2Univ: number = scoreP2;
        
        let diceThrow: number = i;
        
        if (isP1Turn) {
            posP1Univ += diceThrow;
            posP1Univ = (posP1Univ % 10 === 0) ? 10 : (posP1Univ % 10);
            scoreP1Univ += posP1Univ;
        }
        else {
            posP2Univ += diceThrow;
            posP2Univ = (posP2Univ % 10 === 0) ? 10 : (posP2Univ % 10);
            scoreP2Univ += posP2Univ;
        }

        let [univ1P1Wins, univ1P2Wins] = playGame(scoreP1Univ, scoreP2Univ, posP1Univ, posP2Univ, isP1Turn ? false : true);

        totalWinsP1 += (univ1P1Wins * getNumberOfCases(diceThrow));
        totalWinsP2 += (univ1P2Wins * getNumberOfCases(diceThrow));
    }

    return [totalWinsP1, totalWinsP2];
}

let input: string[];
input = loadFile("inputs/Day21.txt", "\n");

let posPlayer1: number = parseInt(input[0].split(": ")[1]);
let posPlayer2: number = parseInt(input[1].split(": ")[1]);

let scoreP1: number = 0;
let scoreP2: number = 0;
let die: number = 1;
let isP1Turn: boolean = true;
let newPos: number = 0;
let noOfThrows: number = 0;

// part 1
while (true) {
    noOfThrows++;
    newPos = die++ + die++ + die++;

    newPos += isP1Turn ? posPlayer1 : posPlayer2;
    
    const foo: number = newPos % 10;
    newPos = foo === 0 ? 10 : foo;
    if (isP1Turn) {
        posPlayer1 = newPos;
        scoreP1 += newPos;
    }
    else {
        posPlayer2 = newPos;
        scoreP2 += newPos;
    }

    isP1Turn = isP1Turn ? false : true;

    if (scoreP1 >= 1000 || scoreP2 >= 1000)
        break;
}

let score: number = scoreP1 >= 1000 ? scoreP2 : scoreP1;
let part1: number = score * noOfThrows * 3;

// ****************************************************
// part 2
// ****************************************************

let [winsP1, winsP2] = playGame(0, 0, posPlayer1, posPlayer2, true);

let part2: number = Math.max(winsP1, winsP2);


console.log("Part 1 ", part1);
console.log("Part 2 ", part2);
