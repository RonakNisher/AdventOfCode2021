"use strict";
exports.__esModule = true;
exports.playGame = exports.getNumberOfCases = void 0;
var Utils_1 = require("./Utils");
function getNumberOfCases(diceThrowValue) {
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
exports.getNumberOfCases = getNumberOfCases;
function playGame(scoreP1, scoreP2, posP1, posP2, isP1Turn) {
    var totalWinsP1 = 0;
    var totalWinsP2 = 0;
    if (scoreP1 >= 21)
        return [totalWinsP1 + 1, totalWinsP2];
    if (scoreP2 >= 21)
        return [totalWinsP1, totalWinsP2 + 1];
    for (var i = 3; i <= 9; i++) {
        var posP1Univ = posP1;
        var posP2Univ = posP2;
        var scoreP1Univ = scoreP1;
        var scoreP2Univ = scoreP2;
        var diceThrow = i;
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
        var _a = playGame(scoreP1Univ, scoreP2Univ, posP1Univ, posP2Univ, isP1Turn ? false : true), univ1P1Wins = _a[0], univ1P2Wins = _a[1];
        totalWinsP1 += (univ1P1Wins * getNumberOfCases(diceThrow));
        totalWinsP2 += (univ1P2Wins * getNumberOfCases(diceThrow));
    }
    return [totalWinsP1, totalWinsP2];
}
exports.playGame = playGame;
var input;
input = Utils_1.loadFile("inputs/Day21.txt", "\n");
var posPlayer1 = parseInt(input[0].split(": ")[1]);
var posPlayer2 = parseInt(input[1].split(": ")[1]);
var scoreP1 = 0;
var scoreP2 = 0;
var die = 1;
var isP1Turn = true;
var newPos = 0;
var noOfThrows = 0;
// part 1
while (true) {
    noOfThrows++;
    newPos = die++ + die++ + die++;
    newPos += isP1Turn ? posPlayer1 : posPlayer2;
    var foo = newPos % 10;
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
var score = scoreP1 >= 1000 ? scoreP2 : scoreP1;
var part1 = score * noOfThrows * 3;
// ****************************************************
// part 2
// ****************************************************
var _a = playGame(0, 0, posPlayer1, posPlayer2, true), winsP1 = _a[0], winsP2 = _a[1];
var part2 = Math.max(winsP1, winsP2);
console.log("Part 1 ", part1);
console.log("Part 2 ", part2);
