// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"node_modules/pinf-it-module-insight/test/assets/various/simple-window.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","id":"/simple-window.js"}
require.memoize("/simple-window.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + 'node_modules/pinf-it-module-insight/test/assets/various';

window.STRING = "string-value";

window.OBJECT = {
	id: "object-value"
};

return {
    window: (typeof window !== "undefined") ? window : null
};
}
, {"filename":"node_modules/pinf-it-module-insight/test/assets/various/simple-window.js"});
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/simple-window.js"
}
, {"filename":"node_modules/pinf-it-module-insight/test/assets/various/simple-window.js"});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}