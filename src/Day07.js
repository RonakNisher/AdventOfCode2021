"use strict";
exports.__esModule = true;
var Utils_1 = require("./Utils");
// Start
var input;
input = Utils_1.loadFile("inputs/Day07.txt", ",").map(function (x) { return parseInt(x); });
var posToAlign = 0;
var posToAlignPart2 = 0;
var minFuel = 100000000;
var minFuelPart2 = 100000000;
var fuel = 0;
var fuelPart2 = 0;
var diff = 0;
var maxPos = Math.max.apply(Math, input);
var minPos = Math.min.apply(Math, input);
for (var k = minPos; k < maxPos; k++) {
    for (var i = 0; i < input.length; i++) {
        diff = Math.abs(input[i] - k);
        fuel += diff;
        fuelPart2 += (diff * (diff + 1) / 2);
    }
    if (fuel < minFuel) {
        minFuel = fuel;
        posToAlign = k;
    }
    if (fuelPart2 < minFuelPart2) {
        minFuelPart2 = fuelPart2;
        posToAlignPart2 = k;
    }
    fuel = 0;
    fuelPart2 = 0;
}
console.log("Part 1 ", minFuel);
console.log("Part 2 ", minFuelPart2);
