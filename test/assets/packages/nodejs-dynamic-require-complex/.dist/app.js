// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-complex/app.js","mtime":1369325029,"wrapper":"commonjs/leaky","format":"leaky","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {

function main() {

	var moduleId = "./greeting";

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
        "letters": "698b594771c54e63058ef9073aaf59f1e529c21f-letters",
        "letter-l": "a7cccbec540b3144a9118e36296b68cb3dd574ea-letter-l",
        "letter-o": "b78c7d66a80e380b94bf97cf383ab6907b15365e-letter-o"
    }
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}