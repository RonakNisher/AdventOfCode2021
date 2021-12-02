"use strict";
exports.__esModule = true;
exports.loadFile = void 0;
var fs = require("fs");
function loadFile(filename, separator) {
    var content = fs.readFileSync(filename).toString();
    return separator ? content.split(separator) : [content];
}
exports.loadFile = loadFile;
