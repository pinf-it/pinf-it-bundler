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
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/requirejs/anon-magenta.js","mtime":1366559327,"wrapper":"amd","format":"amd","id":"/anon-magenta.js"}
require.memoize("/anon-magenta.js", 
// @see https://github.com/jrburke/requirejs/blob/master/tests/anon/magenta.js
define(['require','exports','module','red','./blue','text!./message.txt'],function (require, exports, module) {
    //This is a fakeout require("fake1");

    var red = require("red"),
        blue = require('./blue'),
        message = require('text!./message.txt');

    /*
     And another fakeoute require("fake2");
    */

    //Use ugly exports
    exports.name = red.name + blue.name;
    exports.path = require.toUrl('./foo.html');
    exports.message = message;
})
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/main.js"}
require.memoize("/main.js", 
function(require, exports, module) {
  exports.main = function() {
    return require('./anon-magenta');
  }
}
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/modules/requirejs/mocks/anon-magenta.js/red.js","mtime":1368341466,"wrapper":"amd","format":"amd","id":"/red.js"}
require.memoize("/red.js", 
// @see https://github.com/jrburke/requirejs/blob/master/tests/anon/red.js
define("red",[], function () {
    return {
        name: "red"
    };
})
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/modules/requirejs/mocks/anon-magenta.js/blue.js","mtime":1368341486,"wrapper":"amd","format":"amd","id":"/blue.js"}
require.memoize("/blue.js", 
// @see https://github.com/jrburke/requirejs/blob/master/tests/anon/blue.js
define([],function () {
    return {
        name: "blue"
    };
})
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/modules/requirejs/mocks/anon-magenta.js/message.txt","mtime":1368341433,"wrapper":"utf8","format":"utf8","id":"/message.txt"}
require.memoize("/message.txt", 
'hello%20world'
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}