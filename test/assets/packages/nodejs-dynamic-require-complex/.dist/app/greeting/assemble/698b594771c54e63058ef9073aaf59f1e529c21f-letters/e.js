// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-complex/node_modules/letters/e.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"698b594771c54e63058ef9073aaf59f1e529c21f-letters/e.js"}
require.memoize("698b594771c54e63058ef9073aaf59f1e529c21f-letters/e.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/nodejs-dynamic-require-complex/node_modules/letters';

var moduleId = "./more";

var MORE = require(moduleId);

exports.getLetter = function() {
	return "e";
}

exports.getLetterL = MORE.getLetterL;

exports.getLetterO = MORE.getLetterO;

}
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"json","format":"json","id":"698b594771c54e63058ef9073aaf59f1e529c21f-letters/package.json"}
require.memoize("698b594771c54e63058ef9073aaf59f1e529c21f-letters/package.json", 
{
    "main": "698b594771c54e63058ef9073aaf59f1e529c21f-letters/e.js",
    "mappings": {}
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}