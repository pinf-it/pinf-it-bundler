// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-complex/greeting.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/greeting.js"}
require.memoize("/greeting.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/nodejs-dynamic-require-complex';

exports.getGreeting = function() {

	var moduleId = "./assemble";

	return require(moduleId).assemble();
}

}
, {"filename":"test/assets/packages/nodejs-dynamic-require-complex/greeting.js"});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}