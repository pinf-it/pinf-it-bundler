// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-pkg/app.js","mtime":1371052244,"wrapper":"commonjs/leaky","format":"leaky","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {

function main() {

	var moduleId = "greeting";

	var GREETING = require(moduleId);

	console.log(GREETING.getGreeting());
}

if (require.main === module) {
	main();
}

return {
    require: require,
    console: console
};
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js",
    "mappings": {
        "greeting": "5a760ab35d3f7b067635df668f0a516e020147a6-greeting"
    }
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}