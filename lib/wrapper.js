
const PATH = require("path");
const FS = require("fs-extra");
const REQUIREJS = require("requirejs");


REQUIREJS.config({
    nodeRequire: require,
	baseUrl: PATH.join(__dirname, "r.js/build/jslib")
});


exports.wrapModule = function(descriptor, options, callback) {

	try {

//console.log("moduleDescriptor", descriptor);

		// `define(function() {`
		// `define("<id>", function() {`
		// `define("<id>", ["dep"], function() {`
		// `define(["dep"], function() {`
		if (descriptor.descriptor.format === "amd") {

			// We can write a clean `define()` wrapper.
			descriptor.wrapper.type = "amd";
			return wrapAMD(descriptor, callback);

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


function wrapAMD(descriptor, callback) {

	return REQUIREJS(["transform"], function(TRANSFORM) {
        try {

			var code = TRANSFORM.toTransport(false, false, descriptor.descriptor.filepath, descriptor.descriptor.code, false, false);
    		descriptor.wrapper.code = code.replace(/;[\s\n]*$/, "");

/*
    		// TODO: Do this properly in the step above instead of replacing code below.
    		PARSE.findDependencies(path, originalCode).filter(function(name)
            {
                // We don't care about the CommonJS dependencies at this point.
                if (name === "require" || name === "exports" || name === "module") return false;

                // Look for certain plugin prefixes and remove.
                var m;
                if ((m = name.match(/^([^!]*)!(.*)$/)))
                {
                    if (m[1] === "text" ||
                        // HACK to get around: https://github.com/ajaxorg/ace/blob/88fe36238449f1b74b2014965a4ea408fcee6392/demo/kitchen-sink/demo.js#L136
                        // TODO: Relocate to a bundler plugin that resides with the ACE project.
                        m[1] === "ace/requirejs/text")
                    {
                        var re = new RegExp("(['\"]{1})" + escapeRegExp(name) + "(['\"]{1})", "g");
                        code = code.replace(re, "$1" + m[2] + "$2");
                    }
                }
                return true;
            });  
// @credit http://simonwillison.net/2006/Jan/20/escape/
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


    		var dependencies = PARSE.findDependencies(descriptor.filepath, descriptor.code);

console.log("dependencies", dependencies);

	        // TODO: Look for `require([])` separately. At the moment they get included below creating
	        //       a static link were we should really be creating a dynamic link.

	        dependencies.forEach(function(name) {
	            // Look for certain plugin prefixes and remove.
	            var m;
	            if ((m = name.match(/^([^!]*)!(.*)$/))) {
	                if (m[1] === "text") {
	                    descriptor.dependencies["static"][name] = {
	                        "id": m[2],
	                        // NOTE: By specifying how this module should be treated we instruct the bundler
	                        //       on how to store the module for ALL consumers. If two modules reference
	                        //       this same module once as a JS module and once as a text module whichever
	                        //       link was last found will determine how module will be treated. This most
	                        //       likely will break the application and should be avoided.
	                        //       If you don't require files ending with `.js` using `require("text!*.js")`
	                        //       this will never be a problem for you.
	                        "treatAs": "text"
	                    }
	                } else {
	                    throw new Error("The '" + m[1] + "' RequireJS plugin is not supported!");
	                }
	            } else {
	                descriptor.dependencies["static"][name] = name;
	            }
	        });
			return callback(null);
*/

			return callback(null);

        } catch (err) {
        	return callback(err);
        }
	});
}
