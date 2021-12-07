"use strict";
exports.__esModule = true;
var Utils_1 = require("./Utils");
var input;
input = Utils_1.loadFile("inputs/Day06.txt", ",");
var fishes = input.map(function (x) { return parseInt(x); });
var result = new Array(9);
result.fill(0);
fishes.forEach(function (x) {
    result[x]++;
});
var noOfRounds = 256;
var countOfNewFishes = 0;
for (var round = 1; round <= noOfRounds; round++) {
    countOfNewFishes = result[0];
    result[0] = result[1];
    result[1] = result[2];
    result[2] = result[3];
    result[3] = result[4];
    result[4] = result[5];
    result[5] = result[6];
    result[6] = result[7] + countOfNewFishes;
    result[7] = result[8];
    result[8] = countOfNewFishes;
    if (round == 80)
        console.log("Part 1 ", result.reduce(function (prev, curr) { return prev + curr; }));
}
var part1 = result.reduce(function (prev, curr) { return prev + curr; });
console.log("Part 2 ", part1);
