

exports.wrapModule = function(descriptor, options, callback) {

	try {

//console.log("moduleDescriptor", descriptor);

		// `define(function() {`
		// `define("<id>", function() {`
		// `define("<id>", ["dep"], function() {`
		// `define(["dep"], function() {`
		if (descriptor.descriptor.format === "amd") {

			// The `define()` wrapper is not part of `descriptor.code` as it has been stripped.
			// We can write a clean `define()` wrapper.

			descriptor.wrapper.type = "amd";
			descriptor.wrapper.top = "define([], function() {";
			descriptor.wrapper.bottom = "})";

		} else
		// `<code> define(`
		// `define(<id>, function() {`
		// `define("<id>", [<dep>], function() {`
		// `define(<id>, [<dep>], function() {`
		// `define([<dep>], function() {`
		if (descriptor.descriptor.format === "amd-ish") {

			// The `define()` wrapper is part of `descriptor.code` as it could not be stripped safely.
			// We write a `defineish()` wrapper that declares a `define` function
			// used to intercept id and dependency declarations.

			descriptor.wrapper.type = "amd-ish";
			descriptor.wrapper.top = "defineish(function(define) {";
			descriptor.wrapper.bottom = "})";

		} else {

			// We fall back to the default CommonJS wrapper.

			descriptor.wrapper.type = "commonjs";
			descriptor.wrapper.top = "function(require, exports, module) {";
			descriptor.wrapper.bottom = "}";

		}

		return callback(null);

	} catch(err) {
		return callback(err);
	}
}

