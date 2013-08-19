
const ASSERT = require("assert");
const PATH = require("path");
const FS = require("fs-extra");
const Q = require("q");
const BUNDLER = require("./bundler");


exports.bundlePackage = function(bundlePackagePath, bundleOptions, callback) {

	ASSERT.equal(typeof bundleOptions, "object");
	ASSERT.equal(typeof bundleOptions.distPath, "string");
	ASSERT.equal(typeof bundleOptions.onRun, "function");

	var bundleDescriptors = {};

	function bundleDescriptorForId(bundleId) {
		for (var id in bundleDescriptors) {
			if (id === bundleId) {
				if (bundleDescriptors[id].bundles) {
					return bundleDescriptors[id].bundles[bundleDescriptors[id].exports.main];
				} else {
					return bundleDescriptors[id];
				}
			}
			for (var subid in bundleDescriptors[id].bundles) {
				if ((bundleOptions.distPath + subid) === bundleId) {
					return bundleDescriptors[id].bundles[subid];
				}
			}
		}
		return null;
	}

	function getExistingModules(moduleObj) {

		var loaderReport = bundleOptions.getLoaderReport();

		ASSERT.equal(typeof loaderReport.sandboxes, "object");

		function getSandbox() {
			ASSERT.equal(typeof moduleObj.bundle, "string");

			for (var sandboxId in loaderReport.sandboxes) {

				ASSERT.equal(typeof loaderReport.sandboxes[sandboxId].bundles, "object");

				if (typeof loaderReport.sandboxes[sandboxId].bundles[moduleObj.bundle] === "undefined") continue;

				return loaderReport.sandboxes[sandboxId];
			}

			return false;
		}

		var sandbox = getSandbox();

		var modules = {};

		function forModule(moduleObj) {

			var bundleDescriptor = bundleDescriptorForId(moduleObj.bundle);

			if (bundleDescriptor) {
				for (var memoizeId in sandbox.modules) {
					if (!modules[memoizeId] && bundleDescriptor.modules[memoizeId]) {
						modules[memoizeId] = bundleDescriptor.modules[memoizeId];
						modules[memoizeId]._getBundleDescriptor = function() {
							return bundleDescriptor;
						}
					}
				}
			}

			if (moduleObj.parentModule) return forModule(moduleObj.parentModule);
		}

		forModule(moduleObj);

		return modules;
	}

	function getBundleBasePath(moduleObj) {

		ASSERT.equal(typeof moduleObj.bundle, "string");

		return moduleObj.bundle.replace(/\.js$/, "");
	}

	// `aliasid` id a mappings alias (if mappings info not memoized) or a
	// resolved package ID (if mappings info already memoized).
	function getMappingInfo(moduleObj, aliasid) {

		var loaderReport = bundleOptions.getLoaderReport();

		ASSERT.equal(typeof loaderReport.sandboxes, "object");

		var info = null;
		var packageDescriptorPaths = [];

		function forModule(moduleObj) {

			ASSERT.equal(typeof moduleObj.bundle, "string");

			for (var sandboxId in loaderReport.sandboxes) {

				ASSERT.equal(typeof loaderReport.sandboxes[sandboxId].bundles, "object");

				if (typeof loaderReport.sandboxes[sandboxId].bundles[moduleObj.bundle] === "undefined") continue;

				var sandbox = loaderReport.sandboxes[sandboxId];

				// See if `aliasid` is an alias for a package or resolved packge ID already.
				if (sandbox.modules[moduleObj.pkg + "/package.json"] && sandbox.modules[moduleObj.pkg + "/package.json"].mappings) {
					for (var alias in sandbox.modules["/package.json"].mappings) {
						if (sandbox.modules[moduleObj.pkg + "/package.json"].mappings[alias] === aliasid) {
							info = {
								alias: alias,
								pkg: aliasid,
								memoized: true
							};
							break;
						} else
						if (alias === aliasid) {
							info = {
								alias: aliasid,
								pkg: sandbox.modules[moduleObj.pkg + "/package.json"].mappings[alias],
								memoized: true
							};
							break;
						}
					}					
				}

				var packageDescriptor = null;
				var bundleDescriptor = null;
				var existingModules = getExistingModules(moduleObj);

				if (existingModules[moduleObj.pkg + "/package.json"]) {
					packageDescriptor = existingModules[moduleObj.pkg + "/package.json"].descriptor;
					bundleDescriptor = existingModules[moduleObj.pkg + "/package.json"]._getBundleDescriptor();
				} else {
					bundleDescriptor = bundleDescriptorForId(moduleObj.bundle);
					packageDescriptor = bundleDescriptor.modules[moduleObj.pkg + "/package.json"].descriptor
				}

				packageDescriptorPaths.push(PATH.join(bundleOptions.rootPath || "", packageDescriptor.dirpath));

				// If mapping was not found we look for it in the bundle info.
				if (!info) {
					for (var alias in packageDescriptor.combined.mappings) {
						if (packageDescriptor.combined.mappings[alias] === aliasid) {
							info = {
								alias: alias,
								pkg: aliasid,
								memoized: false
							};
							break;
						} else
						if (alias === aliasid) {
							info = {
								alias: aliasid,
								pkg: packageDescriptor.combined.mappings[alias],
								memoized: false
							};
							break;
						}
					}
				}

				if (info) {
					info.bundleDescriptor = bundleDescriptor;
					info.path = packageDescriptor.combined.dependencies.bundled[info.alias];
					var parentPath = packageDescriptor.dirpath.substring(bundlePackagePath.length + 1);
					if (parentPath) {
						info.path = "./" + PATH.join(parentPath, info.path);
					}
				}

				// We stop as we checked the sandbox 
				return;
			}
		}

		forModule(moduleObj);

		if (!info) throw new Error("Alias '" + aliasid + "' not found in mappings for package " + JSON.stringify(packageDescriptorPaths));

		return info;
	}

	return BUNDLER.bundlePackage(bundlePackagePath, bundleOptions, function(err, descriptor) {
		if (err) return callback(err);

		bundleDescriptors[bundlePackagePath] = descriptor;

		try {

			ASSERT(typeof descriptor === "object");

			if (descriptor.errors.length > 0) {
				descriptor.errors.forEach(function(error) {
					var err = new Error("Got '" + error[0] + "' error '" + error[1] + "' for '" + bundlePackagePath + "'");
					err.stack = error[2];
					throw err;
				});
			}

		} catch(err) {
			return callback(err);
		}

		var bundling = [];

		function resolveDynamicSync (moduleObj, pkg, sandbox, canonicalId, options) {

			if (bundleOptions.debug) console.log("[pinf-it-bundler] resolveDynamicSync", "moduleObj", moduleObj, "pkg", pkg, "sandbox", sandbox, "canonicalId", canonicalId);

			var path = null;

			moduleObj = moduleObj || options.lastModuleRequireContext.moduleObj;

			var bundleBasePath = getBundleBasePath(moduleObj);

			if (/^\//.test(canonicalId)) {
				path = PATH.join(bundleBasePath, canonicalId);

				if (!FS.existsSync(PATH.join(bundleOptions.rootPath, path))) {
					var filePath = PATH.join(bundlePackagePath, canonicalId);
					var options = {
						debug: bundleOptions.debug || false,
						test: bundleOptions.test || false,
						rootPath: bundleOptions.rootPath,
						distPath: bundleBasePath,
						existingModules: getExistingModules(moduleObj)
					};

					var deferred = Q.defer();
					BUNDLER.bundleFile(filePath, options, function(err, descriptor) {
						if (err) return deferred.reject(err);

						bundleDescriptors[path] = descriptor;

						return deferred.resolve();
					});
					bundling.push(deferred.promise);
					// We throw to stop sandbox execution and catch it below
					// so we can re-run sandbox when bundle is generated.
					var error = new Error("Bundling dynamic require.");
					error.code = "BUNDLING_DYNAMIC_REQUIRE";
					throw error;
				}
			} else {

				var canonicalIdParts = canonicalId.split("/");
				var alias = canonicalIdParts.shift();
				var id = canonicalIdParts.join("/");

				var mappingInfo = null;
				if (/^\./.test(alias)) {
					mappingInfo = {
						alias: "",
						path: "",
						pkg: "",
						memoized: true
					}
				} else {
					mappingInfo = getMappingInfo(moduleObj, alias);							
				}
				// Update alias and canonicalId if alias was a resolved package ID.
				if (mappingInfo.alias !== alias) {
					alias = mappingInfo.alias;
					canonicalId = alias + "/" + id;
				}

				var distId = null;
				if (mappingInfo.pkg) {
					distId = PATH.normalize(mappingInfo.pkg + ((id) ? "/" + id : "")).replace(/\//g, "+")
				} else {
					distId = PATH.normalize(id).replace(/\//g, "+")
				}
				var distFilename = options.normalizeIdentifier(distId);

				path = PATH.join(bundleBasePath, distFilename);

				if (!FS.existsSync(PATH.join(bundleOptions.rootPath || "", path))) {

					var filePath = PATH.join(bundlePackagePath, mappingInfo.path);

					var opts = {
						debug: bundleOptions.debug || false,
						test: bundleOptions.test || false,
						rootPath: bundleOptions.rootPath,
						distPath: bundleBasePath,
						distFilename: distFilename,
						// TODO: Compensate for `directories.lib`
						rootModule: ((id) ? "./" + PATH.normalize(options.normalizeIdentifier(id)) : "").replace(/^\.$/, ""),
						rootPackage: mappingInfo.pkg,
						existingModules: getExistingModules(moduleObj)
					};

					var deferred = Q.defer();
					BUNDLER.bundlePackage(filePath, opts, function(err, subDescriptor) {									
						if (err) return deferred.reject(err);

						bundleDescriptors[path] = subDescriptor;

						if (mappingInfo.memoized) return deferred.resolve();

						// We need to add the package mapping to the calling bundle.

						return BUNDLER.augmentBundle(mappingInfo.bundleDescriptor.bundle.path, opts, function(err, bundle, done) {
							if (err) return deferred.reject(err);

							var moduleInfo = bundle.modules[moduleObj.pkg + "/package.json"];
							var descriptor = JSON.parse(moduleInfo[0]);
							if (!descriptor.mappings) {
								descriptor.mappings = {};
							}
							descriptor.mappings[mappingInfo.alias] = mappingInfo.pkg;
							moduleInfo[0] = JSON.stringify(descriptor, null, 4);
							mappingInfo.bundleDescriptor.modules[moduleObj.pkg + "/package.json"].descriptor.memoized = descriptor;

							return done(function(err) {
								if (err) return deferred.reject(err);
								return deferred.resolve();
							});
						});
					});
					bundling.push(deferred.promise);
					// We throw to stop sandbox execution and catch it below
					// so we can re-run sandbox when bundle is generated.
					var error = new Error("Bundling dynamic require.");
					error.code = "BUNDLING_DYNAMIC_REQUIRE";
					throw error;
				}
			}
			return path;
		}

		function ensureAsync(moduleObj, pkg, sandbox, canonicalId, options, callback) {

			if (bundleOptions.debug) console.log("[pinf-it-bundler] ensureAsync", "moduleObj", moduleObj, "pkg", pkg, "sandbox", sandbox, "canonicalId", canonicalId);

		 	// If bundle is already cached we have nothing to do.
		 	if (bundleDescriptors[BUNDLER.normalizeExtension(canonicalId)]) {
		 		return callback(null);
		 	}
			try {
				resolveDynamicSync(moduleObj, pkg, sandbox, canonicalId, options);
				return callback(null);
			} catch(err) {
				if (err.code === "BUNDLING_DYNAMIC_REQUIRE") {
					// We wait until everything is bundled and then return.
					return Q.all(bundling).then(function() {
						return callback(null);
					}).fail(callback);
				}
				return callback(err);
			}
		}

		function runBundle() {

			return Q.fcall(function() {

				var deferred = Q.defer();
				var bundlePath = PATH.join(bundleOptions.distPath, descriptor.exports.main);

				bundleOptions.onRun(bundlePath, {
					debug: bundleOptions.debug || false,
					// We encountered a dynamic sync require.
					resolveDynamicSync: resolveDynamicSync,
					ensureAsync: ensureAsync
				}, function(err) {
					if (err) return deferred.reject(err);
					return deferred.resolve();
				});

				return deferred.promise;

			}).fail(function(err) {
				// If we are generating a missing bundle, we wait for it
				// and then re-run sandbox.
				if (err.code === "BUNDLING_DYNAMIC_REQUIRE") {
					return Q.all(bundling).then(function() {
						return runBundle();
					});
				}
				return Q.reject(err);
			});
		}

		return runBundle().then(function() {
			return callback(null, bundleDescriptors, {
				ensureAsync: ensureAsync
			});
		}, callback);
	});
}
