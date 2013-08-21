// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-nested/greeting.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/greeting.js"}
require.memoize("/greeting.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/nodejs-dynamic-require-nested';

var APP = require("./app");

exports.getGreeting = function() {

	var moduleId = "./hello";

	var HELLO = require(moduleId);

	return HELLO.getWord() + " " + APP.getWorld();
}

exports.getLetterL = function() {
	return "l";	
}

}
, {"filename":"test/assets/packages/nodejs-dynamic-require-nested/greeting.js"});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}