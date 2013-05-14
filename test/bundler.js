
const PATH = require("path");
const ASSERT = require("assert");
const WAITFOR = require("waitfor");
const GLOB = require("glob");
const Q = require("q");
const FS = require("fs-extra");
const BUNDLER = require("../lib/bundler");
const PINF_FOR_NODEJS = require("pinf-for-nodejs");


describe('bundler', function() {

	it('should export `bundleFile()`', function() {
		ASSERT(typeof BUNDLER.bundleFile === "function");
	});

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
//				"no-interface/*.js"
//				"requirejs/*.js",
//				"umd/*.js",
				"various/*.js"
			], function(err, files) {
				if (err) return done(err);

				var waitfor = WAITFOR.serial(done);
				files.forEach(function(file) {
					waitfor(function(done) {
						var basePath = PATH.join(__dirname, "../node_modules/pinf-it-module-insight/test/assets", PATH.dirname(file));
						var options = {
							debug: true,
							distPath: PATH.join(__dirname, "assets/modules", PATH.dirname(file)),
							locateMissingFile: function(descriptor, path, callback) {
//console.log("locate missing file", path);
								if (path.substring(0, basePath.length) !== basePath) {
									return callback(new Error("Cannot locate missing file '" + path + "'"));
								}
								return callback(null, PATH.join(options.distPath, "mocks", PATH.basename(file), path.substring(basePath.length+1).replace(/\//g, "+")));
							}
						};
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

								return PINF_FOR_NODEJS.sandbox(PATH.join(options.distPath, PATH.basename(file)), function(sandbox) {
									try {
										var result = sandbox.main();

console.log(options.distPath);
console.log("result", typeof result, result);
										function testResult(result) {
											try {

												if (typeof result === "function") {
													result = result();
												}

		console.log("result", typeof result, result);

												// Special case to stringify `requirejs/circular-a.js`.
												if (file === "requirejs/circular-a.js") {
													result.b.c.a = result.b.c.a.name;
												}


		console.log("result", JSON.stringify(result, null, 4));

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

});
