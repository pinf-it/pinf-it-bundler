
const ASSERT = require("assert");
const PATH = require("path");
const FS = require("fs-extra");
const DEEPCOPY = require("deepcopy");
const WAITFOR = require("waitfor");
const MODULE_INSIGHT = require("pinf-it-module-insight");
const PACKAGE_INSIGHT = require("pinf-it-package-insight");
const BUNDLE = require("./bundle");
const WRAPPER = require("./wrapper");


function normalizeExtension(pathid) {
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

		var packageDescriptors = {};

		function loadPackageDescriptorForPath(path, options, callback) {
			if (packageDescriptors[path]) {
				return callback(null, packageDescriptors[path]);
			}
			return PACKAGE_INSIGHT.parse(path, options, function(err, packageDescriptor) {
				if (err) return callback(err);
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
				packageDescriptor.memoized = {};
				if (
					packageDescriptor.combined.exports &&
					packageDescriptor.combined.exports.main
				) {
					packageDescriptor.memoized.main = (options.rootPackage || packageDescriptor.id || "") + packageDescriptor.combined.exports.main.replace(/^\./, "");
				}
				if (
					packageDescriptor.combined.config &&
					packageDescriptor.combined.config.directories &&
					packageDescriptor.combined.config.directories.lib
				) {
					packageDescriptor.memoized.directories = {
						lib: packageDescriptor.combined.config.directories.lib.replace(/^\.\//, "")
					};
				}

				function resolvePackageId(id, callback) {
					function checkDescriptor(packageDescriptor, callback) {
						if (
							packageDescriptor.combined.dependencies &&
							packageDescriptor.combined.dependencies.bundled &&
							packageDescriptor.combined.dependencies.bundled[id]
						) {
							var aliasedPackagePath = PATH.join(path, packageDescriptor.combined.dependencies.bundled[id]);
							return getPackageDescriptorForPath(
								aliasedPackagePath,
								options,
								function(err, aliasdPackageDescriptor, packageExtras) {
									if (err) return callback(err);
									return callback(null, aliasedPackagePath, aliasdPackageDescriptor, packageExtras);
								}
							);
						}
						// If we are dealing with dependencies in `node_modules` directories we go up the tree.
						// This is the default behavior.
						function resolve(path) {
							if (PATH.basename(path) !== "node_modules") return callback(null);
							return FS.exists(PATH.join(options._realpath(path), id), function(exists) {
								if (exists) {
									return getPackageDescriptorForPath(
										PATH.join(path, id),
										options,
										function(err, aliasdPackageDescriptor, packageExtras) {
											if (err) return callback(err);
											return callback(null, PATH.join(path, id), aliasdPackageDescriptor, packageExtras);
										}
									);
								}
								return resolve(PATH.dirname(PATH.dirname(path)));
							});
						}
						return resolve(PATH.dirname(path));
					}
					return checkDescriptor(packageDescriptor, callback);
				}

				packages[path] = [packageDescriptor, {
					locateFileInPackage: function(descriptor, id, callback) {
						var idParts = id.split("/");
						return resolvePackageId(idParts[0], function(err, aliasedPackagePath, aliasdPackageDescriptor, packageExtras) {
							if (err) return callback(err);
							try {
								if (!packageDescriptor.memoized.mappings) {
									packageDescriptor.memoized.mappings = {};
								}
								packageDescriptor.memoized.mappings[idParts[0]] = aliasdPackageDescriptor.id;

								var modulePath = null;
								var memoizeId = null;
								if (idParts.length > 1) {
									if (
										aliasdPackageDescriptor.combined.config &&
										aliasdPackageDescriptor.combined.config.directories &&
										aliasdPackageDescriptor.combined.config.directories.lib
									) {
										idParts[1] = aliasdPackageDescriptor.combined.config.directories.lib.replace(/^\.\//, "") + "/" + idParts[1];
									}
									modulePath = PATH.join(aliasedPackagePath, normalizeExtension(idParts[1]));
									memoizeId = aliasdPackageDescriptor.id + "/" + idParts[1];
								} else {
									if (
										!aliasdPackageDescriptor.combined.exports ||
										!aliasdPackageDescriptor.combined.exports.main
									) {
										throw new Error("`exports.main` must be set if no module specified when requiring package '" + id + "' from package '" + path + "'");
									}
									modulePath = PATH.join(aliasedPackagePath, aliasdPackageDescriptor.combined.exports.main);
									memoizeId = aliasdPackageDescriptor.id + aliasdPackageDescriptor.combined.exports.main.replace(/^\.|\.js$/, "");
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
				ASSERT.equal(typeof packageDescriptor.combined.exports, "object");
				ASSERT.equal(typeof packageDescriptor.combined.exports.main, "string");
				rootModule = packageDescriptor.combined.exports.main;
			}

			var opts = {};
			for (var name in options) {
				opts[name] = options[name];
			}
			opts.packageExtras = packageExtras || null;

			opts.finalizeBundle = function(bundleDescriptor, bundle, callback) {
				for (var packagePath in packages) {
					if (Object.keys(packages[packagePath][0].memoized).length > 0) {
						var pkgId = options.rootPackage || packages[packagePath][0].id || "";
						bundleDescriptor.modules[pkgId + "/package.json"] = {
							requireId: pkgId + "/package.json",
							memoizeId: pkgId + "/package.json",
							descriptor: packages[packagePath][0],
							wrapper: "json"
						};
						bundle.setModule(
							pkgId + "/package.json",
							JSON.stringify(packages[packagePath][0].memoized, null, 4),
							{
								file: null,
								mtime: 0,
								wrapper: "json",
								format: "json"
							}
						);
					}
				}
				return callback(null);
			}

			return exports.bundleFile(PATH.join(bundleFilePath, rootModule), opts, function(err, bundleDescriptor) {
				if (err) return callback(err);

				var bundleId = rootModule.replace(/^\.\//, "/");

				bundleDescriptor.id = bundleId;

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

		options._realpath = function(path) {
			if (!options.rootPath) return path;
			if (/^\//.test(path)) return path;
			return PATH.join(options.rootPath, path);
		}

		var bundleDescriptor = null;
		var bundle = null;
		var rootPackage = options.rootPackage || "";


		function realpath(path, callback) {
			return FS.exists(options._realpath(path), function(exists) {
				if (exists) return callback(null, path);
				if (typeof options.locateMissingFile === "function") {
					return options.locateMissingFile(null, path, callback);
				}
				return callback(new Error("Missing dependency '" + path + "'"));
			});
		}

		function init(bundleFilePath, callback) {
			bundleDescriptor = {
				modules: {},
				expectExistingModules: {},
				bundle: {
					path: PATH.join(options.distPath, options.distFilename || PATH.basename(bundleFilePath))
				},
				warnings: [],
				errors: []
			};
			return callback(null);
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

				var descriptor = {
					requireId: options.id,
					memoizeId: normalizeExtension(options.id),
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

					bundleDescriptor.modules[descriptor.memoizeId] = descriptor;

					bundle.setModule(
						descriptor.memoizeId,
						(descriptor.wrapper.code || [
							descriptor.wrapper.top,
							descriptor.descriptor.code,
							descriptor.wrapper.bottom
						].join("\n")),
						{
							file: filePath,
							mtime: moduleDescriptor.mtime,
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
			id = normalizeExtension(id);
			// Check for id relative to module.
			if (/^\./.test(id)) {
				return callback(null, PATH.join(descriptor.descriptor.filepath, "..", id), PATH.join(descriptor.requireId, "..", memoizeId));
			}
			function finalize(callback) {
				// Assume path is relative to bundle root module.
				return callback(null, PATH.join(descriptor.descriptor.filepath, "..", id), "/" + memoizeId);
			}
			// Resolve to package dependency.
			if (options.packageExtras && typeof options.packageExtras.locateFileInPackage === "function") {
				return options.packageExtras.locateFileInPackage(descriptor, memoizeId, function(err, path, memoizeId, packageExtras) {
					if (err) return callback(err);
					if (!path || !memoizeId) return finalize(callback);
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

		function addDynamic(path, memoizeId, options, callback) {
			options.distPath = PATH.join(options.distPath, PATH.basename(bundleFilePath.replace(/\.js$/, "")), PATH.dirname(memoizeId.replace(/^\//, "")));
			return exports.bundleFile(path, options, callback);
		}

		function bundleStaticallyLinkedFiles(filePath, options, callback) {

			if (bundleDescriptor.modules[options.id]) return callback(null);

			return addFile(filePath, options, function(err, descriptor) {
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
							descriptor.errors.push([
								"bundle-" + type, err.message, err.stack
							]);
						}
						return done(null);
					}
					return resolveModuleId(descriptor, id, options, function(err, path, memoizeId, packageExtras) {
						if (err) return callback(err);
						var opts = {};
						for (var key in options) {
							opts[key] = options[key];
						}
						opts.packageExtras = packageExtras || null;
						if (type === "static") {
							return addStatic(path, memoizeId, opts, callback);
						}
						if (options.forceMemoizeFiles && options.forceMemoizeFiles[normalizeExtension(memoizeId)]) {
							return addStatic(path, memoizeId, opts, callback);
						}
						return addDynamic(path, memoizeId, opts, callback);
					});
				}

				for (var id in descriptor.dependencies.static) {
					waitfor("static", id, addDependency);
				}
				for (var id in descriptor.dependencies.dynamic) {
					waitfor("dynamic", id, addDependency);
				}

				return waitfor();
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
					opts.id = rootPackage + "/" + PATH.basename(bundleFilePath).replace(/\.js/, "");

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
//										descriptor: 

//TODO: Set `bundleDescriptor` up top after we return from here. Use info from setModule to set `memoized`.

//										,
										wrapper: "json"
									};

//console.log("moduleDescriptor.memoizeId", rootPackage, moduleDescriptor.memoizeId);

									bundle.setModule(
										normalizeExtension(rootPackage + "/package.json"), JSON.stringify({
											main: moduleDescriptor.memoizeId
										}, null, 4), {
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
