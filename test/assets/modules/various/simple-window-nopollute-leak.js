// @pinf-bundle-ignore: 
sourcemint.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/various/simple-window-nopollute-leak.js","mtime":1366479052,"wrapper":"commonjs","format":null,"id":"simple-window-nopollute-leak.js"}
require.memoize("simple-window-nopollute-leak.js", 
function(require, exports, module) {
((function () {

	window.GLOBAL_STRING = "global-string-value";

	window.GLOBAL_OBJECT = {
		id: "global-object-value"
	};

})());
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}