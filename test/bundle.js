
const PATH = require("path");
const ASSERT = require("assert");
const FS = require("fs-extra");
const BUNDLE = require("../lib/bundle");


describe('bundle', function() {

	it('should export `open()`', function() {
		ASSERT(typeof BUNDLE.open === "function");
	});

	it('should read and write bundle with loader', function(done) {
		var options = {
			debug: true
		};
		return BUNDLE.open(PATH.join(__dirname, "assets/bundles/with-loader.js"), options, function(err, bundle) {
			if (err) return done(err);
			try {
				ASSERT.equal(typeof bundle, "object");
				ASSERT.deepEqual(bundle.header, [ undefined, {} ]);
				ASSERT.deepEqual(Object.keys(bundle.descriptors), [ '/package.json' ]);
				ASSERT.deepEqual(Object.keys(bundle.modules), [ '/main.js' ]);
				ASSERT.equal(typeof bundle.report, "object");
				ASSERT.deepEqual(bundle.bundleLoader, [ true, { bundleUrlPrefix: '/bundles/' } ]);
				return done(null);
			} catch(err) {
				return done(err);
			}
		});
	});

	it('should read and write bundle with just modules', function(done) {
		var options = {
			debug: true
		};
		return BUNDLE.open(PATH.join(__dirname, "assets/bundles/just-modules.js"), options, function(err, bundle) {
			if (err) return done(err);
			try {
				ASSERT.equal(typeof bundle, "object");
				ASSERT.deepEqual(bundle.header, [ undefined, {} ]);
				ASSERT.deepEqual(Object.keys(bundle.descriptors), [
					'/package.json',
					'9600bb1b572fba81a38e7d3c0eb638268e6a9d8d/package.json',
					'80b6bcb59fc2b65675648d0e052b75b4620764ee/package.json',
					'aa0b8cfbcfff960996a8692caee6ae43f33d6a67/package.json'
				]);
				ASSERT.deepEqual(Object.keys(bundle.modules), [
					'/main.js',
					'9600bb1b572fba81a38e7d3c0eb638268e6a9d8d/greetings.js',
					'9600bb1b572fba81a38e7d3c0eb638268e6a9d8d/logger.js',
					'80b6bcb59fc2b65675648d0e052b75b4620764ee/words/hello.js',
					'aa0b8cfbcfff960996a8692caee6ae43f33d6a67/H.js'
				]);
				ASSERT.equal(typeof bundle.report, "object");
				ASSERT.deepEqual(bundle.bundleLoader, [ false, {} ]);
				return done(null);
			} catch(err) {
				return done(err);
			}
		});
	});

	it('should read and write bundle with header', function(done) {
		var options = {
			debug: true
		};
		return BUNDLE.open(PATH.join(__dirname, "assets/bundles/with-header.js"), options, function(err, bundle) {
			if (err) return done(err);
			try {
				ASSERT.equal(typeof bundle, "object");
				ASSERT.equal(Array.isArray(bundle.header), true);
				ASSERT.equal(typeof bundle.header[0], "string");
				ASSERT.deepEqual(Object.keys(bundle.descriptors), [ '/package.json' ]);
				ASSERT.deepEqual(Object.keys(bundle.modules), [ '/main.js', '/greeting.js' ]);
				ASSERT.equal(typeof bundle.report, "object");
				ASSERT.deepEqual(bundle.bundleLoader, [ false, {} ]);
				return done(null);
			} catch(err) {
				return done(err);
			}
		});
	});

});
