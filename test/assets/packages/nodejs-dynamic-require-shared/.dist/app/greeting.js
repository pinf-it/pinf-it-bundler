// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-shared/greeting.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/greeting.js"}
require.memoize("/greeting.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/nodejs-dynamic-require-shared';

var APP = require("./app");

exports.getGreeting = function() {
	return "Hello " + APP.getWorld();
}

}
, {"filename":"test/assets/packages/nodejs-dynamic-require-shared/greeting.js"});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}