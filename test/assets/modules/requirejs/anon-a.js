// @pinf-bundle-ignore: 
PINF.bundle("", function(require, _____bundle_global) {
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
                return realRequire(id);
            }
        }
        require.toUrl = function(id) {
            return realRequire.sandbox.id.replace(/\/[^\/]*$/, "") + realRequire.id(id);
        }
        require.sandbox = realRequire.sandbox;
        require.id = realRequire.id;
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
require.def = define;
// @pinf-bundle-module: {"file":"node_modules/pinf-it-module-insight/test/assets/requirejs/anon-a.js","mtime":0,"wrapper":"amd","format":"amd","variation":"","id":"/anon-a.js"}
require.memoize("/anon-a.js", 
// @see https://github.com/jrburke/requirejs/blob/master/tests/anon/a.js
define(['require','sub/b'],function (require) {
    var b =  require("sub/b");
    return {
        name: "a",
        bName: b.f()
    };
})
, {"filename":"node_modules/pinf-it-module-insight/test/assets/requirejs/anon-a.js","variation":""});
// @pinf-bundle-module: {"file":"test/assets/modules/requirejs/mocks/anon-a.js/sub+b.js","mtime":0,"wrapper":"amd","format":"amd","variation":"","id":"/sub/b.js"}
require.memoize("/sub/b.js", 
// @see https://raw.github.com/jrburke/requirejs/master/tests/anon/sub/b.js
define(['require','exports','module'],function(require, exports, module) {   
   exports.f = function () { return "sub/b" }; 
})
, {"filename":"test/assets/modules/requirejs/mocks/anon-a.js/sub+b.js","variation":""});
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/anon-a.js"
}
, {"filename":"node_modules/pinf-it-module-insight/test/assets/requirejs/anon-a.js"});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}