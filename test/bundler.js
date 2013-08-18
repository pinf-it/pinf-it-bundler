
const PATH = require("path");
const ASSERT = require("assert");
const WAITFOR = require("waitfor");
const GLOB = require("glob");
const Q = require("q");
const FS = require("fs-extra");
const BUNDLER = require("../lib/bundler");
const RT_BUNDLER = require("../lib/rt-bundler");
const PINF_FOR_NODEJS = require("pinf-for-nodejs");

const MODE = "test";
//const MODE = "write";

const DEBUG = false;

describe('bundler', function() {

	it('should export `bundleFile()`', function() {
		ASSERT(typeof BUNDLER.bundleFile === "function");
	});

	it('should export `bundlePackage()`', function() {
		ASSERT(typeof BUNDLER.bundlePackage === "function");
	});

	describe('`bundleFile()`', function() {
		this.timeout(10 * 1000);

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
						var rootPath = PATH.dirname(__dirname);
						var relPath = PATH.join("node_modules/pinf-it-module-insight/test/assets", PATH.dirname(file));
						var basePath = PATH.join(rootPath, relPath);
						var options = {
							debug: DEBUG,
							test: true,
							rootPath: rootPath,
							distPath: PATH.join("test/assets/modules", PATH.dirname(file)),
							locateMissingFile: function(descriptor, path, callback) {
								if (path.substring(0, relPath.length) !== relPath) {
									return callback(new Error("Cannot locate missing file '" + path + "'"));
								}
								return callback(null, PATH.join(options.distPath, "mocks", PATH.basename(file), path.substring(relPath.length+1).replace(/\//g, "+")));
							}
						};
						// Special case to prevent dynamic link and bundle it statically instead.
						// This is not mandatory but used as a test here.
						if (file === "various/amd-dynamic-link.js") {
							options.forceMemoizeFiles = {
								"/base.js": PATH.join(relPath, "base.js")
							};
						}
						return BUNDLER.bundleFile(PATH.join(relPath, PATH.basename(file)), options, function(err, descriptor) {
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
									rootPath: rootPath,
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
													var resultPath = PATH.join(rootPath, options.distPath, "results", PATH.basename(file));
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

										if (Q.isPromiseAlike(result)) {
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

	describe('`bundlePackage()`', function() {

		this.timeout(10 * 1000);

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
				"packages/nodejs-dynamic-require-nested",
				"packages/nodejs-dynamic-require-pkg",
				"packages/commonjs-lib",
				"packages/nodejs-dynamic-require-complex",
				"packages/nodejs-built-in"
			], function(err, files) {
				if (err) return done(err);

				var waitfor = WAITFOR.serial(done);
				files.forEach(function(file) {
					waitfor(function(done) {
						var rootPath = PATH.dirname(__dirname);
						var relPath = PATH.join("test/assets", file);
						var basePath = PATH.join(rootPath, relPath);
						var distPath = PATH.join(relPath, ".dist");

						var buffer = [];
						var result = null;

						var lastBundlePath = null;
						var options = {
							debug: DEBUG,
							test: !DEBUG,
							rootPath: rootPath,
							distPath: distPath,
							onRun: function(bundlePath, sandboxOptions, callback) {
								sandboxOptions.globals = {
									console: {
										log: function(message) {
											buffer.push(message);
//											if (DEBUG) console.log(["[log]"].concat(arguments));
										}
									}
								};
								PINF_FOR_NODEJS.reset();
								lastBundlePath = bundlePath;
								return PINF_FOR_NODEJS.sandbox(bundlePath, sandboxOptions, function(sandbox) {
									try {
										result = sandbox.main();
									} catch(err) {
										return callback(err);
									}
									return callback();
								}, callback);
							},
							getLoaderReport: function() {
								return PINF_FOR_NODEJS.getReport();
							}
						};
						FS.removeSync(options.distPath);
						RT_BUNDLER.bundlePackage(relPath, options, function(err, bundleDescriptors) {
							if (err) return done(err);
							function testResult(result) {
								try {
									if (typeof result === "function") {
										result = result();
									}
									var keys = null;
									if (typeof result === "object") {
										keys = Object.keys(result);
									}
									result = JSON.parse(JSON.stringify(result));
									if (keys) {
										keys.forEach(function(name) {
											if (typeof result[name] === "undefined") {
												result[name] = {};
											}
										});
									}

//console.log(JSON.stringify(PINF_FOR_NODEJS.getReport().sandboxes, null, 4));
									if (MODE === "test") {
										ASSERT.deepEqual(bundleDescriptors, JSON.parse(FS.readFileSync(PATH.join(basePath, ".result/bundle-descriptors.json"))));
										ASSERT.deepEqual(buffer, JSON.parse(FS.readFileSync(PATH.join(basePath, ".result/console.json"))));
										ASSERT.deepEqual(result, JSON.parse(FS.readFileSync(PATH.join(basePath, ".result/api.json"))));
										ASSERT.deepEqual(
											PINF_FOR_NODEJS.getReport().sandboxes,
											JSON.parse(FS.readFileSync(PATH.join(basePath, ".result/loader-report.json")))
										);
									} else {
										FS.outputFileSync(PATH.join(basePath, ".result/bundle-descriptors.json"), JSON.stringify(bundleDescriptors, null, 4));
										FS.writeFileSync(PATH.join(basePath, ".result/console.json"), JSON.stringify(buffer, null, 4));
										FS.writeFileSync(PATH.join(basePath, ".result/api.json"), JSON.stringify(result, null, 4));
										FS.writeFileSync(PATH.join(basePath, ".result/loader-report.json"), JSON.stringify(PINF_FOR_NODEJS.getReport().sandboxes, null, 4));
									}

									// Now that bundling was successful, run the bundled program.

									buffer = [];
									result = null;
									PINF_FOR_NODEJS.reset();

									return PINF_FOR_NODEJS.sandbox(lastBundlePath, {
										globals: {
											console: {
												log: function(message) {
													buffer.push(message);
												}
											}
										}
									}, function(sandbox) {
										try {
											result = sandbox.main();
										} catch(err) {
											return done(err);
										}
										if (typeof result === "function") {
											result = result();
										}
										var keys = null;
										if (typeof result === "object") {
											keys = Object.keys(result);
										}
										result = JSON.parse(JSON.stringify(result));
										if (keys) {
											keys.forEach(function(name) {
												if (typeof result[name] === "undefined") {
													result[name] = {};
												}
											});
										}

										ASSERT.deepEqual(buffer, JSON.parse(FS.readFileSync(PATH.join(basePath, ".result/console.json"))));
										ASSERT.deepEqual(result, JSON.parse(FS.readFileSync(PATH.join(basePath, ".result/api.json"))));
										ASSERT.deepEqual(
											PINF_FOR_NODEJS.getReport().sandboxes,
											JSON.parse(FS.readFileSync(PATH.join(basePath, ".result/loader-report.json")))
										);
										return done();
									}, done);
								} catch(err) {
									return done(err);
								}
							}
							if (Q.isPromise(result)) {
								return result.then(testResult, done);
							} else {
								return testResult(result);
							}
						});
					});
				});
			});
		});
	});
});
