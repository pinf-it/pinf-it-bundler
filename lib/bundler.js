
const ASSERT = require("assert");
const PATH = require("path");
const FS = require("fs-extra");
const DEEPCOPY = require("deepcopy");
const WAITFOR = require("waitfor");
const MODULE_INSIGHT = require("pinf-it-module-insight");
const PACKAGE_INSIGHT = require("pinf-it-package-insight");
const BUNDLE = require("./bundle");
const WRAPPER = require("./wrapper");
const BROWSER_BUILTINS = require("browser-builtins");


exports.normalizeExtension = function (pathid) {
	if (/(^|\/)[^\.]*$/.test(pathid)) {
		pathid += ".js";
	}
	return pathid;
}

exports.augmentBundle = function(bundleFilePath, options, callback) {
	return BUNDLE.open(bundleFilePath, options, function(err, bundle) {
		if (err) return callback(err);
		return callback(null, bundle, function(callback) {
			return bundle.save(function(err) {
				if (err) return callback(err);
				return bundle.close(function(err) {
					if (err) return callback(err);
					return callback(null);
				});
			});
		});
	});
}

exports.bundlePackage = function(bundlePackagePath, options, callback) {

	ASSERT.equal(typeof options, "object");
	ASSERT.equal(typeof options.distPath, "string");

	options.API = {
		FS: (options.$pinf && options.$pinf.getAPI("FS")) || FS
	};

	options._realpath = function(path) {
		if (!options.rootPath) return path;
		if (/^\//.test(path)) return path;
		return PATH.join(options.rootPath, path);
	}

	var bundlePackageDescriptor = {
		bundles: {},
		warnings: [],
		errors: []
	};

	function bundleFile(bundleFilePath, callback) {

		if (options.debug) console.log("[pinf-it-bundler] bundlePackage/bundleFile", bundleFilePath);

		var packageDescriptors = {};

		function loadPackageDescriptorForPath(path, options, callback) {
			if (packageDescriptors[path]) {
				return callback(null, packageDescriptors[path]);
			}
			return PACKAGE_INSIGHT.parse(path, options, function(err, packageDescriptor) {
				if (err) return callback(err);

				if (packageDescriptor.errors.length > 0) {
					packageDescriptor.errors.forEach(function(error) {
						console.error(error, new Error().stack);
					});
					return callback(new Error("We had errors in package descriptor '" + path + "'!"));
				}

				return callback(null, (packageDescriptors[path] = packageDescriptor));
			});
		}

		var packages = {};

		function getPackageDescriptorForPath(path, options, callback) {
			if (packages[path]) {
				return callback(null, packages[path][0], packages[path][1]);
			}
			return loadPackageDescriptorForPath(path, options, function(err, packageDescriptor) {
				if (err) return callback(err);

				if (path === bundleFilePath) {
					packageDescriptor.id = "";
				}
				if (!packageDescriptor.memoized) {
					packageDescriptor.memoized = {};
				}
				if (
					packageDescriptor.combined.exports &&
					packageDescriptor.combined.exports.main
				) {
					packageDescriptor.memoized.main = (packageDescriptor.id || options.rootPackage || "") + packageDescriptor.combined.exports.main.replace(/^\./, "");
				}
				if (
					packageDescriptor.combined.layout &&
					packageDescriptor.combined.layout.directories &&
					packageDescriptor.combined.layout.directories.lib
				) {
					packageDescriptor.memoized.directories = {
						lib: packageDescriptor.combined.layout.directories.lib.replace(/^\.\//, "")
					};
				}

				function resolvePackageId(id, callback) {
					function checkDescriptor(packageDescriptor, callback) {
						if (packageDescriptor.combined.dependencies) {
							var dependencyLocator = null;
							[
								// TODO: Why bundled first?
								"bundled",
								"required"
								// TODO: Add more types?
							].forEach(function (type) {
								if (dependencyLocator) return;
								if (
									packageDescriptor.combined.dependencies[type] &&
									packageDescriptor.combined.dependencies[type][id]
								) {
									dependencyLocator = packageDescriptor.combined.dependencies[type][id];
								}
							});
							if (dependencyLocator) {
								// TODO: Support various `dependencyLocator` formats.
								if (!dependencyLocator.location) {
									console.error("packageDescriptor.combined", JSON.stringify(packageDescriptor.combined, null, 4));
									return callback(new Error("`dependencyLocator.location ` not set for '" + packageDescriptor.dirpath + "' while resolving package '" + id + "'!"));
								}
								var aliasedPackagePath = PATH.join(path, dependencyLocator.location);
								return getPackageDescriptorForPath(
									aliasedPackagePath,
									options,
									function(err, aliasdPackageDescriptor, packageExtras) {
										if (err) return callback(err);
										return callback(null, aliasedPackagePath, aliasdPackageDescriptor, packageExtras);
									}
								);
							}
						}
						// If we are dealing with dependencies in `node_modules` directories we go up the tree.
						// This is the default behavior.
						function resolve(path) {
							return options.API.FS.exists(PATH.join(path, "node_modules", id), function(exists) {
								if (exists) {
									return getPackageDescriptorForPath(
										options._relpath(PATH.join(path, "node_modules", id)),
										options,
										function(err, aliasdPackageDescriptor, packageExtras) {
											if (err) return callback(err);
											return callback(null, options._relpath(PATH.join(path, "node_modules", id)), aliasdPackageDescriptor, packageExtras);
										}
									);
								}
								if (PATH.dirname(path) === path) return callback(null);
								return resolve(PATH.dirname(path));
							});
						}

						if (!id && path === packageDescriptor.dirpath) {
							return callback(null, path, packages[path][0], packages[path][1]);
						}
						return resolve(PATH.dirname(options._realpath(path)));
					}
					return checkDescriptor(packageDescriptor, callback);
				}

				packages[path] = [packageDescriptor, {
					locateFileInPackage: function(descriptor, id, callback) {
						var idParts = id.split("/");

						// TODO: Relocate this elsewhere. Maybe `pinf-primitives-js`?
/*
						// TODO: Use this check but allow for inheriting default from parent package.
						if (
							packageDescriptor.combined &&
							packageDescriptor.combined.requirements &&
							packageDescriptor.combined.requirements.engines &&
							packageDescriptor.combined.requirements.engines.node
						) {
*/
							// NOTE: We assume we are running on nodejs.
							try {
								if (id !== "require" && require.resolve(id) === id) {
									// We have a system module and assume it will be provided at runtime.
									return callback(null, true, "", {});
								}
							} catch(err) {}
//						}

						return resolvePackageId(idParts[0], function(err, aliasedPackagePath, aliasdPackageDescriptor, packageExtras) {
							if (err) return callback(err);

							if (!aliasedPackagePath) {
								// We assume package will be provided at runtime.
								return callback(null, true, "", {});
							}

							try {
								if (!packageDescriptor.memoized.mappings) {
									packageDescriptor.memoized.mappings = {};
								}

								if (aliasdPackageDescriptor.dirpath === packageDescriptor.dirpath) {
									// We requested the main module from a package.
									idParts = [options.rootPackage || ""];
								}

								// Package was required.
								// Package is not a system module.
								// Package should have been found in bundled dependencies but was not.
								// Package is likely declared as optional dependency but not installed (i.e. bundled).
								if (!aliasdPackageDescriptor) {
									// TODO: Check `packageDescriptor.combined.dependencies` to see if declared as optional.
									// We assume package will be provided at runtime.
									return callback(null, true, "", {});
								}

								if (idParts[0]) {
									packageDescriptor.memoized.mappings[idParts[0]] = aliasdPackageDescriptor.id;
								}

								var modulePath = null;
								var memoizeId = null;
								if (idParts.length > 1) {
									if (
										aliasdPackageDescriptor.combined.layout &&
										aliasdPackageDescriptor.combined.layout.directories &&
										aliasdPackageDescriptor.combined.layout.directories.lib
									) {
										// HACK: We need a toggle for whether to always inject lib dir or not.
										//		 For now we simply skip injecting lib dir if second id segment matches lib dir.
										if (idParts.length >= 2 && idParts[1] !== aliasdPackageDescriptor.combined.layout.directories.lib.replace(/^\.\//, "")) {
											idParts[1] = aliasdPackageDescriptor.combined.layout.directories.lib.replace(/^\.\//, "") + "/" + idParts[1];
										}
									}
									modulePath = PATH.join(aliasedPackagePath, exports.normalizeExtension(idParts.slice(1).join("/")));
									memoizeId = aliasdPackageDescriptor.id + "/" + idParts.slice(1).join("/");
								} else {
									if (
										!aliasdPackageDescriptor.combined.exports ||
										!aliasdPackageDescriptor.combined.exports.main
									) {
										throw new Error("`exports.main` must be set if no module specified when requiring package '" + id + "' from package '" + path + "'");
									}
									modulePath = PATH.join(aliasedPackagePath, aliasdPackageDescriptor.combined.exports.main);
									memoizeId = (aliasdPackageDescriptor.id || idParts[0]) + aliasdPackageDescriptor.combined.exports.main.replace(/^\.|\.js$/, "");
								}

								return callback(null, modulePath, memoizeId, packageExtras);
							} catch(err) {
								return callback(err);
							}
						});
					}
				}];
				return callback(null, packages[path][0], packages[path][1]);
			});
		}

		return getPackageDescriptorForPath(bundleFilePath, options, function(err, packageDescriptor, packageExtras) {
			if (err) return callback(err);

			var rootModule = options.rootModule;
			if (!rootModule) {
				try {
					ASSERT.equal(typeof packageDescriptor.combined.exports, "object");
					ASSERT.equal(typeof packageDescriptor.combined.exports.main, "string");
				} catch(err) {
					return callback(new Error("Package descriptor for '" + bundleFilePath + "' does not declare `main` module"));
				}
				rootModule = packageDescriptor.combined.exports.main;
			}
			var rootPackage = options.rootPackage || "";

			var opts = {};
			for (var name in options) {
				opts[name] = options[name];
			}
			opts.packageExtras = packageExtras || null;

			opts.finalizeBundle = function(bundleDescriptor, bundle, callback) {
				for (var packagePath in packages) {

					if (options.test) {
						packages[packagePath][0].mtime = "0";
					}

					var memoized = packages[packagePath][0].memoized || {};
					memoized.dirpath = packages[packagePath][0].dirpath;

					if (Object.keys(memoized).length > 0) {
						var pkgId = packages[packagePath][0].id || options.rootPackage || "";
					}

					bundleDescriptor.modules[pkgId + "/package.json"] = {
						requireId: pkgId + "/package.json",
						memoizeId: pkgId + "/package.json",
						descriptor: packages[packagePath][0],
						wrapper: "json"
					};
					bundle.setModule(
						pkgId + "/package.json",
						JSON.stringify(memoized, null, 4), {
							filename: packages[packagePath][0].dirpath + "/package.json"
						}, {
							file: null,
							mtime: 0,
							wrapper: "json",
							format: "json"
						}
					);
				}
				return callback(null);
			}

			opts.rootModule = rootModule;

			return exports.bundleFile(PATH.join(bundleFilePath, rootModule), opts, function(err, bundleDescriptor) {
				if (err) return callback(err);

				var bundleId = rootModule.replace(/^\.\//, "/");

				bundleDescriptor.id = bundleId;

				if (
					bundleDescriptor.modules[rootPackage + "/package.json"] &&
					typeof bundleDescriptor.modules[rootPackage + "/package.json"].descriptor.dirpath === "undefined"
				) {
					packageDescriptor.memoized = bundleDescriptor.modules[rootPackage + "/package.json"].descriptor.memoized;
					bundleDescriptor.modules[rootPackage + "/package.json"].descriptor = packageDescriptor;
				}

				bundlePackageDescriptor.bundles[bundleId] = bundleDescriptor;

				bundleDescriptor.warnings.forEach(function(warning) {
					bundlePackageDescriptor.warnings.push([].concat(warning, "file", rootModule));
				});
				bundleDescriptor.errors.forEach(function(error) {
					bundlePackageDescriptor.errors.push([].concat(error, "file", rootModule));
				});

				return callback(null, bundleDescriptor);
			});
		});
	}

	if (options.debug) console.log("[pinf-it-bundler] bundlePackage", bundlePackagePath);

	return bundleFile(bundlePackagePath, function(err, bundleDescriptor) {
		if (err) return callback(err);

		bundlePackageDescriptor.exports = {
			main: bundleDescriptor.id
		};

		return callback(null, bundlePackageDescriptor);
	});
}

exports.bundleFile = function(bundleFilePath, options, callback) {
	try {

		ASSERT.equal(typeof options, "object");
		ASSERT.equal(typeof options.distPath, "string");

		options.API = {
			FS: (options.$pinf && options.$pinf.getAPI("FS")) || FS
		};

		options._realpath = function(path) {
			if (!options.rootPath) return path;
			if (/^\//.test(path)) return path;
			return PATH.join(options.rootPath, path);
		}
	
		options._relpath = function(path) {
			if (!path || !options.rootPath || !/^\//.test(path)) return path;
			return PATH.relative(options.rootPath, path);
		}

		var packageDescriptors = {};

		options.packageDescriptorForModule = function(path, callback) {
			return PACKAGE_INSIGHT.findPackagePath(options._realpath(path), function(err, path) {
				if (err) return callback(err);
				path = options._relpath(path);
				if (packageDescriptors[path]) {
					return callback(null, packageDescriptors[path]);
				}
				return PACKAGE_INSIGHT.parse(path, options, function(err, packageDescriptor) {
					if (err) return callback(err);
					if (packageDescriptor.errors.length > 0) {
						packageDescriptor.errors.forEach(function(error) {
							console.error(error, new Error().stack);
						});
						return callback(new Error("We had errors in package descriptor '" + path + "'!"));
					}					
					return callback(null, (packageDescriptors[path] = packageDescriptor));
				});
			});
		}


		var bundleDescriptor = null;
		var bundle = null;
		var rootPackage = options.rootPackage || "";
		var rootPackageDescriptor = null;


		function realpath(path, callback) {
			return options.API.FS.exists(options._realpath(path), function(exists) {
				if (exists) return callback(null, path);
				if (typeof options.locateMissingFile === "function") {
					return options.locateMissingFile(null, path, callback);
				}
				return callback(new Error("Missing dependency '" + path + "'"));
			});
		}

		function init(bundleFilePath, callback) {

			return options.packageDescriptorForModule(bundleFilePath, function(err, descriptor) {
				if (err) return callback(err);
				rootPackageDescriptor = descriptor;
				bundleDescriptor = {
					modules: {},
					expectExistingModules: {},
					bundle: {
						path: PATH.join(options.distPath,
							options.distFilename ||
							(descriptor && descriptor.dirpath !== "." && bundleFilePath.substring(descriptor.dirpath.length + 1)) ||
							(/^\//.test(bundleFilePath) ? PATH.basename(bundleFilePath) : bundleFilePath)
						)
					},
					warnings: [],
					errors: []
				};
				return callback(null);
			});
		}

		function openBundle(bundlePath, callback) {
			return BUNDLE.open(bundlePath, options, function(err, openedBundle) {
				if (err) return callback(err);
				bundle = openedBundle;
				return callback(null);
			});
		}

		function addFile(filePath, options, callback) {

			return MODULE_INSIGHT.parseFile(filePath, options, function(err, moduleDescriptor) {
				if (err) return callback(err);

				if (moduleDescriptor.errors.length > 0) {
					moduleDescriptor.errors.forEach(function(error) {
						console.error(error, new Error().stack);
					});
				}

				var descriptor = {
					requireId: options.id,
					memoizeId: exports.normalizeExtension(options.id),
					descriptor: moduleDescriptor,
					wrapper: {
						type: null,
						top: null,
						code: null,
						bottom: null
					},
					// The dependencies that the bundler will try and follow.
					dependencies: DEEPCOPY(moduleDescriptor.dependencies),
					warnings: [].concat(moduleDescriptor.warnings),
					errors: [].concat(moduleDescriptor.errors)
				};
				delete moduleDescriptor.warnings;
				delete moduleDescriptor.errors;

				if (options.existingModules && options.existingModules[descriptor.memoizeId]) {
					bundleDescriptor.expectExistingModules[descriptor.requireId] = options.existingModules[descriptor.memoizeId];
					return callback(null, descriptor);
				}

				return WRAPPER.wrapModule(descriptor, options, function(err) {
					if (err) return callback(err);

					var header = WRAPPER.headerForWrapper(descriptor.wrapper.type);
					if (header) {
						bundle.setHeader({
							helper: descriptor.wrapper.type
						}, header);							
					}
					if (options.test) {
						descriptor.descriptor.mtime = 0;
					}

					bundleDescriptor.modules[descriptor.memoizeId] = descriptor;

					bundle.setModule(
						descriptor.memoizeId,
						(descriptor.wrapper.code || [
							descriptor.wrapper.top,
							descriptor.descriptor.code,
							descriptor.wrapper.bottom
						].join("\n")), {
							filename: descriptor.descriptor.filepath
						}, {
							file: filePath,
							mtime: ((options.test) ? 0 : moduleDescriptor.mtime),
							wrapper: descriptor.wrapper.type,
							format: moduleDescriptor.format
						}
					);

					return callback(null, descriptor);
				});
			});
		}

		function resolveModuleId(descriptor, id, options, callback) {
			var memoizeId = id;
			id = exports.normalizeExtension(id);

			function finalize(callback) {
				// Assume path is relative to bundle root module.
				return callback(null, PATH.join(descriptor.descriptor.filepath, "..", id), "/" + memoizeId);
			}

			// Check for id relative to module.
			if (/^\./.test(id)) {
				return options.API.FS.exists(PATH.join(descriptor.descriptor.filepath, "..", memoizeId.replace(/\.js$/, "")), function(exists) {
					if (exists) {
						return options.API.FS.exists(PATH.join(descriptor.descriptor.filepath, "..", memoizeId.replace(/\.js$/, ""), "package.json"), function(exists) {
							if (exists) {
								// Resolve to package dependency.
								if (options.packageExtras && typeof options.packageExtras.locateFileInPackage === "function") {
									return options.packageExtras.locateFileInPackage(descriptor, PATH.normalize(PATH.join(PATH.dirname(descriptor.memoizeId), memoizeId)), function(err, path, memoizeId, packageExtras) {
										if (err) return callback(err);
										if (path === true && !memoizeId) {
											// We have a system module.
											return callback(null, true);
										}
										if (!path || !memoizeId) return finalize(callback);
										return callback(null, path, memoizeId, packageExtras);
									});
								}
							}
							return options.API.FS.exists(PATH.join(descriptor.descriptor.filepath, "..", memoizeId, "index.js"), function(exists) {
								if (exists) {
									return callback(null, PATH.join(descriptor.descriptor.filepath, "..", memoizeId, "index.js"), PATH.join(descriptor.requireId, "..", memoizeId, "index"));
								}
								return callback(null, PATH.join(descriptor.descriptor.filepath, "..",  memoizeId.replace(/\.js$/, "") + ".js"), PATH.join(descriptor.requireId, "..", memoizeId.replace(/\.js$/, "") + ".js"));
							});
						});
					}
					return callback(null, PATH.join(descriptor.descriptor.filepath, "..", id), PATH.join(descriptor.requireId, "..", memoizeId));
				});
			}
			// Resolve to package dependency.
			if (options.packageExtras && typeof options.packageExtras.locateFileInPackage === "function") {
				return options.packageExtras.locateFileInPackage(descriptor, memoizeId, function(err, path, memoizeId, packageExtras) {
					if (err) return callback(err);
					if (path === true && !memoizeId) {
						// We have a system module.
						return callback(null, true);
					}
					if (!path || !memoizeId) return finalize(callback);

					return options.API.FS.exists(options._realpath(path), function(exists) {
						if (exists) {
							return callback(null, path, memoizeId, packageExtras);
						}
						return callback(null, PATH.join(path.replace(/\.js$/, ""), "index.js"), PATH.join(memoizeId, "index"));
					});
					return callback(null, path, memoizeId, packageExtras);
				});
			}
			return finalize(callback);
		}

		function addStatic(path, memoizeId, options, callback) {
			return realpath(path, function(err, path) {
				if (err) return callback(err);
				options.id = memoizeId;
				return bundleStaticallyLinkedFiles(path, options, callback);
			});
		}

		function addDynamic(path, memoizeId, opts, callback) {
			if (!opts.existingModules) {
				opts.existingModules = {};
			}
			for (var id in bundleDescriptor.modules) {
				opts.existingModules[id] = {};
			}
			if (/^\//.test(memoizeId)) {
				opts.distPath = PATH.join(opts.distPath, opts.parentMemoizeId.replace(/^\/|\.js$/g, ""));
				delete opts.rootModule;
				return exports.bundleFile(path, opts, function(err, descriptor) {
					if (err) return callback(err);
					if (options.on && options.on.newBundle) {
						options.on.newBundle(path, descriptor);
					}
					return callback(null, descriptor);
				});
			} else {
				return options.packageDescriptorForModule(path, function(err, packageDescriptor) {
					if (err) return callback(err);
					opts.distPath = PATH.join(opts.distPath, PATH.basename(bundleFilePath.replace(/\.js$/, "")), PATH.dirname(memoizeId.replace(/^\//, "")));
					opts.distFilename = PATH.basename(path);
					opts.rootModule = exports.normalizeExtension(memoizeId.replace(packageDescriptor.id, "."));
					opts.rootPackage = packageDescriptor.id;
					return exports.bundlePackage(packageDescriptor.dirpath, opts, function(err, descriptor) {									
						if (err) return callback(err);
						if (options.on && options.on.newBundle) {
							options.on.newBundle(path, descriptor);
						}
						return callback(null, descriptor);
					});
				});
			}
		}

		function bundleStaticallyLinkedFiles(filePath, options, callback) {

			if (bundleDescriptor.modules[exports.normalizeExtension(options.id)]) return callback(null);

			return addFile(filePath, options, function(err, descriptor) {
				if (err) return callback(err);

				return options.packageDescriptorForModule(filePath, function(err, packageDescriptor) {
					if (err) return callback(err);

					var waitfor = WAITFOR.serial(function(err) {
						if (err) return callback(err);
						descriptor.warnings.forEach(function(warning) {
							bundleDescriptor.warnings.push([].concat(warning, "module", descriptor.memoizeId));
						});
						descriptor.errors.forEach(function(error) {
							bundleDescriptor.errors.push([].concat(error, "module", descriptor.memoizeId));
						});
						return callback(null, descriptor);
					});

					function addDependency(type, id, done) {

						function callback(err) {
							if (err) {
								var stack = err.stack;
								if (options.test) {
									stack = stack.replace(/at [\S\s]*/, "");
								}
								descriptor.errors.push([
									"bundle-" + type, err.message, stack
								]);
							}
							return done(null);
						}
						return resolveModuleId(descriptor, id, options, function(err, path, memoizeId, packageExtras) {
							if (err) return callback(err);

							if (
								bundleDescriptor.modules[exports.normalizeExtension(memoizeId)] ||
								bundleDescriptor.expectExistingModules[exports.normalizeExtension(memoizeId)]
							) return callback(null);

							if (options.existingModules && options.existingModules[exports.normalizeExtension(memoizeId)]) {
								bundleDescriptor.expectExistingModules[memoizeId] = options.existingModules[exports.normalizeExtension(memoizeId)];
								return callback(null, descriptor);
							}

							if (path === true && !memoizeId) {
								var bundle = false;
								// See if we should convert module from default (nodejs) to other format.
								// TODO: Do this in a plugin (it.pinf.nodejs)
								if (options.$pinf) {
									var programInfo = options.$pinf.getProgramInfo();
									if (
										programInfo &&
										programInfo.program &&
										programInfo.program.descriptor &&
										programInfo.program.descriptor.config &&
										programInfo.program.descriptor.config["github.com/pinf-it/pinf-it-bundler/0"] &&
										programInfo.program.descriptor.config["github.com/pinf-it/pinf-it-bundler/0"].target
									) {
										if (programInfo.program.descriptor.config["github.com/pinf-it/pinf-it-bundler/0"].target === "browser") {
											// Use `browserify` to convert system module to browser format.
											if (BROWSER_BUILTINS[id]) {
												memoizeId = "/__SYSTEM__/" + id;
												path = BROWSER_BUILTINS[id];
											}
										}
									}
								}
								// We have a system module.
								if (path === true) return callback(null);
							}
							var opts = {};
							for (var key in options) {
								opts[key] = options[key];
							}
							opts.packageExtras = packageExtras || opts.packageExtras || null;
							if (type === "static") {
								return addStatic(path, memoizeId, opts, callback);
							}
							if (options.forceMemoizeFiles && options.forceMemoizeFiles[exports.normalizeExtension(memoizeId)]) {
								return addStatic(path, memoizeId, opts, callback);
							}

							opts.parentMemoizeId = exports.normalizeExtension(options.id);

							return addDynamic(path, memoizeId, opts, callback);
						});
					}

					for (var id in descriptor.dependencies.static) {
						waitfor("static", id, addDependency);
					}
					for (var id in descriptor.dependencies.dynamic) {
						waitfor("dynamic", id, addDependency);
					}

					if (
						packageDescriptor &&
						packageDescriptor.combined["require.async"]
					) {
						var lookupId = null;
						if (packageDescriptor.id === rootPackageDescriptor.id) {
							lookupId = exports.normalizeExtension("." + options.id);
						} else {
							lookupId = exports.normalizeExtension(options.id.replace(packageDescriptor.id, "."));
						}
						var rules = packageDescriptor.combined["require.async"];

						// TODO: Expand on these matching rules to incrorporate '*' wildcard selectors.
						if (rules[lookupId]) {
							waitfor("dynamic", rules[lookupId], addDependency);
						}
					}

					return waitfor();
				});
			});
		}

		function finalizeBundle(callback) {
			function finalize(callback) {
				return bundle.save(function(err) {
					if (err) return callback(err);
					return bundle.close(function(err) {
						if (err) return callback(err);
						return callback(null);
					});
				});
			}
			if (typeof options.finalizeBundle === "function") {
				return options.finalizeBundle(bundleDescriptor, bundle, function(err) {
					if (err) return callback(err);
					return finalize(callback);
				});
			}
			return finalize(callback);
		}

		if (options.debug) console.log("[pinf-it-bundler] bundleFile", bundleFilePath);

		return realpath(bundleFilePath, function(err, bundleFilePath) {
			if (err) return callback(err);

			return init(bundleFilePath, function(err) {
				if (err) return callback(err);

				return openBundle(bundleDescriptor.bundle.path, function(err) {
					if (err) return callback(err);

					var opts = {};
					for (var key in options) {
						opts[key] = options[key];
					}

					opts.id = PATH.normalize(rootPackage + "/" + (options.rootModule || PATH.basename(bundleFilePath)).replace(/\.js/, ""));

					return bundleStaticallyLinkedFiles(bundleFilePath, opts, function(err, moduleDescriptor) {
						if (err) return callback(err);

						var waitfor = WAITFOR.serial(function(err) {
							if (err) return callback(err);

							if (options.existingModules && options.existingModules[rootPackage + "/package.json"]) {
								bundleDescriptor.expectExistingModules[rootPackage + "/package.json"] = options.existingModules[rootPackage + "/package.json"];
							} else {
								if (!bundleDescriptor.modules[rootPackage + "/main"] && !bundleDescriptor.modules[rootPackage + "/package.json"]) {									
									bundleDescriptor.modules[rootPackage + "/package.json"] = {
										requireId: rootPackage + "/package.json",
										memoizeId: rootPackage + "/package.json",
										descriptor: {
											memoized: {
												main: moduleDescriptor.memoizeId
											}
										},
										wrapper: "json"
									};
									bundle.setModule(
										exports.normalizeExtension(rootPackage + "/package.json"), JSON.stringify({
											main: moduleDescriptor.memoizeId
										}, null, 4), {
											filename: moduleDescriptor.descriptor.filepath
										}, {
											file: "",
											mtime: 0,
											wrapper: "json",
											format: "json"
										}
									);
								}
							}

							return finalizeBundle(function(err) {
								if (err) return callback(err);

								return callback(null, bundleDescriptor);
							});
						});

						if (options.forceMemoizeFiles) {
							for (var memoizeId in options.forceMemoizeFiles) {
								waitfor(memoizeId, function(memoizeId, done) {
									addStatic(options.forceMemoizeFiles[memoizeId], memoizeId.replace(/\.js/, ""), options, done);
								});
							}
						}
						waitfor();
					});
				});
			});
		});

	} catch(err) {
		return callback(err);
	}
}
