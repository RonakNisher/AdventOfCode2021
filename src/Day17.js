"use strict";
exports.__esModule = true;
exports.doesFallInTargetArea = void 0;
var Utils_1 = require("./Utils");
var minX = 257;
var maxX = 286;
var maxY = -57;
var minY = -101;
function doesFallInTargetArea(xVelocity, yVelocity) {
    var x = 0;
    var y = 0;
    var maxPos = -10000;
    while (true) {
        x += xVelocity;
        y += yVelocity;
        // did we overshoot?
        if (maxY < 0 && y < minY || maxY > 0 && y > maxY) { // y < maxY because y is negative
            return [false, -1];
        }
        // did we overshoot?
        if (maxX < 0 && x < minX || maxX > 0 && x > maxX) {
            return [false, -1];
        }
        // will we undershoot?
        if (xVelocity === 0 && x < minX) {
            return [false, -1];
        }
        if (y > maxPos)
            maxPos = y;
        if (((maxX > 0 && x >= minX && x <= maxX) || (maxX < 0 && x <= minX && x >= maxX)) &&
            ((maxY > 0 && y >= minY && y <= maxY) || (maxY < 0 && y <= maxY && y >= minY))) {
            return [true, maxPos];
        }
        if (xVelocity > 0)
            xVelocity--;
        else if (xVelocity < 0)
            xVelocity++;
        yVelocity--;
    }
}
exports.doesFallInTargetArea = doesFallInTargetArea;
var input;
input = Utils_1.loadFile("inputs/Day17.txt", "\n");
var possibleValues = new Set();
var maxHeight = -10000;
var maxHeightX = 0;
var maxHeightY = 0;
for (var i = 0; i < 500; i++) { // x
    for (var j = -500; j < 500; j++) { // y
        var _a = doesFallInTargetArea(i, j), didLandInArea = _a[0], pos = _a[1];
        if (didLandInArea) {
            possibleValues.add("" + i + "," + j);
            if (pos > maxHeight) {
                maxHeight = pos;
                maxHeightX = i;
                maxHeightY = j;
            }
        }
        // else {
        //     // We already overshot, no need to try more velocities
        // }
    }
}
// console.log("Max Pos: ", maxHeight, " at vel ", maxHeightX, ", ", maxHeightY);
var part1 = maxHeight;
var part2 = possibleValues.size;
console.log("Part 1 ", part1);
console.log("Part 2 ", part2);
