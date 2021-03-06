// @pinf-bundle-loader-top: {"bundleUrlPrefix":"/bundles/"}
var require, sourcemint;
(function() {
    var rootBundleLoader = function(uri, loadedCallback) {
// @pinf-bundle-ignore: 
PINF.bundle("", function(require, _____bundle_global) {
// @pinf-bundle-module: {"file":"/example/main.js","fileMtime":1331407689000,"id":"/main.js"}
require.memoize("/main.js", 
function(require, exports, module)
{
    var __filename = require.sandbox.id + "/main.js";
    var __dirname = require.sandbox.id + "";
    
    exports.main = function()
    {
        console.log("Hello from Example!");
        
        require.async("./sub-module", function(SUB_MODULE)
        {
            SUB_MODULE.main();
            
            require.sandbox("../sub-package.js", function(sandbox)
            {
                sandbox.main();
            });
        });
    
        // TODO: Get this working in tests. Could work with http://www.phantomjs.org/ ?
        if (typeof Worker === "undefined") return;
    
        var worker = new Worker("/bundles/worker-package.js");
        
        worker.onerror = function()
        {
            console.error.apply(null, arguments);
        }
    
        worker.onmessage = function(msg)
        {
            if (msg.data.type === "log") {
                console.log(msg.data.data);
            }
        }
    }
}
, {});
// @pinf-bundle-descriptor: {"file":"/example/package.json","id":"/package.json"}
require.memoize("/package.json", 
{"main":"/main.js","mappings":{},"directories":{"lib":""}}
, {});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-loader-bottom: 
        if (typeof loadedCallback === "function") loadedCallback();
    }
    function initLoader(exports) {
/**
 * Author: Christoph Dorn <christoph@christophdorn.com>
 * [UNLICENSE](http://unlicense.org/)
 */

// NOTE: Remove lines marked /*DEBUG*/ when compiling loader for 'min' release!

// Combat pollution when used via <script> tag.
// Don't touch any globals except for `exports` and `PINF`.
(function (global, document) {

	// If `PINF` gloabl already exists, don't do anything to change it.
	if (typeof PINF !== "undefined") {
		return;
	}

	var loadedBundles = [],
		// @see https://github.com/unscriptable/curl/blob/62caf808a8fd358ec782693399670be6806f1845/src/curl.js#L69
		readyStates = { 'loaded': 1, 'interactive': 1, 'complete': 1 };

	// A set of modules working together.
	var Sandbox = function(sandboxIdentifier, loadedCallback, sandboxOptions) {

		var moduleInitializers = {},
			initializedModules = {},
			/*DEBUG*/ bundleIdentifiers = {},
			packages = {},
			headTag,
			loadingBundles = {};

		var sandbox = {
				id: sandboxIdentifier
			};

		/*DEBUG*/ function logDebug() {
		/*DEBUG*/ 	if (sandboxOptions.debug !== true) return;
		/*DEBUG*/ 	// NOTRE: This does not work in google chrome.
		/*DEBUG*/ 	//console.log.apply(null, arguments);
		/*DEBUG*/ 	if (arguments.length === 1) {
		/*DEBUG*/ 		console.log(arguments[0]);
		/*DEBUG*/ 	} else
		/*DEBUG*/ 	if (arguments.length === 2) {
		/*DEBUG*/ 		console.log(arguments[0], arguments[1]);
		/*DEBUG*/ 	} else
		/*DEBUG*/ 	if (arguments.length === 3) {
		/*DEBUG*/ 		console.log(arguments[0], arguments[1], arguments[2]);
		/*DEBUG*/ 	} else
		/*DEBUG*/ 	if (arguments.length === 4) {
		/*DEBUG*/ 		console.log(arguments[0], arguments[1], arguments[2], arguments[3]);
		/*DEBUG*/ 	}
		/*DEBUG*/ }

		// @credit https://github.com/unscriptable/curl/blob/62caf808a8fd358ec782693399670be6806f1845/src/curl.js#L319-360
		function loadInBrowser(uri, loadedCallback) {
			/*DEBUG*/ logDebug("[sm-loader]", 'loadInBrowser("' + uri + '")"');
		    // See if we are in a web worker.
		    if (typeof importScripts !== "undefined") {
		        importScripts(uri.replace(/^\/?\{host\}/, ""));
		        loadedCallback();
		        return;
		    }
            if (/^\/?\{host\}\//.test(uri)) {
                uri = document.location.protocol + "//" + document.location.host + uri.replace(/^\/?\{host\}/, "");
            } else
            if (/^\//.test(uri)) {
                uri = document.location.protocol + "/" + uri;
            }
			if (!headTag) {
				headTag = document.getElementsByTagName("head")[0];
			}
			var element = document.createElement("script");
			element.type = "text/javascript";
			element.onload = element.onreadystatechange = function(ev) {
				ev = ev || global.event;
				if (ev.type === "load" || readyStates[this.readyState]) {
					this.onload = this.onreadystatechange = this.onerror = null;
					loadedCallback(function() {
						element.parentNode.removeChild(element);
					});
				}
			}
			element.onerror = function(e) {
				/*DEBUG*/ throw new Error("Syntax error or http error: " + uri);
			}
			element.charset = "utf-8";
			element.async = true;
			element.src = uri;
			element = headTag.insertBefore(element, headTag.firstChild);
		}

		function load(bundleIdentifier, packageIdentifier, loadedCallback) {
            if (packageIdentifier !== "") {
                bundleIdentifier = ("/" + packageIdentifier + "/" + bundleIdentifier).replace(/\/+/g, "/");
            }
			if (initializedModules[bundleIdentifier]) {
				// Module is already loaded and initialized.
				loadedCallback(sandbox);
			} else {
				// Module is not initialized.
				if (loadingBundles[bundleIdentifier]) {
					// Module is already loading.
					loadingBundles[bundleIdentifier].push(loadedCallback);
				} else {
					// Module is not already loading.
					loadingBundles[bundleIdentifier] = [];
					bundleIdentifier = sandboxIdentifier + bundleIdentifier;
					// Default to our script-injection browser loader.
					(sandboxOptions.rootBundleLoader || sandboxOptions.load || loadInBrowser)(bundleIdentifier, function(cleanupCallback) {
					    // The rootBundleLoader is only applicable for the first load.
                        delete sandboxOptions.rootBundleLoader;
						finalizeLoad(bundleIdentifier, packageIdentifier);
						loadedCallback(sandbox);
						if (cleanupCallback) {
							cleanupCallback();
						}
					});
				}
			}
		}

		// Called after a bundle has been loaded. Takes the top bundle off the *loading* stack
		// and makes the new modules available to the sandbox.
		// If a `packageIdentifier` is supplied we prefix it to all module identifiers anchored
		// at the root of the bundle (starting with `/`).
		function finalizeLoad(bundleIdentifier, packageIdentifier)
		{
			// Assume a consistent statically linked set of modules has been memoized.
			/*DEBUG*/ bundleIdentifiers[bundleIdentifier] = loadedBundles[0][0];
			var key;
			for (key in loadedBundles[0][1]) {
				// Only add modules that don't already exist!
				// TODO: Log warning in debug mode if module already exists.
				if (typeof moduleInitializers[key] === "undefined") {
					moduleInitializers[packageIdentifier + key] = loadedBundles[0][1][key];
				}
			}
			loadedBundles.shift();
		}

		var Package = function(packageIdentifier) {
			if (packages[packageIdentifier]) {
				return packages[packageIdentifier];
			}
			
			var descriptor = moduleInitializers[packageIdentifier + "/package.json"] || {
					main: "/main.js"
				},
				mappings = descriptor.mappings || {},
				directories = descriptor.directories || {},
				libPath = (typeof directories.lib !== "undefined" && directories.lib != "")?directories.lib + "/":"";
			
			var pkg = {
				id: packageIdentifier,
				main: descriptor.main
			};

			var Module = function(moduleIdentifier) {

				var moduleIdentifierSegment = moduleIdentifier.replace(/\/[^\/]*$/, "").split("/"),
					module = {
						id: moduleIdentifier,
						exports: {}
					};

				function normalizeIdentifier(identifier) {
				    // If we have a period (".") in the basename we want an absolute path from
				    // the root of the package. Otherwise a relative path to the "lib" directory.
				    if (identifier.split("/").pop().indexOf(".") === -1) {
				        // We have a module relative to the "lib" directory of the package.
				        identifier = identifier + ".js";
				    } else
				    if (!/^\//.test(identifier)) {
				        // We want an absolute path for the module from the root of the package.
				        identifier = "/" + identifier;
				    }
                    return identifier;
				}
				
				function resolveIdentifier(identifier) {
					// Check for relative module path to module within same package.
					if (/^\./.test(identifier)) {
						var segments = identifier.replace(/^\.\//, "").split("../");
						identifier = "/" + moduleIdentifierSegment.slice(1, moduleIdentifierSegment.length-segments.length+1).concat(segments[segments.length-1]).join("/");
						return [pkg, normalizeIdentifier(identifier)];
					} else
					// Check for mapped module path to module within mapped package.
					{
						identifier = identifier.split("/");
						/*DEBUG*/ if (typeof mappings === "undefined") {
						/*DEBUG*/ 	throw new Error("Descriptor for sandbox '" + sandbox.id + "' does not declare 'mappings' property needed to resolve module path '" + identifier.join("/") + "' in module '" + moduleIdentifier + "'!");
						/*DEBUG*/ }
						/*DEBUG*/ if (typeof mappings[identifier[0]] === "undefined") {
						/*DEBUG*/ 	throw new Error("Descriptor for sandbox '" + sandbox.id + "' does not declare 'mappings[\"" + identifier[0] + "\"]' property needed to resolve module path '" + identifier.join("/") + "' in module '" + moduleIdentifier + "'!");
						/*DEBUG*/ }
						return [Package(mappings[identifier[0]]), normalizeIdentifier(identifier.slice(1).join("/"))];
					}
				}
				
				// Statically link a module and its dependencies
				module.require = function(identifier) {
				    // HACK: RequireJS compatibility.
				    // TODO: Move this to a plugin.
				    if (typeof identifier !== "string") {
				        /*DEBUG*/ if (identifier.length > 1) {
			            /*DEBUG*/     throw new Error("Dynamic 'require([])' may only specify one module in module '" + moduleIdentifier + "'!");
				        /*DEBUG*/ }
				        return module.require.async.call(null, identifier[0], arguments[1]);
				    }
					identifier = resolveIdentifier(identifier);
					return identifier[0].require(identifier[1]).exports;
				};

				module.require.supports = [
		            "ucjs2-pinf-0"
		        ];

				module.require.id = function(identifier) {
					identifier = resolveIdentifier(identifier);
					return identifier[0].require.id(identifier[1]);
				};

				module.require.async = function(identifier, loadedCallback) {
					identifier = resolveIdentifier(identifier);
					identifier[0].load(identifier[1], loadedCallback);
				};

				module.require.sandbox = function() {
					if (arguments.length === 3)
					{
						arguments[2].load = arguments[2].load || sandboxOptions.load;
					}
	                // If the `programIdentifier` (first argument) is relative it is resolved against the URI of the owning sandbox (not the owning page).
					if (/^\./.test(arguments[0]))
					{
					    arguments[0] = sandboxIdentifier + "/" + arguments[0];
					    // HACK: Temporary hack as zombie (https://github.com/assaf/zombie) does not normalize path before sending to server.
					    arguments[0] = arguments[0].replace(/\/\.\//g, "/");
					}
					return PINF.sandbox.apply(null, arguments);
				}
				module.require.sandbox.id = sandboxIdentifier;

                // HACK: RequireJS compatibility.
                // TODO: Move this to a plugin.
                module.require.nameToUrl = function(identifier)
                {
                    return sandboxIdentifier + module.require.id(identifier);
                }

				module.load = function() {
					if (typeof moduleInitializers[moduleIdentifier] === "function") {
						
						var moduleInterface = {
							id: module.id,
							exports: undefined
						}

						// If embedded in bundle `isMain` will be set to `true` if bundle was `require.main`.
				        if (packageIdentifier === "" && pkg.main === moduleIdentifier && sandboxOptions.isMain === true) {
				        	module.require.main = moduleInterface;
				        }

						if (sandboxOptions.onInitModule) {
							sandboxOptions.onInitModule(moduleInterface, module, pkg, sandbox);
						}

						var exports = moduleInitializers[moduleIdentifier](module.require, module.exports, moduleInterface);
						if (typeof moduleInterface.exports !== "undefined") {
							module.exports = moduleInterface.exports;
						} else
						if (typeof exports !== "undefined") {
							module.exports = exports;
						}
					} else
					if (typeof moduleInitializers[moduleIdentifier] === "string") {
						// TODO: Use more optimal string encoding algorythm to reduce payload size?
						module.exports = decodeURIComponent(moduleInitializers[moduleIdentifier]);
					} else {
						module.exports = moduleInitializers[moduleIdentifier];
					}
				};

				/*DEBUG*/ module.getReport = function() {
				/*DEBUG*/ 	var exportsCount = 0,
				/*DEBUG*/ 		key;
				/*DEBUG*/ 	for (key in module.exports) {
				/*DEBUG*/ 		exportsCount++;
				/*DEBUG*/ 	}
				/*DEBUG*/ 	return {
				/*DEBUG*/ 		exports: exportsCount
				/*DEBUG*/ 	};
				/*DEBUG*/ };

				return module;
			};

			pkg.load = function(moduleIdentifier, loadedCallback) {
                load(((!/^\//.test(moduleIdentifier))?"/"+libPath:"") + moduleIdentifier, packageIdentifier, function() {
                    loadedCallback(pkg.require(moduleIdentifier).exports);                           
                });
			}

			pkg.require = function(moduleIdentifier) {
				var loadingBundlesCallbacks;
                if (!/^\//.test(moduleIdentifier)) {
                    moduleIdentifier = "/" + libPath + moduleIdentifier;
                }
				moduleIdentifier = packageIdentifier + moduleIdentifier;
				if (!initializedModules[moduleIdentifier]) {
					/*DEBUG*/ if (!moduleInitializers[moduleIdentifier]) {
					/*DEBUG*/ 	throw new Error("Module '" + moduleIdentifier + "' not found in sandbox '" + sandbox.id + "'!");
					/*DEBUG*/ }
					(initializedModules[moduleIdentifier] = Module(moduleIdentifier)).load();
				}
				if (loadingBundles[moduleIdentifier]) {
					loadingBundlesCallbacks = loadingBundles[moduleIdentifier];
					delete loadingBundles[moduleIdentifier];
					for (var i=0 ; i<loadingBundlesCallbacks.length ; i++) {
						loadingBundlesCallbacks[i](sandbox);
					}
				}
				return initializedModules[moduleIdentifier];
			}

            pkg.require.id = function(moduleIdentifier) {
                if (!/^\//.test(moduleIdentifier)) {
                    moduleIdentifier = "/" + libPath + moduleIdentifier;
                }
                return (((packageIdentifier !== "")?"/"+packageIdentifier+"/":"") + moduleIdentifier).replace(/\/+/g, "/");
            }

			/*DEBUG*/ pkg.getReport = function() {
			/*DEBUG*/ 	return {
			/*DEBUG*/ 		mappings: mappings
			/*DEBUG*/ 	};
			/*DEBUG*/ }

			if (sandboxOptions.onInitPackage) {
				sandboxOptions.onInitPackage(pkg, sandbox, {
					finalizeLoad: finalizeLoad,
					moduleInitializers: moduleInitializers
				});
			}

			packages[packageIdentifier] = pkg;

			return pkg;
		}

		// Get a module and initialize it (statically link its dependencies) if it is not already so
		sandbox.require = function(moduleIdentifier) {
			return Package("").require(moduleIdentifier);
		}

		// Call the 'main' module of the program
		sandbox.boot = function() {
			/*DEBUG*/ if (typeof Package("").main !== "string") {
			/*DEBUG*/ 	throw new Error("No 'main' property declared in '/package.json' in sandbox '" + sandbox.id + "'!");
			/*DEBUG*/ }
			return sandbox.require(Package("").main).exports;
		};

		// Call the 'main' exported function of the main' module of the program
		sandbox.main = function() {
			var exports = sandbox.boot();
			return ((exports.main)?exports.main.apply(null, arguments):undefined);
		};

		/*DEBUG*/ sandbox.getReport = function() {
		/*DEBUG*/ 	var report = {
		/*DEBUG*/ 			bundles: {},
		/*DEBUG*/ 			packages: {},
		/*DEBUG*/ 			modules: {}
		/*DEBUG*/ 		},
		/*DEBUG*/ 		key;
		/*DEBUG*/ 	for (key in bundleIdentifiers) {
		/*DEBUG*/ 		report.bundles[key] = bundleIdentifiers[key];
		/*DEBUG*/ 	}
		/*DEBUG*/ 	for (key in packages) {
		/*DEBUG*/ 		report.packages[key] = packages[key].getReport();
		/*DEBUG*/ 	}
		/*DEBUG*/ 	for (key in moduleInitializers) {
		/*DEBUG*/ 		if (initializedModules[key]) {
		/*DEBUG*/ 			report.modules[key] = initializedModules[key].getReport();
		/*DEBUG*/ 		}
		/*DEBUG*/ 	}
		/*DEBUG*/ 	return report;
		/*DEBUG*/ }

		load(".js", "", loadedCallback);

		return sandbox;
	};


	// The global `require` for the 'external' (to the loader) environment.
	var Loader = function() {

		var 
			/*DEBUG*/ bundleIdentifiers = {},
			sandboxes = {};

		var Require = function(bundle) {

				// Address a specific sandbox or currently loading sandbox if initial load.
				this.bundle = function(uid, callback) {
					/*DEBUG*/ if (uid && bundleIdentifiers[uid]) {
					/*DEBUG*/ 	throw new Error("You cannot split require.bundle(UID) calls where UID is constant!");
					/*DEBUG*/ }
					/*DEBUG*/ bundleIdentifiers[uid] = true;
					var moduleInitializers = {},
						req = new Require(uid);
					delete req.bundle;
					// Store raw module in loading bundle
					req.memoize = function(moduleIdentifier, moduleInitializer) {
						moduleInitializers[moduleIdentifier] = moduleInitializer;
					}
					callback(req);
					loadedBundles.push([uid, moduleInitializers]);
				}
			};

		var require = new Require();

		// TODO: @see URL_TO_SPEC
		require.supports = [
			"ucjs2-pinf-0"
		];

		// Create a new environment to memoize modules to.
		// If relative, the `programIdentifier` is resolved against the URI of the owning page (this is only for the global require).
		require.sandbox = function(programIdentifier, loadedCallback, options) {
			var sandboxIdentifier = programIdentifier.replace(/\.js$/, "");
			return sandboxes[sandboxIdentifier] = Sandbox(sandboxIdentifier, loadedCallback, options || {});
		}
		
		/*DEBUG*/ require.getReport = function() {
		/*DEBUG*/ 	var report = {
		/*DEBUG*/ 			sandboxes: {}
		/*DEBUG*/ 		},
		/*DEBUG*/ 		key;
		/*DEBUG*/ 	for (key in sandboxes) {
		/*DEBUG*/ 		report.sandboxes[key] = sandboxes[key].getReport();
		/*DEBUG*/ 	}
		/*DEBUG*/ 	return report;
		/*DEBUG*/ }

		return require;
	}

	// Set `PINF` gloabl.
	PINF = Loader();

	// Export `require` for CommonJS if `exports` global exists.
	if (typeof exports === "object") {
		exports.require = PINF;
	}

}(this, (typeof document !== "undefined")?document:null));

    };
    if (typeof sourcemint === "undefined") {
        var exports = {};
        initLoader(exports);
        sourcemint = exports.require;
        if (!require) require = sourcemint;
        sourcemint.sandbox("/{host}/bundles/with-loader.saved.js", function(sandbox) {
            sandbox.main();
        }, {
            rootBundleLoader: rootBundleLoader
        });
    } else {
        rootBundleLoader();
    }
})();
// @pinf-bundle-report: {"sourceReport":{"mainPackage":"/example","packages":{"/example":{"mainModule":{"path":"/example/main.js"},"modules":{"/example/main.js":{"staticLinks":{},"dynamicLinks":{"\"./sub-module\"":"\"./sub-module\""},"fileMtime":1331407689000,"treatAs":"js-module"}},"mappings":{}}}},"mappedReport":{"mainPackage":"/example","packages":{"/example":{"mainModule":{"path":"/example/main.js"},"modules":{"/example/main.js":{"staticLinks":{},"dynamicLinks":{"\"./sub-module\"":"\"./sub-module\""},"fileMtime":1331407689000,"treatAs":"js-module"}},"mappings":{}}}},"bundleReport":{"mainBundle":"/dist/example.js","packages":{},"modules":{"/main.js":"/example/main.js"}}}