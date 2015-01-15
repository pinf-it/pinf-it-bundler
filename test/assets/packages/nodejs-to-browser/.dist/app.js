// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-to-browser/app.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + 'test/assets/packages/nodejs-to-browser';

var OS = require("__SYSTEM__/os");

function main() {
	if (OS.type() === "Browser") {
		console.log("Hello World");
	} else {
		throw new Error("FAIL");
	}
}

if (require.main === module) {
	main();
}

return {
    OS: (typeof OS !== "undefined") ? OS : null,
    require: (typeof require !== "undefined") ? require : null,
    console: (typeof console !== "undefined") ? console : null
};
}
, {"filename":"test/assets/packages/nodejs-to-browser/app.js"});
// @pinf-bundle-module: {"file":"/playground/2014-12-26-promise-actor/pinf-it-bundler/node_modules/browser-builtins/node_modules/os-browserify/browser.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/__SYSTEM__/os.js"}
require.memoize("/__SYSTEM__/os.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + 'playground/2014-12-26-promise-actor/pinf-it-bundler/node_modules/browser-builtins/node_modules/os-browserify';
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

}
, {"filename":"/playground/2014-12-26-promise-actor/pinf-it-bundler/node_modules/browser-builtins/node_modules/os-browserify/browser.js"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js",
    "dirpath": "test/assets/packages/nodejs-to-browser"
}
, {"filename":"test/assets/packages/nodejs-to-browser/package.json"});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}