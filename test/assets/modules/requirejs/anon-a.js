// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-header: {"helper":"amd"}
function define(dependencies, moduleInitializer)
{
    return function(require, exports, module) {
        if (typeof moduleInitializer === "function") {
            return moduleInitializer.apply(moduleInitializer, dependencies.map(function(name) {
                if (name === "require") return require;
                if (name === "exports") return exports;
                if (name === "module") return module;
                return require(name);
            }))
        } else
        if (typeof dependencies === "object") {
            return dependencies;
        }
    }
}
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/requirejs/anon-a.js","mtime":1366559177,"wrapper":"amd","format":"amd","id":"anon-a.js"}
require.memoize("anon-a.js", 
// @see https://github.com/jrburke/requirejs/blob/master/tests/anon/a.js
define(['require','sub/b'],function (require) {
    var b =  require("sub/b");
    return {
        name: "a",
        bName: b.f()
    };
})
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/modules/requirejs/mocks/anon-a.js/sub+b.js","mtime":1367685668,"wrapper":"amd","format":"amd","id":"sub/b.js"}
require.memoize("sub/b.js", 
// @see https://raw.github.com/jrburke/requirejs/master/tests/anon/sub/b.js
define(['require','exports','module'],function(require, exports, module) {   
   exports.f = function () { return "sub/b" }; 
})
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/main.js"}
require.memoize("/main.js", 
function(require, exports, module) {
  exports.main = function() {
    return require('anon-a');
  }
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}