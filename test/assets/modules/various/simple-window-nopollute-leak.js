// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"node_modules/pinf-it-module-insight/test/assets/various/simple-window-nopollute-leak.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","id":"/simple-window-nopollute-leak.js"}
require.memoize("/simple-window-nopollute-leak.js", 
function(require, exports, module) {
((function () {

	window.STRING = "string-value";

	window.OBJECT = {
		id: "object-value"
	};

})());
return {
    window: (typeof window !== "undefined") ? window : null
};
}
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/simple-window-nopollute-leak.js"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}