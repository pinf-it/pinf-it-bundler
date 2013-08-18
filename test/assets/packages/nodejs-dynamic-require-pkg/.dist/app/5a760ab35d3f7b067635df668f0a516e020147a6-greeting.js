// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-dynamic-require-pkg/node_modules/greeting/index.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"5a760ab35d3f7b067635df668f0a516e020147a6-greeting/index.js"}
require.memoize("5a760ab35d3f7b067635df668f0a516e020147a6-greeting/index.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/nodejs-dynamic-require-pkg/node_modules/greeting';

exports.getGreeting = function() {
	return "Hello World";
}

}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"5a760ab35d3f7b067635df668f0a516e020147a6-greeting/package.json"}
require.memoize("5a760ab35d3f7b067635df668f0a516e020147a6-greeting/package.json", 
{
    "main": "5a760ab35d3f7b067635df668f0a516e020147a6-greeting/index.js"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}