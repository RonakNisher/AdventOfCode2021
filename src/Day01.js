"use strict";
exports.__esModule = true;
var Utils_1 = require("./Utils");
var input;
input = Utils_1.loadFile("inputs/Day01.txt", "\n");
var depths = [];
input.forEach(function (line) {
    depths.push(parseInt(line));
});
var part1 = depths.map(function (x, index) { return Number(x > depths[index - 1]); })
    .reduce(function (prev, curr) { return prev + curr; });
console.log("Part1 ", part1);
var part2 = depths.map(function (x, index) { return Number(x > depths[index - 3]); })
    .reduce(function (prev, curr) { return prev + curr; });
console.log("part2 ", part2);
