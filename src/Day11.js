"use strict";
exports.__esModule = true;
var Utils_1 = require("./Utils");
var input;
input = Utils_1.loadFile("inputs/Day11.txt", "\n");
var directions = [[1, 0], [-1, 0], [0, 1], [0, -1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
var seen = new Set();
var grid = [];
var part1 = 0;
var part2 = 0;
input.forEach(function (x) {
    grid.push(x.split("").map(function (y) { return parseInt(y); }));
});
var round = 0;
while (round < 250) {
    part2 = 0;
    var foundNewFlashes = true;
    seen.clear();
    // +1
    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[0].length; col++) {
            grid[row][col] = grid[row][col] + 1;
        }
    }
    while (foundNewFlashes) {
        foundNewFlashes = false;
        var _loop_1 = function (row) {
            var _loop_2 = function (col) {
                if (seen.has("" + row + col))
                    return "continue";
                if (grid[row][col] > 9) {
                    seen.add("" + row + col);
                    directions.forEach(function (x) {
                        var newRow = row + x[0];
                        var newCol = col + x[1];
                        if (!((newRow < 0) || (newRow >= grid.length) || (newCol < 0) || (newCol >= grid[0].length))) {
                            grid[newRow][newCol] += 1;
                        }
                    });
                }
            };
            for (var col = 0; col < grid[0].length; col++) {
                _loop_2(col);
            }
        };
        for (var row = 0; row < grid.length; row++) {
            _loop_1(row);
        }
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[0].length; col++) {
                if (grid[row][col] > 9 && !seen.has("" + row + col))
                    foundNewFlashes = true;
            }
        }
    }
    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[0].length; col++) {
            if (grid[row][col] > 9) {
                part1++;
                part2++;
                grid[row][col] = 0;
            }
        }
    }
    var found = true;
    for (var row = 0; row < grid.length; row++) {
        if (grid[row].some(function (x) { return x !== 0; })) {
            found = false;
        }
    }
    if (found) {
        console.log("**********************************");
        console.log("Part 2 ", round + 1);
        console.log("**********************************");
        break;
    }
    round++;
    if (round === 100)
        console.log("Part 1 ", part1);
}
