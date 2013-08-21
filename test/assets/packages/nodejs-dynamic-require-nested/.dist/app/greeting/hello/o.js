// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-nested/o.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/o.js"}
require.memoize("/o.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/nodejs-dynamic-require-nested';

exports.getLetter = function() {
	return "o";
}

}
, {"filename":"test/assets/packages/nodejs-dynamic-require-nested/o.js"});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}