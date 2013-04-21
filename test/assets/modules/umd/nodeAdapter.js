// @pinf-bundle-ignore: 
sourcemint.bundle("", function(require) {
// @pinf-bundle-header: {"helper":"amd-ish"}
function defineish()
{
    // TODO
}
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/umd/nodeAdapter.js","mtime":1366479052,"wrapper":"amd-ish","format":"amd-ish","id":"nodeAdapter.js"}
require.memoize("nodeAdapter.js", 
defineish(function(define) {
// @see https://github.com/umdjs/umd/blob/master/nodeAdapter.js
// Defines a module that works in Node and AMD.

// This version can be used as common boilerplate for a library module
// that you only want to expose to Node and AMD loaders. It will not work
// well for defining browser globals.

// If you need a version of this file that works CommonJS-like environments
// that do not support module.exports or if you want to define a module
// with a circular dependency, see commonjsAdapter.js

// Help Node out by setting up define.
if (typeof module === 'object' && typeof define !== 'function') {
    var define = function (factory) {
        module.exports = factory(require, exports, module);
    };
}

define(function (require, exports, module) {
    var b = require('b');

    return function () {};
});

})
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}