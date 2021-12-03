"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.filterInput = void 0;
var Utils_1 = require("./Utils");
function filterInput(arr, significantBit) {
    var countOf1 = 0;
    var countOf0 = 0;
    var filterBit;
    var _loop_2 = function (i) {
        countOf0 = 0;
        countOf1 = 0;
        arr.forEach(function (line) {
            if (line[i] == '0')
                countOf0++;
            else
                countOf1++;
        });
        if (countOf0 !== countOf1) {
            if (significantBit == '1')
                filterBit = (countOf0 > countOf1) ? '0' : '1';
            else
                filterBit = (countOf0 < countOf1) ? '0' : '1';
        }
        else
            filterBit = significantBit;
        arr = arr.filter(function (s) {
            return (s[i] == filterBit);
        });
        if (arr.length == 1) {
            return "break";
        }
    };
    for (var i = 0; i < arr[0].length; i++) {
        var state_1 = _loop_2(i);
        if (state_1 === "break")
            break;
    }
    return arr[0];
}
exports.filterInput = filterInput;
// Start
var input;
input = Utils_1.loadFile("inputs/Day03.txt", "\n");
var gammeRate = 0;
var gammeRateBinary = '';
var epsilonRate = 0;
var epsilonRateBinary = '';
var countOf1 = 0;
var countOf0 = 0;
var _loop_1 = function (i) {
    countOf0 = 0;
    countOf1 = 0;
    input.forEach(function (line) {
        if (line.charAt(i) == '0')
            countOf0++;
        else
            countOf1++;
    });
    if (countOf1 > countOf0) {
        gammeRateBinary = gammeRateBinary.concat('1');
        epsilonRateBinary = epsilonRateBinary.concat('0');
    }
    else {
        gammeRateBinary = gammeRateBinary.concat('0');
        epsilonRateBinary = epsilonRateBinary.concat('1');
    }
};
for (var i = 0; i < input[0].length; i++) {
    _loop_1(i);
}
gammeRate = parseInt(gammeRateBinary, 2);
epsilonRate = parseInt(epsilonRateBinary, 2);
console.log("gammeRateBinary ", gammeRateBinary, " -> ", gammeRate);
console.log("epsilonRateBinary ", epsilonRateBinary, " -> ", epsilonRate);
console.log("Part 1: ", gammeRate * epsilonRate);
// Part 2
var arr = __spreadArrays(input);
var oxygenRateBinary = filterInput(arr, '1');
arr = __spreadArrays(input);
var co2RateBinary = filterInput(arr, '0');
var oxygenRate = parseInt(oxygenRateBinary, 2);
var co2Rate = parseInt(co2RateBinary, 2);
console.log("oxygenRateBinary ", oxygenRateBinary, " -> ", oxygenRate);
console.log("co2RateBinary ", co2RateBinary, " -> ", co2Rate);
console.log("Part 2: ", oxygenRate * co2Rate);
