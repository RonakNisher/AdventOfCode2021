"use strict";
exports.__esModule = true;
exports.isLowestPoint = exports.getSize = void 0;
var Utils_1 = require("./Utils");
var sizes = new Array();
var directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
var seen = new Set();
function getSize(grid, row, col, value) {
    if (seen.has("" + row + col))
        return 0;
    seen.add("" + row + col);
    if ((row < 0) || (row >= grid.length) || (col < 0) || (col >= grid[0].length)) {
        return 0;
    }
    if (grid[row][col] >= 9)
        return 0;
    var res = 1;
    directions.forEach(function (x) {
        var newRow = x[0] + row;
        var newCol = x[1] + col;
        res += getSize(grid, newRow, newCol, value + 1);
    });
    return res;
}
exports.getSize = getSize;
function isLowestPoint(grid, row, col) {
    var isLowest = true;
    directions.forEach(function (x) {
        var newRow = x[0] + row;
        var newCol = x[1] + col;
        if ((newRow < 0) || (newRow >= grid.length) || (newCol < 0) || (newCol >= grid[0].length)) {
        }
        else {
            if (grid[row][col] >= grid[newRow][newCol])
                isLowest = false;
        }
    });
    if (isLowest) {
        seen.clear();
        var size = getSize(grid, row, col, grid[row][col]);
        sizes.push(size);
    }
    return isLowest ? (grid[row][col] + 1) : 0;
}
exports.isLowestPoint = isLowestPoint;
// Start
var input;
input = Utils_1.loadFile("inputs/Day09.txt", "\n");
var grid = [];
var part1 = 0;
var part2 = 0;
input.forEach(function (x) {
    grid.push(x.split("").map(function (y) { return parseInt(y); }));
});
for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
        part1 += isLowestPoint(grid, i, j);
    }
}
console.log("Part 1 ", part1);
console.log("Part 2 ", sizes.sort(function (n1, n2) { return n2 - n1; }).splice(0, 3).reduce(function (prev, curr) { return prev * curr; }));
