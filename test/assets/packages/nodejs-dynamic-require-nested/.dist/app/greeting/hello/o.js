// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-nested/o.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/o.js"}
require.memoize("/o.js", 
function(require, exports, module) {

exports.getLetter = function() {
	return "o";
}

}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}