// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/nodejs-dynamic-require-shared/app.js","mtime":1370114274,"wrapper":"commonjs","format":"commonjs","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {

function main() {

	var moduleId = "./greeting";

	var GREETING = require(moduleId);

	console.log(GREETING.getGreeting());
}

exports.getWorld = function() {
	return "World";	
}

if (require.main === module) {
	main();
}

}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{"main":"/app.js"}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}