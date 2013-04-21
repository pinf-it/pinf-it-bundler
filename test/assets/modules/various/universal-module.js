// @pinf-bundle-ignore: 
sourcemint.bundle("", function(require) {
// @pinf-bundle-header: {"helper":"amd-ish"}
function defineish()
{
    // TODO
}
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/various/universal-module.js","mtime":1366479052,"wrapper":"amd-ish","format":"amd-ish","id":"universal-module.js"}
require.memoize("universal-module.js", 
defineish(function(define) {
// @see https://gist.github.com/kitcambridge/1251221
(function (root, Library) {
  // The square bracket notation is used to avoid property munging by the Closure Compiler.
  if (typeof define == "function" && typeof define["amd"] == "object" && define["amd"]) {
    // Export for asynchronous module loaders (e.g., RequireJS, `curl.js`).
    define(["exports"], Library);
  } else {
    // Export for CommonJS environments, web browsers, and JavaScript engines.
    Library = Library(typeof exports == "object" && exports || (root["Library"] = {
      "noConflict": (function (original) {
        function noConflict() {
          root["Library"] = original;
          // `noConflict` can't be invoked more than once.
          delete Library.noConflict;
          return Library;
        }
        return noConflict;
      })(root["Library"])
    }));
  }
})(this, function (exports) {
  exports.STRING = "string-value";
  exports.OBJECT = {
      id: "object-value"
  };
  return exports;
});
})
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}