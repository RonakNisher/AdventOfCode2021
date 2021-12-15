"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.calculateMinDistance = void 0;
var Utils_1 = require("./Utils");
var directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
var cost = new Map();
var unvisited = new Set();
var visited = new Set();
function calculateMinDistance(grid) {
    unvisited.clear();
    visited.clear();
    cost.clear();
    unvisited.add({ row: 0, col: 0, distance: 0 });
    var _loop_1 = function () {
        var e_1, _a;
        var smallestPoint = void 0;
        var dist = 100000;
        try {
            for (var _b = (e_1 = void 0, __values(unvisited.values())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                if (value.distance < dist) {
                    smallestPoint = value;
                    dist = value.distance;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        unvisited["delete"](smallestPoint);
        var smallestRow = smallestPoint.row;
        var smallestCol = smallestPoint.col;
        visited.add("" + smallestRow + smallestCol);
        var shouldAddNeighbours = true;
        var key = "" + smallestRow + smallestCol;
        if (cost.has(key)) {
            var smallestDist = cost.get(key);
            if (smallestPoint.distance <= smallestDist) {
                cost.set(key, smallestPoint.distance);
            }
            else {
                shouldAddNeighbours = false;
            }
        }
        else {
            cost.set(key, smallestPoint.distance);
        }
        if (shouldAddNeighbours) {
            directions.forEach(function (x) {
                var newRow = smallestRow + x[0];
                var newCol = smallestCol + x[1];
                if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
                    if (!visited.has("" + newRow + newCol)) {
                        var newKey = "" + newRow + newCol;
                        var hasEntry = cost.has(newKey);
                        if (!hasEntry || cost.get(newKey) > dist + grid[newRow][newCol]) {
                            unvisited.add({
                                row: newRow,
                                col: newCol,
                                distance: dist + grid[newRow][newCol]
                            });
                            cost.set(newKey, dist + grid[newRow][newCol]);
                        }
                    }
                }
            });
        }
    };
    while (unvisited.size !== 0) {
        _loop_1();
    }
}
exports.calculateMinDistance = calculateMinDistance;
var input;
input = Utils_1.loadFile("inputs/Day15.txt", "\n");
var grid = new Array(input.length);
for (var i_1 = 0; i_1 < input.length; i_1++) {
    grid[i_1] = [];
}
var gridPart2 = new Array(input.length * 5);
for (var i_2 = 0; i_2 < input.length * 5; i_2++) {
    gridPart2[i_2] = [];
}
var i = 0;
input.forEach(function (x) {
    x.split("").map(function (x) { return parseInt(x); }).forEach(function (y) { return grid[i].push(y); });
    i++;
});
var inpCols = input[0].length;
for (var i_3 = 0; i_3 < input.length; i_3++) {
    var str = input[i_3];
    // console.log("Str ", str);
    for (var j = 0; j < inpCols; j++) {
        var val = parseInt(str[j]);
        // console.log(val);
        for (var c = 0; c < 5; c++) {
            gridPart2[i_3][j + (c * inpCols)] = val;
            val = (val === 9) ? 1 : val + 1;
            // console.log(val);
        }
    }
}
for (var i_4 = input.length; i_4 < gridPart2.length; i_4++) {
    for (var j = 0; j < gridPart2[0].length; j++) {
        var prevVal = gridPart2[i_4 - input.length][j];
        gridPart2[i_4][j] = (prevVal === 9) ? 1 : prevVal + 1;
    }
}
calculateMinDistance(grid);
var part1 = cost.get("" + (grid.length - 1) + (grid[0].length - 1));
calculateMinDistance(gridPart2);
var part2 = cost.get("" + (gridPart2.length - 1) + (gridPart2[0].length - 1));
// console.log(grid);
// for (let i: number = 0; i < grid.length; i++) {
//     console.log([...grid[i]].join(""));
//     // if ((i + 1) % 10 === 0)
//     //     console.log();
// }
// unvisited.add({row: 0, col: 0, distance:0});
// while (unvisited.size !== 0) {
//     let smallestPoint: Point;
//     let dist: number = 100000;
//     for (let value of unvisited.values()) {
//         if (value.distance < dist) {
//             smallestPoint = value;
//             dist = value.distance;
//         }
//     }
//     unvisited.delete(smallestPoint);
//     const smallestRow: number = smallestPoint.row;
//     const smallestCol: number = smallestPoint.col;
//     visited.add("" + smallestRow + smallestCol);
//     let shouldAddNeighbours: boolean = true;
//     const key: string = "" + smallestRow + smallestCol;
//     if (cost.has(key)) {
//         const smallestDist: number = cost.get(key);
//         if (smallestPoint.distance <= smallestDist) {
//             cost.set(key, smallestPoint.distance);
//         }
//         else {
//             shouldAddNeighbours = false;
//         }
//     }
//     else {
//         cost.set(key, smallestPoint.distance);
//     }
//     if (shouldAddNeighbours) {
//         directions.forEach(x => {
//             const newRow: number = smallestRow + x[0];
//             const newCol: number = smallestCol + x[1];
//             if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
//                 if (!visited.has("" + newRow + newCol)) {
//                     const newKey: string = "" + newRow + newCol;
//                     const hasEntry: boolean = cost.has(newKey);
//                     if (!hasEntry || cost.get(newKey) > dist + grid[newRow][newCol]) {
//                         unvisited.add({
//                             row: newRow,
//                             col: newCol,
//                             distance: dist + grid[newRow][newCol]
//                         });
//                         cost.set(newKey, dist + grid[newRow][newCol]);
//                     }
//                 }
//             }
//         })
//     }
// }
// let part1: number = cost.get("" + (grid.length - 1) + (grid[0].length - 1));
// let part2: number = 0;
console.log("Part 1 ", part1);
console.log("Part 2 ", part2);
