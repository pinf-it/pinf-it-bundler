// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/various/simple-global.js","mtime":1368763347,"wrapper":"commonjs/leaky","format":"leaky","id":"/simple-global.js"}
require.memoize("/simple-global.js", 
function(require, exports, module) {

STRING = "string-value";

OBJECT = {
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
    "main": "/simple-global.js"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}