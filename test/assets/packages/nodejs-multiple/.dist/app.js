// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-multiple/app.js","mtime":1369184299,"wrapper":"commonjs/leaky","format":"leaky","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {

var GREETING = require("greeting");

function main() {
	console.log(GREETING.getGreeting());
}

if (require.main === module) {
	main();
}

return {
    GREETING: GREETING,
    require: require,
    console: console
};
}
);
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-multiple/node_modules/greeting/greeting.js","mtime":1369184343,"wrapper":"commonjs","format":"commonjs","id":"8d3bd8c321233c7ae6dd8e16ac592b1038e76049-greeting/greeting.js"}
require.memoize("8d3bd8c321233c7ae6dd8e16ac592b1038e76049-greeting/greeting.js", 
function(require, exports, module) {

var HELLO = require("words/hello");

exports.getGreeting = function() {
	return HELLO.getWord() + " World";
}

}
);
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-multiple/node_modules/words/hello.js","mtime":1369273442,"wrapper":"commonjs","format":"commonjs","id":"85b2fe6f2976fbb5995739b47d993956ad97c068-words/hello.js"}
require.memoize("85b2fe6f2976fbb5995739b47d993956ad97c068-words/hello.js", 
function(require, exports, module) {

var LETTERS = require("letters");

exports.getWord = function() {
	return "H" + LETTERS.getLetterE() + "ll" + LETTERS.getLetterO();
}

}
);
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-multiple/node_modules/words/node_modules/letters/index.js","mtime":1369273376,"wrapper":"commonjs","format":"commonjs","id":"bf2f7a7dd34e5e9fbce86c91388c656ba20be988-letters/index.js"}
require.memoize("bf2f7a7dd34e5e9fbce86c91388c656ba20be988-letters/index.js", 
function(require, exports, module) {

var LETTER_E = require("letter-e/e");
var LETTER_O = require("o");

exports.getLetterE = function() {
	return LETTER_E.getLetter();
}

exports.getLetterO = function() {
	return LETTER_O;
}

}
);
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-multiple/node_modules/letter-e/e.js","mtime":1369273586,"wrapper":"commonjs","format":"commonjs","id":"a711c52f40b12f2767cf31809da64b10f8bef1e1-letter-e/e.js"}
require.memoize("a711c52f40b12f2767cf31809da64b10f8bef1e1-letter-e/e.js", 
function(require, exports, module) {

exports.getLetter = function() {
	return "e";
}

}
);
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-multiple/node_modules/words/node_modules/o/index.js","mtime":1369273405,"wrapper":"commonjs/leaky","format":"leaky","id":"0d9a386644a6bc19a809e0eb36349e69e24c8501-o/index.js"}
require.memoize("0d9a386644a6bc19a809e0eb36349e69e24c8501-o/index.js", 
function(require, exports, module) {

module.exports = "o";

return {
    module: module
};
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{"main":"/app.js","mappings":{"greeting":"8d3bd8c321233c7ae6dd8e16ac592b1038e76049-greeting"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"8d3bd8c321233c7ae6dd8e16ac592b1038e76049-greeting/package.json"}
require.memoize("8d3bd8c321233c7ae6dd8e16ac592b1038e76049-greeting/package.json", 
{"main":"/greeting.js","mappings":{"words":"85b2fe6f2976fbb5995739b47d993956ad97c068-words"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"85b2fe6f2976fbb5995739b47d993956ad97c068-words/package.json"}
require.memoize("85b2fe6f2976fbb5995739b47d993956ad97c068-words/package.json", 
{"mappings":{"letters":"bf2f7a7dd34e5e9fbce86c91388c656ba20be988-letters"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"bf2f7a7dd34e5e9fbce86c91388c656ba20be988-letters/package.json"}
require.memoize("bf2f7a7dd34e5e9fbce86c91388c656ba20be988-letters/package.json", 
{"main":"/index.js","mappings":{"letter-e":"a711c52f40b12f2767cf31809da64b10f8bef1e1-letter-e","o":"0d9a386644a6bc19a809e0eb36349e69e24c8501-o"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"0d9a386644a6bc19a809e0eb36349e69e24c8501-o/package.json"}
require.memoize("0d9a386644a6bc19a809e0eb36349e69e24c8501-o/package.json", 
{"main":"/index.js"}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}