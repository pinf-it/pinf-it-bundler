// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-nested-declared/o.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/o.js"}
require.memoize("/o.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/nodejs-dynamic-require-nested-declared';

exports.getLetter = function() {
	return "o";
}

}
, {"filename":"test/assets/packages/nodejs-dynamic-require-nested-declared/o.js"});
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