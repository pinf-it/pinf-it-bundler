// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"node_modules/pinf-it-module-insight/test/assets/various/simple-global-var.js","mtime":1368763380,"wrapper":"commonjs/leaky","format":"leaky","id":"/simple-global-var.js"}
require.memoize("/simple-global-var.js", 
function(require, exports, module) {

var STRING = "string-value";

var OBJECT = {
	id: "object-value"
};

return {
    STRING: STRING,
    OBJECT: OBJECT
};
}
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/simple-global-var.js"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}