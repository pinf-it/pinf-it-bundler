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
    define.amd = { jQuery: true };
    var exports = null;
    function wrappedDefine() {
        exports = define.apply(null, arguments);
    }
    function amdRequire() {
        return amdRequireImplementation.apply(null, arguments);
    }
    wrappedDefine.amd = { jQuery: true };
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
define.amd = { jQuery: true };
// @pinf-bundle-module: {"file":"node_modules/pinf-it-module-insight/test/assets/umd/jqueryPluginCommonjs.js","mtime":1368549523,"wrapper":"amd-ish","format":"amd-ish","id":"/jqueryPluginCommonjs.js"}
require.memoize("/jqueryPluginCommonjs.js", 
wrapAMD(function(require, define) {
// @see https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
// Uses CommonJS, AMD or browser globals to create a jQuery plugin.

// Similar to jqueryPlugin.js but also tries to
// work in a CommonJS environment.
// It is unlikely jQuery will run in a CommonJS
// environment. See jqueryPlugin.js if you do
// not want to add the extra CommonJS detection.

(function (factory) {
    if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.jqueryPluginCommonJs = {};
    return $;
}));
})
);
// @pinf-bundle-module: {"file":"test/assets/modules/umd/mocks/jqueryPluginCommonjs.js/jquery.js","mtime":1368512922,"wrapper":"amd","format":"amd","id":"/jquery.js"}
require.memoize("/jquery.js", 
define([],function() {
	return {
		fn: {},
		STRING: "string-value",
        OBJECT: {
            id: "object-value"
        }
	};
})
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/jqueryPluginCommonjs.js"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}