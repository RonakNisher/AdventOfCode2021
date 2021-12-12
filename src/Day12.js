"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.getValidRoutesPart2 = exports.getValidRoutes = void 0;
var Utils_1 = require("./Utils");
;
var validRoutes = [];
function getValidRoutes(routes, currentNodeName, visitedNodes) {
    var currentNode = routes.get(currentNodeName);
    if (currentNodeName === "end") {
        visitedNodes.push("end");
        validRoutes.push(visitedNodes.join(","));
    }
    currentNode.connections.forEach(function (x) {
        if (x === x.toLowerCase() && visitedNodes.includes(x)) {
            // Cannot add an entry for this
        }
        else {
            var newVisited = __spreadArrays(visitedNodes);
            newVisited.push(currentNodeName);
            getValidRoutes(routes, x, newVisited);
        }
    });
}
exports.getValidRoutes = getValidRoutes;
function getValidRoutesPart2(routes, currentNodeName, visitedNodes, specialNode) {
    var currentNode = routes.get(currentNodeName);
    if (currentNodeName === "end") {
        visitedNodes.push("end");
        validRoutes.push(visitedNodes.join(","));
        return;
    }
    currentNode.connections.forEach(function (x) {
        if (x === x.toLowerCase() && visitedNodes.includes(x)) {
            // Cannot add an entry for this
            if (specialNode === "" && x !== "start") {
                var newVisited = __spreadArrays(visitedNodes);
                newVisited.push(currentNodeName);
                getValidRoutesPart2(routes, x, newVisited, x);
            }
        }
        else {
            var newVisited = __spreadArrays(visitedNodes);
            newVisited.push(currentNodeName);
            getValidRoutesPart2(routes, x, newVisited, specialNode);
        }
    });
}
exports.getValidRoutesPart2 = getValidRoutesPart2;
var routes = new Map();
// let startNode: node;
var input;
input = Utils_1.loadFile("inputs/Day12.txt", "\n");
input.forEach(function (x) {
    var edge = x.split("-");
    var _a = x.split("-"), start = _a[0], end = _a[1];
    if (!routes.has(start))
        routes.set(start, { name: start, connections: [end] });
    else {
        var existingNode = routes.get(start);
        existingNode.connections.push(end);
        routes.set(start, existingNode);
    }
    if (!routes.has(end))
        routes.set(end, { name: end, connections: [start] });
    else {
        var existingNode = routes.get(end);
        existingNode.connections.push(start);
        routes.set(end, existingNode);
    }
});
getValidRoutes(routes, "start", []);
var part1 = validRoutes.length;
validRoutes = [];
getValidRoutesPart2(routes, "start", [], "");
var part2 = validRoutes.length;
console.log("Part 1 ", part1);
console.log("Part 2 ", part2);
