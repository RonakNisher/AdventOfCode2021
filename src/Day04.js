"use strict";
exports.__esModule = true;
exports.checkBoard = void 0;
var Utils_1 = require("./Utils");
function checkBoard(board) {
    // check rows
    for (var i = 0; i < board.length; i += 5) {
        if (board[i] === 'x' && board[i + 1] === 'x' && board[i + 2] === 'x' && board[i + 3] === 'x' && board[i + 4] === 'x')
            return true;
    }
    // check cols
    for (var i = 0; i < 5; i++) {
        if (board[i] === 'x' && board[i + 5] === 'x' && board[i + 10] === 'x' && board[i + 15] === 'x' && board[i + 20] === 'x')
            return true;
    }
    return false;
}
exports.checkBoard = checkBoard;
// Start
var input;
input = Utils_1.loadFile("inputs/Day04.txt", "\n\n");
var numbersToBeDrawn = input[0].split(",");
var boards = [];
for (var i = 1; i < input.length; i++) {
    boards.push(input[i].split(/[\n ]/).filter(function (x) { return x != ""; }));
}
var foundAWinner = false;
var winningBoard = -1;
var currentNumberDrawnIndex = 0;
var currentNumberDrawn;
var winningBoards = [];
while (winningBoards.length !== boards.length) {
    currentNumberDrawn = numbersToBeDrawn[currentNumberDrawnIndex++];
    boards.forEach(function (board, index) {
        if (!winningBoards.some(function (x) { return x === index; })) {
            for (var i = 0; i < board.length; i++) {
                if (currentNumberDrawn === board[i]) {
                    board[i] = 'x';
                }
            }
        }
    });
    boards.forEach(function (board, index) {
        if (!winningBoards.some(function (x) { return x === index; }) && checkBoard(board)) {
            if (!foundAWinner) {
                winningBoard = index;
                var value = board.filter(function (x) { return x !== 'x'; }).map(function (x) { return parseInt(x); }).reduce(function (prev, current) { return prev + current; });
                console.log("Part 1: ", value * parseInt(currentNumberDrawn));
                foundAWinner = true;
            }
            if (winningBoards.length === (boards.length - 1)) {
                var value = board.filter(function (x) { return x !== 'x'; }).map(function (x) { return parseInt(x); }).reduce(function (prev, current) { return prev + current; });
                console.log("Part 2: ", value * parseInt(currentNumberDrawn));
            }
            winningBoards.push(index);
        }
    });
}
