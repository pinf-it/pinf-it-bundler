// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-complex/greeting.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/greeting.js"}
require.memoize("/greeting.js", 
function(require, exports, module) {

exports.getGreeting = function() {

	var moduleId = "./assemble";

	return require(moduleId).assemble();
}

}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}