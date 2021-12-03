"use strict";
exports.__esModule = true;
var Utils_1 = require("./Utils");
var input;
input = Utils_1.loadFile("inputs/Day02.txt", "\n");
console.log(input.length);
var depth = 0;
var depthPart2 = 0;
var horizontal = 0;
var aim = 0;
var direction;
var value = 0;
input.forEach(function (line) {
    var instruction = line.split(' ');
    direction = instruction[0];
    value = parseInt(instruction[1]);
    switch (direction) {
        case 'forward':
            horizontal += value;
            depthPart2 += (aim * value);
            break;
        case 'up':
            depth -= value;
            aim -= value;
            break;
        case 'down':
            depth += value;
            aim += value;
            break;
    }
});
console.log("Part1: Horizontal ", horizontal, " Depth ", depth, "Answer ", depth * horizontal);
console.log("Part2: Horizontal ", horizontal, " Depth ", depthPart2, " aim ", aim, " Answer ", depthPart2 * horizontal);
// Part 2
