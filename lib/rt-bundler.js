
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

	return BUNDLER.bundlePackage(bundlePackagePath, bundleOptions, function(err, descriptor) {
		if (err) return callback(err);

		bundleDescriptors[bundlePackagePath] = descriptor;

		try {

			ASSERT(typeof descriptor === "object");

			if (descriptor.errors.length > 0) {
				descriptor.errors.forEach(function(error) {
					var err = new Error("Got '" + error[0] + "' error '" + error[1] + "' for file '" + PATH.join("assets", file) + "'");
					err.stack = error[2];
					throw err;
				});
			}

		} catch(err) {
			return callback(err);
		}

		function runBundle() {

			var bundling = [];

			return Q.fcall(function() {

				var deferred = Q.defer();
				var bundlePath = PATH.join(bundleOptions.distPath, descriptor.exports.main);

				bundleOptions.onRun(bundlePath, {
					debug: bundleOptions.debug || false,
					// We encountered a dynamic sync require.
					resolveDynamicSync: function(moduleObj, pkg, sandbox, canonicalId, options) {

						if (bundleOptions.debug) console.log("[pinf-it-bundler] resolveDynamicSync", "moduleObj", moduleObj, "pkg", pkg, "sandbox", sandbox, "canonicalId", canonicalId);

						var path = null;

						moduleObj = moduleObj || options.lastModuleRequireContext.moduleObj;

						var subDistPath = "";
						if (moduleObj && sandbox.id !== PATH.join(bundleOptions.distPath, moduleObj.id.replace(/\.js$/, ""))) {
							subDistPath = moduleObj.id.replace(/\.[^\.]+$/, "");
						}

						if (/^\//.test(canonicalId)) {
							path = PATH.join(sandbox.id, subDistPath, canonicalId);
console.log("PATH", path);

							if (!FS.existsSync(PATH.join(bundleOptions.rootPath, path))) {
								var filePath = PATH.join(bundlePackagePath, canonicalId);
								var options = {
									//debug: true,
									rootPath: bundleOptions.rootPath,
									distPath: PATH.join(sandbox.id, subDistPath),
									existingModules: descriptor.bundles[descriptor.exports.main].modules
								};
								var deferred = Q.defer();
								BUNDLER.bundleFile(filePath, options, function(err, descriptor) {
									if (err) return deferred.reject(err);

									bundleDescriptors[filePath] = descriptor;

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

console.log("RESOLVE DYNAMIC", pkg, sandbox, canonicalId, alias, id, options.lastModuleRequireContext);

							// Convert resolved alias back to raw alias if applicable.
							if (options.lastModuleRequireContext && options.lastModuleRequireContext.pkg) {
								for (var key in options.lastModuleRequireContext.pkg.mappings) {
									if (options.lastModuleRequireContext.pkg.mappings[key] === alias) {
										alias = key;
										canonicalId = alias + "/" + id;
										break;
									}
								}
							} else {
								for (var key in pkg.mappings) {
									if (pkg.mappings[key] === alias) {
										alias = key;
										canonicalId = alias + "/" + id;
										break;
									}
								}
							}

							var bundleDescriptor = descriptor.bundles[descriptor.exports.main];
							var packageDescriptor = null;
							if (options.lastModuleRequireContext) {
								packageDescriptor = bundleDescriptor.modules[options.lastModuleRequireContext.pkg.id + "/package.json"].descriptor;
							} else {
								packageDescriptor = bundleDescriptor.modules["/package.json"].descriptor;
							}

							for (var key in packageDescriptor.combined.mappings) {
								if (packageDescriptor.combined.mappings[key] === alias) {
									alias = key;
									canonicalId = alias + "/" + id;
									break;
								}
							}

							var mappings = packageDescriptor.combined.dependencies.bundled;

							if (!mappings[alias]) throw new Error("Alias '" + alias + "' not found in mappings for package '" + PATH.join(bundleOptions.rootPath, packageDescriptor.dirpath) + "'");

							path = PATH.join(sandbox.id, subDistPath, options.normalizeIdentifier(canonicalId.replace(/\//g, "+")));

console.log("PATH", path);
							if (!FS.existsSync(PATH.join(bundleOptions.rootPath, path))) {

								var filePath = PATH.join(bundlePackagePath, mappings[alias]);
								var options = {
									//debug: true,
									rootPath: bundleOptions.rootPath,
									distPath: PATH.join(sandbox.id, subDistPath),
									distFilename: options.normalizeIdentifier(canonicalId.replace(/\//g, "+")),
									// TODO: Compensate for `directories.lib`
									rootModule: "." + options.normalizeIdentifier(id),
									existingModules: descriptor.bundles[descriptor.exports.main].modules
								};

								var deferred = Q.defer();
								BUNDLER.bundlePackage(filePath, options, function(err, descriptor) {
									if (err) return deferred.reject(err);

console.log("DYNAMIC BUNDLE WRITTEN", descriptor);

									bundleDescriptors[filePath] = descriptor;

									return deferred.resolve();
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
			return callback(null, bundleDescriptors);
		}, callback);
	});
}