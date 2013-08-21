// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/self-require/app.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/self-require';

const APP = require(".");

function main() {
	console.log(APP.getGreeting());
}

exports.getGreeting = function() {
	return "Hello World";
}

if (require.main === module) {
	main();
}

}
, {"filename":"test/assets/packages/self-require/app.js"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js",
    "mappings": {},
    "dirpath": "test/assets/packages/self-require"
}
, {"filename":"test/assets/packages/self-require/package.json"});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}