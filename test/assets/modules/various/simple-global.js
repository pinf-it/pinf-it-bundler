// @pinf-bundle-ignore: 
sourcemint.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/various/simple-global.js","mtime":1366479052,"wrapper":"commonjs","format":null,"id":"simple-global.js"}
require.memoize("simple-global.js", 
function(require, exports, module) {

GLOBAL_STRING = "global-string-value";

GLOBAL_OBJECT = {
	id: "global-object-value"
};

}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}