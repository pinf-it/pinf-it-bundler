// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"node_modules/pinf-it-module-insight/test/assets/various/require-main.js","mtime":1369154206,"wrapper":"commonjs/leaky","format":"leaky","id":"/require-main.js"}
require.memoize("/require-main.js", 
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
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/require-main.js"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}