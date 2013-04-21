// @pinf-bundle-ignore: 
sourcemint.bundle("", function(require) {
// @pinf-bundle-header: {"helper":"amd-ish"}
function defineish()
{
    // TODO
}
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/umd/jqueryPlugin.js","mtime":1366479052,"wrapper":"amd-ish","format":"amd-ish","id":"jqueryPlugin.js"}
require.memoize("jqueryPlugin.js", 
defineish(function(define) {
// @see https://github.com/umdjs/umd/blob/master/jqueryPlugin.js
// Uses AMD or browser globals to create a jQuery plugin.

// It does not try to register in a CommonJS environment since
// jQuery is not likely to run in those environments.
// See jqueryPluginCommonJs.js for that version.

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.jqueryPlugin = function () {};
}));

})
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}