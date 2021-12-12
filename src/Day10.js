"use strict";
exports.__esModule = true;
var Utils_1 = require("./Utils");
var input;
input = Utils_1.loadFile("inputs/Day10.txt", "\n");
var part1 = 0;
var incompleteScores = [];
input.forEach(function (x) {
    var stack = [];
    var corrupted = false;
    for (var i = 0; i < x.length; i++) {
        var char = x[i];
        if (stack.length === 0) {
            stack.push(char);
        }
        else {
            switch (char) {
                case '(':
                case '[':
                case '{':
                case '<':
                    {
                        stack.push(char);
                        break;
                    }
                case ')': {
                    if (stack[stack.length - 1] === '(')
                        stack.pop();
                    else {
                        corrupted = true;
                        part1 += 3;
                    }
                    break;
                }
                case ']': {
                    if (stack[stack.length - 1] === '[')
                        stack.pop();
                    else {
                        corrupted = true;
                        part1 += 57;
                    }
                    break;
                }
                case '}': {
                    if (stack[stack.length - 1] === '{')
                        stack.pop();
                    else {
                        corrupted = true;
                        part1 += 1197;
                    }
                    break;
                }
                case '>': {
                    if (stack[stack.length - 1] === '<')
                        stack.pop();
                    else {
                        corrupted = true;
                        part1 += 25137;
                    }
                    break;
                }
            }
            if (corrupted)
                break;
        }
    }
    if (!corrupted) {
        // Part 2
        var score = 0;
        while (stack.length !== 0) {
            var char = stack.pop();
            score *= 5;
            switch (char) {
                case '(': {
                    score += 1;
                    break;
                }
                case '[': {
                    score += 2;
                    break;
                }
                case '{': {
                    score += 3;
                    break;
                }
                case '<': {
                    score += 4;
                    break;
                }
            }
        }
        incompleteScores.push(score);
    }
});
console.log("Part 1 ", part1);
console.log("Part 2 ", incompleteScores.sort(function (n1, n2) { return n1 - n2; })[Math.floor(incompleteScores.length / 2)]);
