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
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/various/forge2.js","mtime":1368294283,"wrapper":"amd-ish","format":"amd-ish","id":"/forge2.js"}
require.memoize("/forge2.js", 
wrapAMD(function(require, define) {
// @see https://github.com/digitalbazaar/forge/blob/master/js/task.js
(function() {
/* ########## Begin module implementation ########## */
function initModule(forge) {


forge.task = forge.util;


} // end module implementation

/* ########## Begin module wrapper ########## */
var name = 'task';
var deps = ['./util'];
var nodeDefine = null;
if(typeof define !== 'function') {
  // NodeJS -> AMD
  if(typeof module === 'object' && module.exports) {
    nodeDefine = function(ids, factory) {
      factory(require, module);
    };
  }
  // <script>
  else {
    forge = window.forge = window.forge || {};
    initModule(forge);
  }
}
// AMD
if(nodeDefine || typeof define === 'function') {
  // define module AMD style
  (nodeDefine || define)(['require', 'module'].concat(deps),
  function(require, module) {
    module.exports = function(forge) {
      var mods = deps.map(function(dep) {
        return require(dep);
      }).concat(initModule);
      // handle circular dependencies
      forge = forge || {};
      forge.defined = forge.defined || {};
      if(forge.defined[name]) {
        return forge[name];
      }
      forge.defined[name] = true;
      for(var i = 0; i < mods.length; ++i) {
        mods[i](forge);
      }
      return forge[name];
    };
  });
}
})();

})
);
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/test/assets/modules/various/mocks/forge2.js/util.js","mtime":1368294293,"wrapper":"amd-ish","format":"amd-ish","id":"/util.js"}
require.memoize("/util.js", 
wrapAMD(function(require, define) {
(function() {
/* ########## Begin module implementation ########## */
function initModule(forge) {


forge.util = {
  STRING: "string-value",
  OBJECT: {
    id: "object-value"
  }
};


} // end module implementation

/* ########## Begin module wrapper ########## */
var name = 'util';
var deps = [];
var nodeDefine = null;
if(typeof define !== 'function') {
  // NodeJS -> AMD
  if(typeof module === 'object' && module.exports) {
    nodeDefine = function(ids, factory) {
      factory(require, module);
    };
  }
  // <script>
  else {
    if(typeof forge === 'undefined') {
      forge = {};
    }
    initModule(forge);
  }
}
// AMD
if(nodeDefine || typeof define === 'function') {
  // define module AMD style
  (nodeDefine || define)(['require', 'module'].concat(deps),
  function(require, module) {
    module.exports = function(forge) {
      var mods = deps.map(function(dep) {
        return require(dep);
      }).concat(initModule);
      // handle circular dependencies
      forge = forge || {};
      forge.defined = forge.defined || {};
      if(forge.defined[name]) {
        return forge[name];
      }
      forge.defined[name] = true;
      for(var i = 0; i < mods.length; ++i) {
        mods[i](forge);
      }
      return forge[name];
    };
  });
}
})();
})
);
// @pinf-bundle-module: {"file":"","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/main.js"}
require.memoize("/main.js", 
function(require, exports, module) {
  exports.main = function() {
    return require('./forge2');
  }
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}