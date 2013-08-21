// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/deep-main/lib/app.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","id":"/lib/app.js"}
require.memoize("/lib/app.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/deep-main/lib';

function main() {
	console.log("Hello World");
}

if (require.main === module) {
	main();
}

return {
    console: (typeof console !== "undefined") ? console : null
};
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/lib/app.js",
    "dirpath": "test/assets/packages/deep-main"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}