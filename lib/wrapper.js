
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

			// These dependencies don't need to be followed as they are handled by the AMD header.
			delete descriptor.dependencies.static.require;
			delete descriptor.dependencies.static.exports;
			delete descriptor.dependencies.static.module;

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
			descriptor.wrapper.top = "importDefine(function(define) {";
			descriptor.wrapper.bottom = "})";

			// These dependencies don't need to be followed as they are handled by the AMD header.
			delete descriptor.dependencies.static.require;
			delete descriptor.dependencies.static.exports;
			delete descriptor.dependencies.static.module;

		} else
		if (descriptor.descriptor.format === "utf8") {

			descriptor.wrapper.type = "utf8";
			descriptor.wrapper.code = "'" + encodeURIComponent(descriptor.descriptor.code).replace(/'/g, "\\'") + "'";

		} else
		if (descriptor.descriptor.format === "commonjs") {

			descriptor.wrapper.type = "commonjs";
			descriptor.wrapper.top = "function(require, exports, module) {";
			descriptor.wrapper.bottom = "}";

		} else {

			return callback(new Error("Unrecognized format '" + descriptor.descriptor.format + "'"));

		}

		return callback(null);

	} catch(err) {
		return callback(err);
	}
}

exports.headerForWrapper = function(type) {
	if (type === "amd") {
		return [
		    'function define(id, dependencies, moduleInitializer) {',
		    '    if (typeof dependencies === "undefined" && typeof moduleInitializer === "undefined") {',
		    '        if (typeof id === "function") {',
		    '            moduleInitializer = id;',
		    '        } else {',
		    '            var exports = id;',
		    '            moduleInitializer = function() { return exports; }',
		    '        }',
		    '        dependencies = [];',
		    '        id = null;',
		    '    } else',
		    '    if (Array.isArray(id) && typeof dependencies === "function" && typeof moduleInitializer === "undefined") {',
		    '        moduleInitializer = dependencies;',
		    '        dependencies = id;',
		    '        id = null;',
		    '    } else',
		    '    if (typeof id === "string" && typeof dependencies === "function" && typeof moduleInitializer === "undefined") {',
		    '        moduleInitializer = dependencies;',
		    '        dependencies = ["require", "exports", "module"];',
		    '    }',
		    '    return function(realRequire, exports, module) {',
	        '        function require(id) {',
	        '            if (Array.isArray(id)) {',
	        '                var loaded = id.length;',
	        '                var apis = [];',
	        '                id.forEach(function(id, index) {',
	        	'console.log("INDEX", typeof index, index);',
	        '                    realRequire.async(id, function(api) {',
	        '                        apis[index] = api',
	        '   console.log("LENGTH", apis.length); ',
	        '                ',
	        '                    }, function(err) {',
	        '                        throw err;',
	        '                    });',
	        '                });',
	        '            }',
	        '            return realRequire(id.replace(/^[^!]*!/, ""));',
	        '        }',
	        '        require.toUrl = function(id) {',
	        '            return realRequire.sandbox.id.replace(/\\/[^\\/]*$/, "") + realRequire.id(id);',
	        '        }',
	        // @see http://requirejs.org/docs/api.html#cjsmodule
		    '        if (typeof moduleInitializer === "function") {',
		    '            return moduleInitializer.apply(moduleInitializer, dependencies.map(function(name) {',
		    '                if (name === "require") return require;',
		    '                if (name === "exports") return exports;',
		    '                if (name === "module") return module;',
		    '                return require(name);',
		    '            }));',
		    '        } else',
		    // @see http://requirejs.org/docs/api.html#defsimple
	        '        if (typeof dependencies === "object") {',
	        '            return dependencies;',
	        '        }',
		    '    }',
		    '}',
		    'define.amd = true;'
		].join("\n");
	} else
	if (type === "amd-ish") {
		return [
		    'function importDefine(callback) {',
		    exports.headerForWrapper("amd").split("\n").map(function(line) {
		    	return "    " + line;
		    }).join("\n"),
		    '    var exports = null;',
		    '    function wrappedDefine() {',
		    '        exports = define.apply(null, arguments);',
		    '    }',
		    '    wrappedDefine.amd = true;',
		    '    callback(wrappedDefine);',
		    '    return exports;',
		    '}'
		].join("\n");
	}
	return null;
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
