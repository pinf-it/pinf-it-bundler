// @sourcemint-bundle-ignore: 
require.bundle("", function(require)
{
// @sourcemint-bundle-header: {}
function define(id, dependencies, moduleInitializer)
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
// @sourcemint-bundle-module: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules/main.js","fileMtime":1329952704000,"id":"/main.js"}
require.memoize("/main.js", 
define('',["./greeting"], function(GREETING)
{
	return {
	    main: function()
        {
    		console.log(GREETING.getGreeting());
        }
	};
})
);
// @sourcemint-bundle-module: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules/greeting.js","fileMtime":1329955170000,"id":"/greeting.js"}
require.memoize("/greeting.js", 
define('',['require','exports','module'],function(require, exports, module)
{
	exports.getGreeting = function()
    {
	    return "Hello from 01-RequireJSModulesToBrowser!";
    }
})
);
// @sourcemint-bundle-descriptor: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules/package.json","id":"/package.json"}
require.memoize("/package.json", 
{"main":"/main.js","directories":{"lib":""},"mappings":{}}
);
// @sourcemint-bundle-ignore: 
});
// @sourcemint-bundle-report: {"sourceReport":{"mainPackage":"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules","packages":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules":{"mainModule":{"path":"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules/main.js"},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules/main.js":{"staticLinks":{"./greeting":"./greeting"},"fileMtime":1329952704000,"treatAs":"js-module"},"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules/greeting.js":{"staticLinks":{},"fileMtime":1329955170000,"treatAs":"js-module"}},"mappings":{}}}},"mappedReport":{"mainPackage":"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules","packages":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules":{"mainModule":{"path":"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules/main.js"},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules/main.js":{"staticLinks":{"./greeting":"./greeting"},"fileMtime":1329952704000,"treatAs":"js-module"},"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules/greeting.js":{"staticLinks":{},"fileMtime":1329955170000,"treatAs":"js-module"}},"mappings":{}}}},"bundleReport":{"mainBundle":"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/dist/modules.js","packages":{},"modules":{"/main.js":"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules/main.js","/greeting.js":"/pinf/workspaces/github.com/sourcemint/examples-js/0/01-RequireJSModulesToBrowser/modules/greeting.js"}}}
