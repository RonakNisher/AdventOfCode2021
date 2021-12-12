import {loadFile} from "./Utils";

interface node {
    name: string;
    connections: string[];
};

let validRoutes: string[] = [];

export function getValidRoutes(routes: Map<string, node>, currentNodeName: string, visitedNodes: string[]) {
    const currentNode: node = routes.get(currentNodeName);
    
    if (currentNodeName === "end") {
        visitedNodes.push("end");
        validRoutes.push(visitedNodes.join(","));
    }
    
    currentNode.connections.forEach(x => {
        if (x === x.toLowerCase() && visitedNodes.includes(x)) {
            // Cannot add an entry for this
        }
        else {
            const newVisited: string[] = [...visitedNodes];
            newVisited.push(currentNodeName);
            getValidRoutes(routes, x, newVisited);
        }
    });
}

export function getValidRoutesPart2(routes: Map<string, node>, currentNodeName: string, visitedNodes: string[], specialNode: string) {
    const currentNode: node = routes.get(currentNodeName);

    if (currentNodeName === "end") {
        visitedNodes.push("end");
        validRoutes.push(visitedNodes.join(","));
        return;
    }

    currentNode.connections.forEach(x => {
        if (x === x.toLowerCase() && visitedNodes.includes(x)) {
            // Cannot add an entry for this
            
            if (specialNode === "" && x !== "start") {
                const newVisited: string[] = [...visitedNodes];
                newVisited.push(currentNodeName);
                getValidRoutesPart2(routes, x, newVisited, x);
            }
        }
        else {
            const newVisited: string[] = [...visitedNodes];
            newVisited.push(currentNodeName);
            getValidRoutesPart2(routes, x, newVisited, specialNode);
        }
    });
}

let routes: Map<string, node> = new Map<string, node>();
// let startNode: node;

let input: string[];
input = loadFile("inputs/Day12.txt", "\n");


input.forEach (x => {
    const edge: string[] = x.split("-");
    let [start, end] = x.split("-");
    
    if (!routes.has(start))
    routes.set(start, { name: start, connections: [end]});
    else {
        let existingNode: node = routes.get(start);
        existingNode.connections.push(end);
        routes.set(start, existingNode);
    }
    
    if (!routes.has(end))
    routes.set(end, { name: end, connections: [start] });
    else {
        let existingNode: node = routes.get(end);
        existingNode.connections.push(start);
        routes.set(end, existingNode);
    }
});

getValidRoutes(routes, "start", []);

let part1: number = validRoutes.length;

validRoutes = [];

getValidRoutesPart2(routes, "start", [], "");

let part2: number = validRoutes.length;

console.log("Part 1 ", part1);
console.log("Part 2 ", part2);

