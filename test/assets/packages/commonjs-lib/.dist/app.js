// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/commonjs-lib/app.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {

var GREETING = require("greeting/greeting");

function main() {
	console.log(GREETING.getGreeting());
}

if (require.main === module) {
	main();
}

return {
    GREETING: (typeof GREETING !== "undefined") ? GREETING : null,
    require: (typeof require !== "undefined") ? require : null,
    console: (typeof console !== "undefined") ? console : null
};
}
);
// @pinf-bundle-module: {"file":"test/assets/packages/commonjs-lib/node_modules/greeting/lib-dir/greeting.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"aba74007c1f9fd6ec9506effc13a53b236bc9e52-greeting/lib-dir/greeting.js"}
require.memoize("aba74007c1f9fd6ec9506effc13a53b236bc9e52-greeting/lib-dir/greeting.js", 
function(require, exports, module) {

exports.getGreeting = function() {
	return "Hello World";
}

}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js",
    "mappings": {
        "greeting": "aba74007c1f9fd6ec9506effc13a53b236bc9e52-greeting"
    }
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"aba74007c1f9fd6ec9506effc13a53b236bc9e52-greeting/package.json"}
require.memoize("aba74007c1f9fd6ec9506effc13a53b236bc9e52-greeting/package.json", 
{
    "directories": {
        "lib": "lib-dir"
    }
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}