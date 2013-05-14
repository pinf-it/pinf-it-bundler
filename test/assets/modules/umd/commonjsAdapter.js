// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-header: {"helper":"amd-ish"}
var amdRequireImplementation = null;
function wrapAMD(callback) {
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
    define.amd = true;
    var exports = null;
    function wrappedDefine() {
        exports = define.apply(null, arguments);
    }
    function amdRequire() {
        return amdRequireImplementation.apply(null, arguments);
    }
    wrappedDefine.amd = true;
    callback(amdRequire, wrappedDefine);
    return exports;
}
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
define.amd = true;
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/umd/commonjsAdapter.js","mtime":1368512638,"wrapper":"amd-ish","format":"amd-ish","id":"/commonjsAdapter.js"}
require.memoize("/commonjsAdapter.js", 
wrapAMD(function(require, define) {
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
    exports.STRING = "string-value";
	exports.OBJECT = {
		id: "object-value"
	};
});

})
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/main.js"}
require.memoize("/main.js", 
function(require, exports, module) {
  exports.main = function() {
    return require('./commonjsAdapter');
  }
}
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/modules/umd/mocks/commonjsAdapter.js/b.js","mtime":1368512311,"wrapper":"amd","format":"amd","id":"/b.js"}
require.memoize("/b.js", 
define([],function() {
})
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}