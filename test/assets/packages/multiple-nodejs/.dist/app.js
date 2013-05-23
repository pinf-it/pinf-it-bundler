// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/multiple-nodejs/app.js","mtime":1369184299,"wrapper":"commonjs/leaky","format":"leaky","id":"/app.js"}
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
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/multiple-nodejs/node_modules/greeting/greeting.js","mtime":1369184343,"wrapper":"commonjs","format":"commonjs","id":"79d9d8027214aae8a320686d17cd9dbb01f77ef9-greeting/greeting.js"}
require.memoize("79d9d8027214aae8a320686d17cd9dbb01f77ef9-greeting/greeting.js", 
function(require, exports, module) {

var HELLO = require("words/hello");

exports.getGreeting = function() {
	return HELLO.getWord() + " World";
}

}
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/multiple-nodejs/node_modules/words/hello.js","mtime":1369273442,"wrapper":"commonjs","format":"commonjs","id":"eaf1cb00e0ca9ecb0b1907d6bdd94f90779c8aed-words/hello.js"}
require.memoize("eaf1cb00e0ca9ecb0b1907d6bdd94f90779c8aed-words/hello.js", 
function(require, exports, module) {

var LETTERS = require("letters");

exports.getWord = function() {
	return "H" + LETTERS.getLetterE() + "ll" + LETTERS.getLetterO();
}

}
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/multiple-nodejs/node_modules/words/node_modules/letters/index.js","mtime":1369273376,"wrapper":"commonjs","format":"commonjs","id":"c4770ab3c23a009e48ed9c7689c4eaeee0aad9d8-letters/index.js"}
require.memoize("c4770ab3c23a009e48ed9c7689c4eaeee0aad9d8-letters/index.js", 
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
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/multiple-nodejs/node_modules/letter-e/e.js","mtime":1369273586,"wrapper":"commonjs","format":"commonjs","id":"b83e181966b332d50941fbd8dbcc6def577c3d7a-letter-e/e.js"}
require.memoize("b83e181966b332d50941fbd8dbcc6def577c3d7a-letter-e/e.js", 
function(require, exports, module) {

exports.getLetter = function() {
	return "e";
}

}
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/multiple-nodejs/node_modules/words/node_modules/o/index.js","mtime":1369273405,"wrapper":"commonjs/leaky","format":"leaky","id":"d7d062c783deb314edc5356d20edfc5ce0845b1c-o/index.js"}
require.memoize("d7d062c783deb314edc5356d20edfc5ce0845b1c-o/index.js", 
function(require, exports, module) {

module.exports = "o";

return {
    module: module
};
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{"main":"/app.js","mappings":{"greeting":"79d9d8027214aae8a320686d17cd9dbb01f77ef9-greeting"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"79d9d8027214aae8a320686d17cd9dbb01f77ef9-greeting/package.json"}
require.memoize("79d9d8027214aae8a320686d17cd9dbb01f77ef9-greeting/package.json", 
{"main":"/greeting.js","mappings":{"words":"eaf1cb00e0ca9ecb0b1907d6bdd94f90779c8aed-words"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"eaf1cb00e0ca9ecb0b1907d6bdd94f90779c8aed-words/package.json"}
require.memoize("eaf1cb00e0ca9ecb0b1907d6bdd94f90779c8aed-words/package.json", 
{"mappings":{"letters":"c4770ab3c23a009e48ed9c7689c4eaeee0aad9d8-letters"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"c4770ab3c23a009e48ed9c7689c4eaeee0aad9d8-letters/package.json"}
require.memoize("c4770ab3c23a009e48ed9c7689c4eaeee0aad9d8-letters/package.json", 
{"main":"/index.js","mappings":{"letter-e":"b83e181966b332d50941fbd8dbcc6def577c3d7a-letter-e","o":"d7d062c783deb314edc5356d20edfc5ce0845b1c-o"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"d7d062c783deb314edc5356d20edfc5ce0845b1c-o/package.json"}
require.memoize("d7d062c783deb314edc5356d20edfc5ce0845b1c-o/package.json", 
{"main":"/index.js"}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}