"use strict";
exports.__esModule = true;
exports.getMagnitude = exports.getReduction = exports.setNextNumber = exports.setPrevNumber = void 0;
var Utils_1 = require("./Utils");
function setPrevNumber(startPos, numberToAdd, inputString) {
    for (var i = startPos; i >= 0; i--) {
        var isNumber = inputString[i] !== "[" && inputString[i] !== "]" && inputString[i] !== ",";
        if (isNumber) {
            var newPrevNumber = parseInt(inputString[i]) + parseInt(numberToAdd);
            inputString[i] = newPrevNumber.toString();
            break;
        }
    }
    return;
}
exports.setPrevNumber = setPrevNumber;
function setNextNumber(startPos, numberToAdd, inputString) {
    for (var i = startPos; i < inputString.length; i++) {
        var isNumber = inputString[i] !== "[" && inputString[i] !== "]" && inputString[i] !== ",";
        if (isNumber) {
            var newNextNumber = parseInt(inputString[i]) + parseInt(numberToAdd);
            inputString[i] = newNextNumber.toString();
            break;
        }
    }
}
exports.setNextNumber = setNextNumber;
function getReduction(left, right) {
    var inputStr = "[".concat(left, ",", right, "]").split("");
    var openBrackets = 0;
    var isFullyReduced = false;
    while (!isFullyReduced) {
        isFullyReduced = true;
        openBrackets = 0;
        // Look for a pair to reduce
        for (var i = 0; i < inputStr.length; i++) {
            var char = inputStr[i];
            if (char === "[") {
                // look for a pair that's under 4 nested loops
                if (openBrackets >= 4) {
                    isFullyReduced = false;
                    // [num1,num2]
                    if (inputStr[i + 2] === "," && inputStr[i + 4] === "]") {
                        setPrevNumber(i - 1, inputStr[i + 1], inputStr);
                        setNextNumber(i + 4, inputStr[i + 3], inputStr);
                        inputStr.splice(i, 5, "0"); // explode pair into a 0;
                        break;
                    }
                }
                else {
                    openBrackets++;
                }
            }
            else if (char === "]") {
                openBrackets--;
            }
        }
        if (isFullyReduced) {
            for (var i = 0; i < inputStr.length; i++) {
                var char = inputStr[i];
                if (char !== "]" && char !== "[" && char !== ",") {
                    var num = parseInt(char);
                    if (num >= 10) {
                        isFullyReduced = false;
                        var left_1 = Math.floor(num / 2);
                        var right_1 = Math.ceil(num / 2);
                        var newInputStr = inputStr.slice(0, i);
                        newInputStr.push("[");
                        newInputStr.push(left_1.toString());
                        newInputStr.push(",");
                        newInputStr.push(right_1.toString());
                        newInputStr.push("]");
                        newInputStr.push.apply(newInputStr, inputStr.slice(i + 1, inputStr.length + 1));
                        inputStr = newInputStr;
                        break;
                    }
                }
            }
        }
    }
    return inputStr.join("");
}
exports.getReduction = getReduction;
function getMagnitude(reduced) {
    var finalresult = reduced.split("");
    while (finalresult.includes("[")) {
        for (var i = 0; i < finalresult.length - 4; i++) {
            // find pairs e.g.[2,9]
            if (finalresult[i] === "[" && finalresult[i + 2] === "," && finalresult[i + 4] === "]") {
                var left = parseInt(finalresult[i + 1]);
                var right = parseInt(finalresult[i + 3]);
                var magnitude = 3 * left + 2 * right;
                finalresult.splice(i, 5, magnitude.toString());
                break;
            }
        }
    }
    return finalresult[0];
}
exports.getMagnitude = getMagnitude;
var input;
input = Utils_1.loadFile("inputs/Day18.txt", "\n");
var reduced = getReduction(input[0], input[1]);
for (var k = 2; k < input.length; k++) {
    reduced = getReduction(reduced, input[k]);
}
var part1 = getMagnitude(reduced);
// Part 2
var magnitudes = [];
for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input.length; j++) {
        if (i == j)
            continue;
        magnitudes.push(parseInt(getMagnitude(getReduction(input[i], input[j]))));
    }
}
var part2 = Math.max.apply(Math, magnitudes);
console.log("Part 1 ", part1);
console.log("Part 2 ", part2);
