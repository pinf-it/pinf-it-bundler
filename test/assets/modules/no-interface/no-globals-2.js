// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/no-interface/no-globals-2.js","mtime":1366479052,"wrapper":"commonjs","format":null,"id":"/no-globals-2.js"}
require.memoize("/no-globals-2.js", 
function(require, exports, module) {

(function() {

	var exports = {};

	(function() {

		exports.STRING = "string-value";

		exports.OBJECT = {
			id: "object-value"
		};

	})();

})();

}
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/main.js"}
require.memoize("/main.js", 
function(require, exports, module) {
  exports.main = function() {
    return require('./no-globals-2');
  }
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}