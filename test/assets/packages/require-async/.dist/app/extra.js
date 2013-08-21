// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/require-async/extra.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/extra.js"}
require.memoize("/extra.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/require-async';

exports.getGreeting = function() {
	return "Hello World";
}

}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js",
    "dirpath": "test/assets/packages/require-async"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}