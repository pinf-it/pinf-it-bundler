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
// @pinf-bundle-module: {"file":"node_modules/pinf-it-module-insight/test/assets/various/q-wrapper.js","mtime":1368549736,"wrapper":"amd-ish","format":"amd-ish","id":"/q-wrapper.js"}
require.memoize("/q-wrapper.js", 
wrapAMD(function(require, define) {
// @see https://github.com/kriskowal/q/blob/master/q.js
(function (definition) {
    // Turn off strict mode for this function so we can assign to global.Q
    /*jshint strict: false, -W117*/

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else {
        Q = definition();
    }

})(function () {
"use strict";

var nextTick;
if (typeof setImmediate === "function") {
    if (typeof window !== "undefined") {
        nextTick = setImmediate.bind(window);
    } else {
        nextTick = setImmediate;
    }
} else if (typeof process !== "undefined" && process.nextTick) {
    nextTick = process.nextTick;
} else {
    (function () {
        var requestTick = void 0;

        function onTick() {
        }

        nextTick = function (task) {
        };

        if (typeof MessageChannel !== "undefined") {
            var channel = new MessageChannel();

        } else {
            // old browsers
            requestTick = function () {
                setTimeout(onTick, 0);
            };
        }
    })();
}

var Q = {};

Q.STRING = "string-value";
Q.OBJECT = {
    id: "object-value"
};

return Q;

});
})
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/q-wrapper.js"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}