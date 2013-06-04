// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/commonjs-lib/app.js","mtime":1369322451,"wrapper":"commonjs/leaky","format":"leaky","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {

var GREETING = require("greeting/greeting");

function main() {
	console.log(GREETING.getGreeting());
}

if (require.main === module) {
	main();
}

return {
    GREETING: GREETING,
    require: require,
    console: console
};
}
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/packages/commonjs-lib/node_modules/greeting/lib-dir/greeting.js","mtime":1369322859,"wrapper":"commonjs","format":"commonjs","id":"616e128aa1ea154fbb6145a6d9928e02063132b9-greeting/lib-dir/greeting.js"}
require.memoize("616e128aa1ea154fbb6145a6d9928e02063132b9-greeting/lib-dir/greeting.js", 
function(require, exports, module) {

exports.getGreeting = function() {
	return "Hello World";
}

}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{"main":"/app.js","mappings":{"greeting":"616e128aa1ea154fbb6145a6d9928e02063132b9-greeting"}}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"616e128aa1ea154fbb6145a6d9928e02063132b9-greeting/package.json"}
require.memoize("616e128aa1ea154fbb6145a6d9928e02063132b9-greeting/package.json", 
{"directories":{"lib":"lib-dir"}}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}