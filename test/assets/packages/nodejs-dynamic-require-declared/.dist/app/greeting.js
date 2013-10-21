// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-declared/greeting.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/greeting.js"}
require.memoize("/greeting.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + 'test/assets/packages/nodejs-dynamic-require-declared';

exports.getGreeting = function() {
	return "Hello World";
}

}
, {"filename":"test/assets/packages/nodejs-dynamic-require-declared/greeting.js"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js",
    "dirpath": "test/assets/packages/nodejs-dynamic-require-declared"
}
, {"filename":"test/assets/packages/nodejs-dynamic-require-declared/package.json"});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}