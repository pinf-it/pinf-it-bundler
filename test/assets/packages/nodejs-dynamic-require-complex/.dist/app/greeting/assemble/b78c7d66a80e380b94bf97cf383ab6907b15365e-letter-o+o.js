// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-complex/node_modules/letter-o/o.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"b78c7d66a80e380b94bf97cf383ab6907b15365e-letter-o/o.js"}
require.memoize("b78c7d66a80e380b94bf97cf383ab6907b15365e-letter-o/o.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/nodejs-dynamic-require-complex/node_modules/letter-o';

exports.getLetter = function() {
	return "o";
}

}
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"json","format":"json","id":"b78c7d66a80e380b94bf97cf383ab6907b15365e-letter-o/package.json"}
require.memoize("b78c7d66a80e380b94bf97cf383ab6907b15365e-letter-o/package.json", 
{
    "main": "b78c7d66a80e380b94bf97cf383ab6907b15365e-letter-o/o.js"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}