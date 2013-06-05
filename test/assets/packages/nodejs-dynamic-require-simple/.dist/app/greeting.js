// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-simple/greeting.js","mtime":1370117747,"wrapper":"commonjs","format":"commonjs","id":"/greeting.js"}
require.memoize("/greeting.js", 
function(require, exports, module) {

exports.getGreeting = function() {
	return "Hello World";
}

}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}