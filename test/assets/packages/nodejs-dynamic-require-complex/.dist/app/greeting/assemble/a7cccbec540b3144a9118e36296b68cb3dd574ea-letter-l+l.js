// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-complex/node_modules/letter-l/l.js","mtime":1369411690,"wrapper":"commonjs","format":"commonjs","id":"a7cccbec540b3144a9118e36296b68cb3dd574ea-letter-l/l.js"}
require.memoize("a7cccbec540b3144a9118e36296b68cb3dd574ea-letter-l/l.js", 
function(require, exports, module) {

exports.getLetter = function() {
	return "l";
}

}
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"json","format":"json","id":"a7cccbec540b3144a9118e36296b68cb3dd574ea-letter-l/package.json"}
require.memoize("a7cccbec540b3144a9118e36296b68cb3dd574ea-letter-l/package.json", 
{
    "main": "a7cccbec540b3144a9118e36296b68cb3dd574ea-letter-l/l.js"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}