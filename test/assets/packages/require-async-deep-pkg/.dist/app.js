// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/require-async-deep-pkg/app.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/require-async-deep-pkg';

exports.main = function (callback) {
	require.async("./extra", function(EXTRA) {
		return EXTRA.run(callback);
	}, callback);
	return null;
}

}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js",
    "dirpath": "test/assets/packages/require-async-deep-pkg"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}