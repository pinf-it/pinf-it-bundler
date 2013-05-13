// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-header: {"helper":"amd"}
function define(id, dependencies, moduleInitializer) {
    if (typeof dependencies === "undefined" && typeof moduleInitializer === "undefined") {
        if (typeof id === "function") {
            moduleInitializer = id;
        } else {
            var exports = id;
            moduleInitializer = function() { return exports; }
        }
        dependencies = [];
        id = null;
    } else
    if (Array.isArray(id) && typeof dependencies === "function" && typeof moduleInitializer === "undefined") {
        moduleInitializer = dependencies;
        dependencies = id;
        id = null;
    } else
    if (typeof id === "string" && typeof dependencies === "function" && typeof moduleInitializer === "undefined") {
        moduleInitializer = dependencies;
        dependencies = ["require", "exports", "module"];
    }
    return function(realRequire, exports, module) {
        function require(id) {
            if (Array.isArray(id)) {
                var loaded = id.length;
                var apis = [];
                id.forEach(function(id, index) {
console.log("INDEX", typeof index, index);
                    realRequire.async(id, function(api) {
                        apis[index] = api
   console.log("LENGTH", apis.length); 
                
                    }, function(err) {
                        throw err;
                    });
                });
            }
            return realRequire(id.replace(/^[^!]*!/, ""));
        }
        require.toUrl = function(id) {
            return realRequire.sandbox.id.replace(/\/[^\/]*$/, "") + realRequire.id(id);
        }
        if (typeof moduleInitializer === "function") {
            return moduleInitializer.apply(moduleInitializer, dependencies.map(function(name) {
                if (name === "require") return require;
                if (name === "exports") return exports;
                if (name === "module") return module;
                return require(name);
            }));
        } else
        if (typeof dependencies === "object") {
            return dependencies;
        }
    }
}
define.amd = true;
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/requirejs/nestedRelativeRequire-sub-a.js","mtime":1366563057,"wrapper":"amd","format":"amd","id":"/nestedRelativeRequire-sub-a.js"}
require.memoize("/nestedRelativeRequire-sub-a.js", 
// @see https://github.com/jrburke/requirejs/blob/master/tests/nestedRelativeRequire/sub/a.js
define(['require'],function(require) {
    require(['./b']);
})
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/main.js"}
require.memoize("/main.js", 
function(require, exports, module) {
  exports.main = function() {
    return require('./nestedRelativeRequire-sub-a');
  }
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}