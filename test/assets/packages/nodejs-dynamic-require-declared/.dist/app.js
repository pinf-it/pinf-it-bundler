// @pinf-bundle-ignore: 
PINF.bundle("", function(require, _____bundle_global) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-declared/app.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + 'test/assets/packages/nodejs-dynamic-require-declared';

function main() {

	var moduleId = "./greeting";

	try {
		var GREETING = require(moduleId);

		console.log(GREETING.getGreeting());
	} catch(err) {
		throw new Error("Sould not have thrown!");
	}
}

if (require.main === module) {
	main();
}

return {
    require: (typeof require !== "undefined") ? require : null,
    console: (typeof console !== "undefined") ? console : null
};
}
, {"filename":"test/assets/packages/nodejs-dynamic-require-declared/app.js","variation":""});
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