// @pinf-bundle-ignore: 
sourcemint.bundle("", function(require) {
// @pinf-bundle-header: {"helper":"amd-ish"}
function defineish()
{
    // TODO
}
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/various/amd-commonjs.js","mtime":1366479052,"wrapper":"amd-ish","format":"amd-ish","id":"amd-commonjs.js"}
require.memoize("amd-commonjs.js", 
defineish(function(define) {
// @see http://addyosmani.com/writing-modular-js/
// exports object based version, if you need to make a
// circular dependency or need compatibility with
// commonjs-like environments that are not Node.
(function (define) {
    //The 'id' is optional, but recommended if this is
    //a popular web library that is used mostly in
    //non-AMD/Node environments. However, if want
    //to make an anonymous module, remove the 'id'
    //below, and remove the id use in the define shim.
    define('id', function (require, exports) {
        exports.STRING = "string-value";
        exports.OBJECT = {
            id: "object-value"
        };
    });
}(typeof define === 'function' && define.amd ? define : function (id, factory) {
    if (typeof exports !== 'undefined') {
        //commonjs
        factory(require, exports);
    } else {
        //Create a global function. Only works if
        //the code does not have dependencies, or
        //dependencies fit the call pattern below.
        factory(function(value) {
            return window[value];
        }, (window[id] = {}));
    }
}));
})
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}