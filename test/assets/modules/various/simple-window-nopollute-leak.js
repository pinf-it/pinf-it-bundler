// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/various/simple-window-nopollute-leak.js","mtime":1368763412,"wrapper":"commonjs/leaky","format":"leaky","id":"/simple-window-nopollute-leak.js"}
require.memoize("/simple-window-nopollute-leak.js", 
function(require, exports, module) {
((function () {

	window.STRING = "string-value";

	window.OBJECT = {
		id: "object-value"
	};

})());
return {
    window: window
};
}
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/main.js"}
require.memoize("/main.js", 
function(require, exports, module) {
  exports.main = function() {
    return require('./simple-window-nopollute-leak');
  }
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}