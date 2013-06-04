// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/nodejs-dynamic-require-shared/greeting.js","mtime":1370114336,"wrapper":"commonjs","format":"commonjs","id":"/greeting.js"}
require.memoize("/greeting.js", 
function(require, exports, module) {

var APP = require("./app");

exports.getGreeting = function() {
	return "Hello " + APP.getWorld();
}

}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}