// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-pkg/app.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/nodejs-dynamic-require-pkg';

function main() {

	var moduleId = "greeting";

	var GREETING = require(moduleId);

	console.log(GREETING.getGreeting());
}

if (require.main === module) {
	main();
}

return {
    require: (typeof require !== "undefined") ? require : null,
    console: (typeof console !== "undefined") ? console : null
};
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js",
    "dirpath": "test/assets/packages/nodejs-dynamic-require-pkg",
    "mappings": {
        "greeting": "5a760ab35d3f7b067635df668f0a516e020147a6-greeting"
    }
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}