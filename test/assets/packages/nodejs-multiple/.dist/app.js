// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/nodejs-multiple/app.js","mtime":1369184299,"wrapper":"commonjs/leaky","format":"leaky","id":"/app.js"}
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
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/nodejs-multiple/node_modules/greeting/greeting.js","mtime":1369184343,"wrapper":"commonjs","format":"commonjs","id":"866cd8b2fec4d849bcacad09b53e232728faa395-greeting/greeting.js"}
require.memoize("866cd8b2fec4d849bcacad09b53e232728faa395-greeting/greeting.js", 
function(require, exports, module) {

var HELLO = require("words/hello");

exports.getGreeting = function() {
	return HELLO.getWord() + " World";
}

}
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/nodejs-multiple/node_modules/words/hello.js","mtime":1369273442,"wrapper":"commonjs","format":"commonjs","id":"4735705177f627a8cf46a2f09e7aa9e3727972a1-words/hello.js"}
require.memoize("4735705177f627a8cf46a2f09e7aa9e3727972a1-words/hello.js", 
function(require, exports, module) {

var LETTERS = require("letters");

exports.getWord = function() {
	return "H" + LETTERS.getLetterE() + "ll" + LETTERS.getLetterO();
}

}
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/nodejs-multiple/node_modules/words/node_modules/letters/index.js","mtime":1369273376,"wrapper":"commonjs","format":"commonjs","id":"41c15c9e2f7c0fac66c70bc7128690859cf36a2f-letters/index.js"}
require.memoize("41c15c9e2f7c0fac66c70bc7128690859cf36a2f-letters/index.js", 
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
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/nodejs-multiple/node_modules/letter-e/e.js","mtime":1369273586,"wrapper":"commonjs","format":"commonjs","id":"350a489dc1c0bb1f2b3af10269ad29e51ab21eb9-letter-e/e.js"}
require.memoize("350a489dc1c0bb1f2b3af10269ad29e51ab21eb9-letter-e/e.js", 
function(require, exports, module) {

exports.getLetter = function() {
	return "e";
}

}
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/nodejs-multiple/node_modules/words/node_modules/o/index.js","mtime":1369273405,"wrapper":"commonjs/leaky","format":"leaky","id":"8287407c9afb17da1df3c24b21eb8b5f07d3c425-o/index.js"}
require.memoize("8287407c9afb17da1df3c24b21eb8b5f07d3c425-o/index.js", 
function(require, exports, module) {

module.exports = "o";

return {
    module: module
};
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{"main":"/app.js","mappings":{"greeting":"866cd8b2fec4d849bcacad09b53e232728faa395-greeting"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"866cd8b2fec4d849bcacad09b53e232728faa395-greeting/package.json"}
require.memoize("866cd8b2fec4d849bcacad09b53e232728faa395-greeting/package.json", 
{"main":"/greeting.js","mappings":{"words":"4735705177f627a8cf46a2f09e7aa9e3727972a1-words"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"4735705177f627a8cf46a2f09e7aa9e3727972a1-words/package.json"}
require.memoize("4735705177f627a8cf46a2f09e7aa9e3727972a1-words/package.json", 
{"mappings":{"letters":"41c15c9e2f7c0fac66c70bc7128690859cf36a2f-letters"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"41c15c9e2f7c0fac66c70bc7128690859cf36a2f-letters/package.json"}
require.memoize("41c15c9e2f7c0fac66c70bc7128690859cf36a2f-letters/package.json", 
{"main":"/index.js","mappings":{"letter-e":"350a489dc1c0bb1f2b3af10269ad29e51ab21eb9-letter-e","o":"8287407c9afb17da1df3c24b21eb8b5f07d3c425-o"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"8287407c9afb17da1df3c24b21eb8b5f07d3c425-o/package.json"}
require.memoize("8287407c9afb17da1df3c24b21eb8b5f07d3c425-o/package.json", 
{"main":"/index.js"}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}