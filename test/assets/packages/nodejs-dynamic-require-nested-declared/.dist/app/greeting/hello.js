// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-nested-declared/hello.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/hello.js"}
require.memoize("/hello.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + 'test/assets/packages/nodejs-dynamic-require-nested-declared';

var APP = require("./app");

exports.getWord = function() {

	var moduleId = "./greeting";

	var GREETING = require(moduleId);

	return APP.getLetterH() + "e" + GREETING.getLetterL() + "l" + require(("./" + "o")).getLetter();
}

}
, {"filename":"test/assets/packages/nodejs-dynamic-require-nested-declared/hello.js"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js",
    "dirpath": "test/assets/packages/nodejs-dynamic-require-nested-declared"
}
, {"filename":"test/assets/packages/nodejs-dynamic-require-nested-declared/package.json"});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}