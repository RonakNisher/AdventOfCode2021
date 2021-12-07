"use strict";
exports.__esModule = true;
exports.draw = void 0;
var Utils_1 = require("./Utils");
function draw(grid, line, includeDiagonals) {
    var points = line.split(/[->,]/).filter(function (x) { return x != ''; }).map(function (x) { return parseInt(x); });
    var start = 0;
    var end = 0;
    if (points[0] !== points[2] && points[1] !== points[3]) {
        if (!includeDiagonals)
            return;
        var xAxisDelta = (points[2] - points[0]) / Math.abs(points[2] - points[0]);
        var yAxisDelta = (points[3] - points[1]) / Math.abs(points[3] - points[1]);
        var i = points[0];
        var j = points[1];
        for (; i !== points[2] && j !== points[3]; i += xAxisDelta, j += yAxisDelta) {
            grid[j][i] += 1;
        }
        grid[j][i] += 1;
        return;
    }
    var isHorizontalLine = points[1] === points[3];
    var constant = isHorizontalLine ? points[1] : points[0];
    if (!isHorizontalLine) {
        start = Math.min(points[1], points[3]);
        end = Math.max(points[1], points[3]);
    }
    else {
        start = Math.min(points[0], points[2]);
        end = Math.max(points[0], points[2]);
    }
    for (var i = start; i <= end; i++) {
        isHorizontalLine ? grid[constant][i] += 1 : grid[i][constant] += 1;
    }
}
exports.draw = draw;
var input;
input = Utils_1.loadFile("inputs/Day05.txt", "\n");
var grid = [];
var gridPart2 = [];
var maxLen = 1000;
for (var i = 0; i <= maxLen; i++) {
    grid[i] = [0];
    gridPart2[i] = [0];
    for (var j = 0; j <= maxLen; j++) {
        grid[i][j] = 0;
        gridPart2[i][j] = 0;
    }
}
input.forEach(function (x) {
    draw(grid, x, false /* includeDiagonals */);
    draw(gridPart2, x, true /* includeDiagonals */);
});
console.log("------------------------------------------------------");
var part1 = 0;
var part2 = 0;
for (var i = 0; i <= maxLen; i++) {
    part1 += grid[i].filter(function (x) { return x >= 2; }).length;
    part2 += gridPart2[i].filter(function (x) { return x >= 2; }).length;
}
console.log("Part 1 ", part1);
console.log("Part 2 ", part2);
console.log("------------------------------------------------------");
