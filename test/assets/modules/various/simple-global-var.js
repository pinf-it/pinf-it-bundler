// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/various/simple-global-var.js","mtime":1368763380,"wrapper":"commonjs/leaky","format":"leaky","id":"/simple-global-var.js"}
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
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/main.js"}
require.memoize("/main.js", 
function(require, exports, module) {
  exports.main = function() {
    return require('./simple-global-var');
  }
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}