"use strict";
exports.__esModule = true;
exports.findNumbers = void 0;
var Utils_1 = require("./Utils");
function findNumbers(patterns) {
    var mapPatternToNumber = new Map();
    var remainingPatterns = new Set();
    patterns = patterns.map(function (x) { return x.split("").sort().join(""); });
    patterns.forEach(function (x, index) {
        var len = x.length;
        if (len === 2) {
            mapPatternToNumber.set(1, x);
        }
        else if (len === 4) {
            mapPatternToNumber.set(4, x);
        }
        else if (len === 3) {
            mapPatternToNumber.set(7, x);
        }
        else if (len === 7) {
            mapPatternToNumber.set(8, x);
        }
        else {
            remainingPatterns.add(x);
        }
    });
    // We can find the number 3 if length is 5 and it includes all letters from the number 1
    // We can find the number 9 if length is 5 and it includes all letters from the number 4
    remainingPatterns.forEach(function (x) {
        if (x.length === 5) {
            if (mapPatternToNumber.get(1).split("").every(function (char) { return x.includes(char); })) {
                mapPatternToNumber.set(3, x);
                remainingPatterns["delete"](x);
            }
        }
        else if (x.length === 6) {
            if (mapPatternToNumber.get(4).split("").every(function (char) { return x.includes(char); })) {
                mapPatternToNumber.set(9, x);
                remainingPatterns["delete"](x);
            }
        }
    });
    // Level 2
    // We can find the number 0 if it includes all letters from the number 1
    remainingPatterns.forEach(function (x) {
        if (x.length === 6) {
            if (mapPatternToNumber.get(1).split("").every(function (char) { return x.includes(char); })) {
                mapPatternToNumber.set(0, x);
                remainingPatterns["delete"](x);
            }
        }
    });
    // level 3
    // We can find the number 6 if the length is 6
    remainingPatterns.forEach(function (x) {
        if (x.length === 6) {
            mapPatternToNumber.set(6, x);
            remainingPatterns["delete"](x);
        }
    });
    // level 4 -> find 5
    // We can find the number 5 if all letters of it are included in 6
    remainingPatterns.forEach(function (x) {
        if (x.split("").every(function (char) { return mapPatternToNumber.get(6).includes(char); })) {
            mapPatternToNumber.set(5, x);
            remainingPatterns["delete"](x);
        }
    });
    // final letter
    // the only letter left now should be 2
    remainingPatterns.forEach(function (x) {
        mapPatternToNumber.set(2, x);
        remainingPatterns["delete"](x);
    });
    var segments = new Map();
    for (var i = 0; i <= 9; i++) {
        segments.set(mapPatternToNumber.get(i), i);
    }
    return segments;
}
exports.findNumbers = findNumbers;
// Start
var input;
input = Utils_1.loadFile("inputs/Day08.txt", "\n");
var part1 = 0;
var part2 = 0;
input.forEach(function (x) {
    var data = x.split(" | ");
    var segments = findNumbers(data[0].split(" "));
    var results = data[1].split(" ").map(function (x) { return x.split("").sort().join(""); });
    var multiplier = 1000;
    var final = 0;
    results.forEach(function (x) {
        var digit = segments.get(x);
        final += (digit * multiplier);
        multiplier /= 10;
        if (digit === 1 || digit === 4 || digit === 7 || digit === 8)
            part1++;
    });
    part2 += final;
});
console.log("Part 1 ", part1);
console.log("Part 2 ", part2);
