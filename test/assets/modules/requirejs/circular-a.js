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
        dependencies = ["require", "exports", "module"];
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
                var apis = [];
                var callback = arguments[1];
                id.forEach(function(moduleId, index) {
                    realRequire.async(moduleId, function(api) {
                        apis[index] = api
                        if (apis.length === id.length) {
                            if (callback) callback.apply(null, apis);
                        }
                    }, function(err) {
                        throw err;
                    });
                });
            } else {
                return realRequire(id.replace(/^[^!]*!/, ""));
            }
        }
        require.toUrl = function(id) {
            return realRequire.sandbox.id.replace(/\/[^\/]*$/, "") + realRequire.id(id);
        }
        if (typeof amdRequireImplementation !== "undefined") {
            amdRequireImplementation = require;
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
define.amd = { jQuery: true };
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/requirejs/circular-a.js","mtime":1366559449,"wrapper":"amd","format":"amd","id":"/circular-a.js"}
require.memoize("/circular-a.js", 
// @see https://github.com/jrburke/requirejs/blob/master/tests/circular/a.js
define(['b', 'exports'], function (b, exports) {
    exports.name = 'a';
    exports.b = b;
})
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/main.js"}
require.memoize("/main.js", 
function(require, exports, module) {
  exports.main = function() {
    return require('./circular-a');
  }
}
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/modules/requirejs/mocks/circular-a.js/b.js","mtime":1368386694,"wrapper":"amd","format":"amd","id":"/b.js"}
require.memoize("/b.js", 
// @see https://github.com/jrburke/requirejs/blob/master/tests/circular/b.js
define(['c', 'exports'], function (c, exports) {
    exports.name = 'b';
    exports.c = c;
})
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/modules/requirejs/mocks/circular-a.js/c.js","mtime":1368387913,"wrapper":"amd","format":"amd","id":"/c.js"}
require.memoize("/c.js", 
// @see https://github.com/jrburke/requirejs/blob/master/tests/circular/c.js
define(['circular-a', 'exports'], function (a, exports) {
    exports.name = 'c';
    exports.a = a;
})
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}