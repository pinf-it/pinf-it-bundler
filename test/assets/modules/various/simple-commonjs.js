// @pinf-bundle-ignore: 
sourcemint.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/various/simple-commonjs.js","mtime":1366479052,"wrapper":"commonjs","format":"commonjs","id":"simple-commonjs.js"}
require.memoize("simple-commonjs.js", 
function(require, exports, module) {

exports.STRING = "string-value";

exports.OBJECT = {
	id: "object-value"
};

}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}