// @pinf-bundle-ignore: 
sourcemint.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/umd/commonjsAdapter.js","mtime":1366479052,"wrapper":"commonjs","format":"commonjs","id":"commonjsAdapter.js"}
require.memoize("commonjsAdapter.js", 
function(require, exports, module) {
// @see https://github.com/umdjs/umd/blob/master/commonjsAdapter.js
// Defines a module that works in CommonJS and AMD.

// This version can be used as common boilerplate for a library module
// that you only want to expose to CommonJS and AMD loaders. It will not work
// well for defining browser globals.

// If you only want to target Node and AMD or a CommonJS environment that
// supports assignment to module.exports and you are not defining a module
// that has a circular dependency, see nodeAdapter.js

// Help Node out by setting up define.
if (typeof exports === 'object' && typeof define !== 'function') {
    define = function (factory) {
        factory(require, exports, module);
    };
}

define(function (require, exports, module) {
    var b = require('b');

    // Only attach properties to the exports object to define
    // the module's properties.
    exports.action = function () {};
});

}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}