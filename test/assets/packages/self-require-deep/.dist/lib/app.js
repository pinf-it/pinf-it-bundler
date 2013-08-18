// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/self-require-deep/lib/app.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/lib/app.js"}
require.memoize("/lib/app.js", 
function(require, exports, module) {

const APP = require("..");

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
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/lib/app.js",
    "mappings": {}
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}