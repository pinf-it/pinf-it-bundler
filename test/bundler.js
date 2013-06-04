
const PATH = require("path");
const ASSERT = require("assert");
const WAITFOR = require("waitfor");
const GLOB = require("glob");
const Q = require("q");
const FS = require("fs-extra");
const BUNDLER = require("../lib/bundler");
const PINF_FOR_NODEJS = require("pinf-for-nodejs");

const MODE = "test";
//const MODE = "write";

describe('bundler', function() {

	it('should export `bundleFile()`', function() {
		ASSERT(typeof BUNDLER.bundleFile === "function");
	});

	it('should export `bundlePackage()`', function() {
		ASSERT(typeof BUNDLER.bundlePackage === "function");
	});
/*
	describe('`bundleFile()`', function() {

		function getFiles(rules, callback) {
			var files = [];
			var waitfor = WAITFOR.serial(function(err) {
				if (err) return callback(err);
				return callback(null, files);
			});
			rules.forEach(function(rule) {
				waitfor(function(done) {
					return GLOB(rule, {
				        cwd: PATH.join(__dirname, "../node_modules/pinf-it-module-insight/test/assets")
				    }, function (err, paths) {
				        if (err) return done(err);
				        files = files.concat(paths);
				        return done(null);
				    });
				});
			});
		}

		it('should bundle various JavaScript files', function(done) {

			return getFiles([
				"no-interface/*.js",
				"requirejs/*.js",
				"umd/*.js",
				"various/*.js"
			], function(err, files) {
				if (err) return done(err);

				var waitfor = WAITFOR.serial(done);
				files.forEach(function(file) {
					waitfor(function(done) {
						var basePath = PATH.join(__dirname, "../node_modules/pinf-it-module-insight/test/assets", PATH.dirname(file));
						var options = {
							//debug: true,
							distPath: PATH.join(__dirname, "assets/modules", PATH.dirname(file)),
							locateMissingFile: function(descriptor, path, callback) {
								if (path.substring(0, basePath.length) !== basePath) {
									return callback(new Error("Cannot locate missing file '" + path + "'"));
								}
								return callback(null, PATH.join(options.distPath, "mocks", PATH.basename(file), path.substring(basePath.length+1).replace(/\//g, "+")));
							}
						};
						// Special case to prevent dynamic link and bundle it statically instead.
						// This is not mandatory but used as a test here.
						if (file === "various/amd-dynamic-link.js") {
							options.forceMemoizeFiles = {
								"/base.js": PATH.join(basePath, "base.js")
							};
						}
						return BUNDLER.bundleFile(PATH.join(basePath, PATH.basename(file)), options, function(err, descriptor) {
							if (err) return done(err);

							try {

								ASSERT(typeof descriptor === "object");

								if (descriptor.errors.length > 0) {
									descriptor.errors.forEach(function(error) {
										var err = new Error("Got '" + error[0] + "' error '" + error[1] + "' for file '" + PATH.join("assets", file) + "'");
										err.stack = error[2];
										throw err;
									});
								}

								return PINF_FOR_NODEJS.sandbox(PATH.join(options.distPath, PATH.basename(file)), {
									globals: {
								    	// Fake common globals.
								    	window: {},
								    	console: {
											log: function(message) {}
										}
									}
								}, function(sandbox) {
									try {
										var result = sandbox.main();

										function testResult(result) {
											try {

												if (typeof result === "function") {
													result = result();
												}

												// Special case to stringify `requirejs/circular-a.js`.
												if (file === "requirejs/circular-a.js") {
													result.b.c.a = result.b.c.a.name;
												}

												result = JSON.parse(JSON.stringify(result));

												try {
													// See if `result` matches common test pattern.
													ASSERT.deepEqual(result, {
													    "STRING": "string-value",
													    "OBJECT": {
													        "id": "object-value"
													    }
													});
												} catch(err) {
													var resultPath = PATH.join(options.distPath, "results", PATH.basename(file));
													if (FS.existsSync(resultPath)) {
														var expectedResult = FS.readFileSync(resultPath).toString();
														expectedResult = expectedResult.replace(/\$DIST_PATH/g, options.distPath);
														ASSERT.deepEqual(result, JSON.parse(expectedResult));
													} else {
														throw err;
													}
												}
												return done(null);
											} catch(err) {
												return done(err);
											}
										}

										if (Q.isPromise(result)) {
											return result.then(testResult, done);
										} else {
											return testResult(result);
										}

									} catch(err) {
										return done(err);
									}
								}, done);

							} catch(err) {
								return done(err);
							}
						});
					});
				});
			});
		});
	});
*/

	describe('`bundlePackage()`', function() {

		function getFiles(rules, callback) {
			var files = [];
			var waitfor = WAITFOR.serial(function(err) {
				if (err) return callback(err);
				return callback(null, files);
			});
			rules.forEach(function(rule) {
				waitfor(function(done) {
					return GLOB(rule, {
				        cwd: PATH.join(__dirname, "assets")
				    }, function (err, paths) {
				        if (err) return done(err);
				        files = files.concat(paths);
				        return done(null);
				    });
				});
			});
		}

		it('should bundle various packages', function(done) {

			return getFiles([
				"packages/single",
				"packages/nodejs-multiple",
				"packages/nodejs-dynamic-require-simple",
				"packages/nodejs-dynamic-require-shared",
				"packages/commonjs-lib",
//				"packages/nodejs-dynamic-require-complex"
			], function(err, files) {
				if (err) return done(err);

				var waitfor = WAITFOR.serial(done);
				files.forEach(function(file) {
					waitfor(function(done) {
						var basePath = PATH.join(__dirname, "assets", file);
						var options = {
							//debug: true,
							distPath: PATH.join(basePath, ".dist")
						};
						FS.removeSync(options.distPath);

						var bundleDescriptors = {};

						return BUNDLER.bundlePackage(basePath, options, function(err, descriptor) {
							if (err) return done(err);

							bundleDescriptors[basePath] = descriptor;

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
								return done(err);
							}

							function runBundle() {

								var bundling = [];

								return Q.fcall(function() {

									var buffer = [];

									var deferred = Q.defer();
									var bundlePath = PATH.join(options.distPath, descriptor.exports.main);

									PINF_FOR_NODEJS.sandbox(bundlePath, {
										globals: {
											console: {
												log: function(message) {
													buffer.push(message);
												}
											}
										},
										// We encountered a dynamic sync require.
										resolveDynamic: function(pkg, sandbox, canonicalId, options) {
											var path = PATH.join(sandbox.id, canonicalId);
											if (!FS.existsSync(path)) {

												// TODO: Resolve `pkg.id` to source path by looking at `descriptor`.

												var filePath = PATH.join(__dirname, "assets", file, canonicalId);
												var options = {
													//debug: true,
													distPath: sandbox.id,
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
											return path;
										}
									}, function(sandbox) {
										try {
											var result = sandbox.main();

											function testResult(result) {
												try {

													if (typeof result === "function") {
														result = result();
													}

													result = JSON.parse(JSON.stringify(result));

													if (MODE === "test") {

														ASSERT.deepEqual(bundleDescriptors, JSON.parse(FS.readFileSync(PATH.join(basePath, ".result/bundle-descriptors.json"))));

														ASSERT.deepEqual(buffer, JSON.parse(FS.readFileSync(PATH.join(basePath, ".result/console.json"))));

														ASSERT.deepEqual(result, JSON.parse(FS.readFileSync(PATH.join(basePath, ".result/api.json"))));

														ASSERT.deepEqual(
															PINF_FOR_NODEJS.getReport().sandboxes[bundlePath.replace(/\.js$/, "")],
															JSON.parse(FS.readFileSync(PATH.join(basePath, ".result/loader-report.json")))
														);

													} else {

														FS.writeFileSync(PATH.join(basePath, ".result/bundle-descriptors.json"), JSON.stringify(bundleDescriptors, null, 4));

														FS.writeFileSync(PATH.join(basePath, ".result/console.json"), JSON.stringify(buffer, null, 4));

														FS.writeFileSync(PATH.join(basePath, ".result/api.json"), JSON.stringify(result, null, 4));

														FS.writeFileSync(PATH.join(basePath, ".result/loader-report.json"), JSON.stringify(PINF_FOR_NODEJS.getReport().sandboxes[bundlePath.replace(/\.js$/, "")], null, 4));

													}

													return deferred.resolve();
												} catch(err) {
													return deferred.reject(err);
												}
											}

											if (Q.isPromise(result)) {
												return result.then(testResult, deferred.reject);
											} else {
												return testResult(result);
											}

										} catch(err) {
											return deferred.reject(err);
										}
									}, deferred.reject);

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

							return runBundle().then(done, done);
						});
					});
				});
			});
		});
	});
});
