// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-built-in/app.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {

const ASSERT = require("__SYSTEM__/assert");
const PATH = require("__SYSTEM__/path");

function main() {

	ASSERT(typeof PATH, "object");

	console.log("Hello World");
}

if (require.main === module) {
	main();
}

return {
    ASSERT: ASSERT,
    require: require,
    PATH: PATH,
    console: console
};
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}