import {loadFile} from "./Utils";

export function checkBoard(board: string[]): boolean {

    // check rows
    for (let i: number = 0; i < board.length; i += 5)
    {
        if (board[i] === 'x' && board[i+1] === 'x' && board[i+2] === 'x' && board[i+3] === 'x' && board[i+4] === 'x')
            return true;
    }

    // check cols
    for (let i: number = 0; i < 5; i++) {
        if (board[i] === 'x' && board[i + 5] === 'x' && board[i + 10] === 'x' && board[i + 15] === 'x' && board[i + 20] === 'x')
            return true;
    }
    
    return false;
}

// Start

let input: string[];
input = loadFile("inputs/Day04.txt", "\n\n");

let numbersToBeDrawn: string[] = input[0].split(",");

let boards: string[][] = [];

for (let i: number = 1; i < input.length; i++) {
    boards.push(input[i].split(/[\n ]/).filter( x => x != ""));
}

let foundAWinner: boolean = false;
let winningBoard: number = -1;
let currentNumberDrawnIndex: number = 0;
let currentNumberDrawn: string;
let winningBoards: number[] = [];
while (winningBoards.length !== boards.length) {
    currentNumberDrawn = numbersToBeDrawn[currentNumberDrawnIndex++];
    boards.forEach((board: string[], index: number) => {

        if (!winningBoards.some(x => x === index))
        {
            for (let i: number = 0; i < board.length; i++) {
                if (currentNumberDrawn === board[i]){
                    board[i] = 'x';
                }
            }
        }
    });

    boards.forEach((board: string[], index: number) => {
        if (!winningBoards.some(x => x === index) && checkBoard(board))
        {
            if (!foundAWinner) {
                winningBoard = index;
                let value: number = board.filter(x => x !== 'x').map(x => parseInt(x)).reduce((prev, current) => { return prev + current });
                console.log("Part 1: ", value * parseInt(currentNumberDrawn));
                foundAWinner = true;
            }

            if (winningBoards.length === (boards.length - 1))
            {
                let value: number = board.filter(x => x !== 'x').map(x => parseInt(x)).reduce((prev, current) => { return prev + current });
                console.log("Part 2: ", value * parseInt(currentNumberDrawn));
                
            }

            winningBoards.push(index);
        }
    });
}

