
const ASSERT = require("assert");
const PATH = require("path");
const FS = require("fs-extra");
const DEEPCOPY = require("deepcopy");
const WAITFOR = require("waitfor");
const MODULE_INSIGHT = require("pinf-it-module-insight");
const BUNDLE = require("./bundle");
const WRAPPER = require("./wrapper");


exports.bundleFile = function(filePath, options, callback) {
	try {

		ASSERT.equal(typeof options, "object");
		ASSERT.equal(typeof options.distPath, "string");

		var bundleDescriptor = null;
		var bundle = null;


		function init(filePath, callback) {
			bundleDescriptor = {
				modules: {},
				bundle: {
					path: PATH.join(options.distPath, PATH.basename(filePath))
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

		function addFile(filePath, fileOptions, callback) {
			return MODULE_INSIGHT.parseFile(filePath, options, function(err, moduleDescriptor) {
				if (err) return callback(err);

console.log("moduleDescriptor", moduleDescriptor);

				var descriptor = {
					id: fileOptions.id,
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

				return WRAPPER.wrapModule(descriptor, options, function(err) {
					if (err) return callback(err);

					var header = WRAPPER.headerForWrapper(descriptor.wrapper.type);
					if (header) {
						bundle.setHeader({
							helper: descriptor.wrapper.type
						}, header);							
					}

					bundle.setModule(
						normalizeExtension(descriptor.id),
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

		function normalizeExtension(pathid) {
			if (/(^|\/)[^\.]*$/.test(pathid)) {
				pathid += ".js";
			}
			return pathid;
		}

		function resolveModuleId(descriptor, id, callback) {
			var memoizeId = id;
			id = normalizeExtension(id);
			// Check for id relative to module.
			if (/^\./.test(id)) {
				return callback(null, PATH.join(descriptor.descriptor.filepath, "..", id), PATH.join(descriptor.id, "..", memoizeId));
			}
			// TODO: Resolve to package dependency.

			// Assume path is relative to bundle root module.
			return callback(null, PATH.join(descriptor.descriptor.filepath, "..", id), "/" + memoizeId);
		}

		function bundleStaticallyLinkedFiles(filePath, fileOptions, callback) {

			if (bundleDescriptor.modules[fileOptions.id]) return callback(null);

			return addFile(filePath, fileOptions, function(err, descriptor) {
				if (err) return callback(err);

				bundleDescriptor.modules[descriptor.id] = descriptor;

				var waitfor = WAITFOR.serial(function(err) {
					if (err) return callback(err);
					descriptor.warnings.forEach(function(warning) {
						bundleDescriptor.warnings.push([].concat(warning, "module", descriptor.id));
					});
					descriptor.errors.forEach(function(error) {
						bundleDescriptor.errors.push([].concat(error, "module", descriptor.id));
					});
					return callback(null, descriptor);
				});
				for (var id in descriptor.dependencies.static) {
					waitfor(id, function(id, done) {
						function callback(err) {
							if (err) {
								descriptor.errors.push([
									"bundle-static", err.message, err.stack
								]);
							}
							return done(null);
						}
						return resolveModuleId(descriptor, id, function(err, path, memoizeId) {
							if (err) return callback(err);

console.log("RESOLVED", id, "->", path, memoizeId);

							function realpath(path, callback) {
								return FS.exists(path, function(exists) {
									if (exists) return callback(null, path);
									if (typeof options.locateMissingFile === "function") {
										return options.locateMissingFile(descriptor, path, callback);
									}
									return callback(new Error("Missing static dependency '" + path + "' resolved from id '" + id + "'"));
								});
							}
							return realpath(path, function(err, path) {
								if (err) return callback(err);
								return bundleStaticallyLinkedFiles(path, {
									id: memoizeId
								}, callback);
							});
						});
					});
				}
				for (var id in descriptor.dependencies.dynamic) {
						function callback(err) {
							if (err) {
								descriptor.errors.push([
									"bundle-dynamic", err.message, err.stack
								]);
							}
							return done(null);
						}
						return resolveModuleId(descriptor, id, function(err, path, memoizeId) {
							if (err) return callback(err);

console.log("RESOLVED", id, "->", path, memoizeId);

							function realpath(path, callback) {
								return FS.exists(path, function(exists) {
									if (exists) return callback(null, path);
									if (typeof options.locateMissingFile === "function") {
										return options.locateMissingFile(descriptor, path, callback);
									}
									return callback(new Error("Missing static dependency '" + path + "' resolved from id '" + id + "'"));
								});
							}
							return realpath(path, function(err, path) {
								if (err) return callback(err);

console.log("BUNDLE DYNAMIC", path, memoizeId);
//								return bundleStaticallyLinkedFiles(path, {
//									id: memoizeId
//								}, callback);
							});
						});
				}
				return waitfor();
			});
		}

		function finalizeBundle(callback) {
			return bundle.save(function(err) {
				if (err) return callback(err);
				return bundle.close(function(err) {
					if (err) return callback(err);
					return callback(null);
				});
			});				
		}


		return init(filePath, function(err) {
			if (err) return callback(err);

			return openBundle(bundleDescriptor.bundle.path, function(err) {
				if (err) return callback(err);

				return bundleStaticallyLinkedFiles(filePath, {
					id: "/" + PATH.basename(filePath).replace(/\.js/, "")
				}, function(err, moduleDescriptor) {
					if (err) return callback(err);

					if (!bundleDescriptor.modules["/main"]) {
						bundle.setModule(
							normalizeExtension("/main"),
							[
								"function(require, exports, module) {",
								"  exports.main = function() {",
								"    return require('." + moduleDescriptor.id + "');",
								"  }",
								"}"
							].join("\n"),
							{
								file: "",
								mtime: 0,
								wrapper: "commonjs",
								format: "commonjs"
							}
						);
					}

					return finalizeBundle(function(err) {
						if (err) return callback(err);

						return callback(null, bundleDescriptor);
					});				
				});
			});
		});

	} catch(err) {
		return callback(err);
	}
}
