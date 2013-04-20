
const PATH = require("path");
const ASSERT = require("assert");
const FS = require("fs-extra");
const BUNDLE = require("../lib/bundle");


describe('bundle', function() {

	it('should export `open()`', function() {
		ASSERT(typeof BUNDLE.open === "function");
	});

	describe('`open()`', function() {

		it('should open bundle without loader', function(done) {

			var options = {
				debug: true
			};
			return BUNDLE.open(PATH.join(__dirname, "assets/bundles/without-loader.js"), options, function(err, bundle) {
				if (err) return done(err);

				try {

					ASSERT(typeof bundle === "object");

console.log("bundle", bundle);


					return done(null);
				} catch(err) {
					return done(err);
				}
			});
		});

	});

});
