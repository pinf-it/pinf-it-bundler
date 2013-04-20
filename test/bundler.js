
const PATH = require("path");
const ASSERT = require("assert");
const WAITFOR = require("waitfor");
const GLOB = require("glob");
const FS = require("fs-extra");
const BUNDLER = require("../lib/bundler");


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
return done(null);
			return getFiles([
//				"umd/*.js",
				"various/*.js",
//				"no-interface/*.js"
			], function(err, files) {
				if (err) return done(err);

				var waitfor = WAITFOR.serial(done);
				files.forEach(function(file) {
					waitfor(function(done) {
						var options = {
							debug: true,
							distPath: PATH.join(__dirname, "assets/modules/", file)
						};
						return BUNDLER.bundleFile(PATH.join(__dirname, "../node_modules/pinf-it-module-insight/test/assets"), options, function(err, descriptor) {
							if (err) return done(err);

							try {

								ASSERT(typeof descriptor === "object");

console.log("descriptor", descriptor);

								if (descriptor.errors.length > 0) {
									descriptor.errors.forEach(function(error) {
										var err = new Error("Got '" + error[0] + "' error '" + error[1] + "' for file '" + PATH.join("assets", file) + "'");
										err.stack = error[2];
										throw err;
									});
								}

// TODO: Execute module and check for STRING and OBJECT exports.

								return done(null);
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
