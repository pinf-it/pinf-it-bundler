// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-nested/hello.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/hello.js"}
require.memoize("/hello.js", 
function(require, exports, module) {

var APP = require("./app");

exports.getWord = function() {

	var moduleId = "./greeting";

	var GREETING = require(moduleId);

	return APP.getLetterH() + "e" + GREETING.getLetterL() + "l" + require(("./" + "o")).getLetter();
}

}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}