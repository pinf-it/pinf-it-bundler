
const ASSERT = require("assert");
const FS = require("fs-extra");


exports.bundleFile = function(filePath, options, callback) {
	try {

		ASSERT.equal(typeof options, "object");
		ASSERT.equal(typeof options.distPath, "string");

		var descriptor = {
			warnings: [],
			errors: []
		};

		if (options.debug) console.log("Parse file:", filePath);




		return callback(null, descriptor);

	} catch(err) {
		return callback(err);
	}
}
