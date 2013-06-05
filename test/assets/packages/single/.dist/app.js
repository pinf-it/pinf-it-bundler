// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/single/app.js","mtime":1369152002,"wrapper":"commonjs/leaky","format":"leaky","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {

function main() {
	console.log("Hello World");
}

if (require.main === module) {
	main();
}

return {
    console: console
};
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{"main":"/app.js"}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}