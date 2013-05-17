
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

		if (descriptor.descriptor.syntax === "javascript") {

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

				// Cleanup `define` call using r.js
				return wrapAMD(descriptor, function(err) {
					if (err) return callback(err);

					// If the `define` wrapped call needs an AMD-style `require` we provide it
					// if it is not declared.
					if (descriptor.descriptor.globals["require"] && !descriptor.descriptor.dependencies.static["require"]) {
						descriptor.wrapper.type = "amd-ish";
						descriptor.wrapper.code = [
							"wrapAMD(function(require, define) {",
							descriptor.wrapper.code,
							"})"
						].join("\n");
					}
					return callback(null);
				});

			} else
			// `<code> define(`
			// `define(<id>, function() {`
			// `define("<id>", [<dep>], function() {`
			// `define(<id>, [<dep>], function() {`
			// `define([<dep>], function() {`
			if (descriptor.descriptor.format === "amd-ish") {

				// These dependencies don't need to be followed as they are handled by the AMD header.
				delete descriptor.dependencies.static.require;
				delete descriptor.dependencies.static.exports;
				delete descriptor.dependencies.static.module;

				// The `define()` wrapper is part of `descriptor.code` as it could not be stripped safely.
				// We write a `defineish()` wrapper that declares a `define` function
				// used to intercept id and dependency declarations.

				descriptor.wrapper.type = "amd-ish";
				descriptor.wrapper.top = "wrapAMD(function(require, define) {";
				descriptor.wrapper.bottom = "})";

			} else
			if (descriptor.descriptor.format === "commonjs") {

				descriptor.wrapper.type = "commonjs";
				descriptor.wrapper.top = "function(require, exports, module) {";
				descriptor.wrapper.bottom = "}";

			} else
			if (descriptor.descriptor.format === "leaky") {

				// We wrap code to export all leaked globals.
				var exports = [];
				for (var name in descriptor.descriptor.globals) {
					exports.push("    " + name + ": " + name);
				}
				descriptor.wrapper.type = "commonjs/leaky";
				descriptor.wrapper.top = "function(require, exports, module) {";
				descriptor.wrapper.bottom = "return {\n" + exports.join(",\n") + "\n};\n}";

			} else
			if (descriptor.descriptor.format === "encapsulated") {

				// We wrap module even though we cannot penetrate it.
				descriptor.wrapper.type = "commonjs/encapsulated";
				descriptor.wrapper.top = "function(require, exports, module) {";
				descriptor.wrapper.bottom = "}";

			} else {
				return callback(new Error("Unrecognized format '" + descriptor.descriptor.format + "' for syntax '" + descriptor.descriptor.syntax + "'"));
			}

		} else
		if (descriptor.descriptor.syntax === null) {

			if (descriptor.descriptor.format === "utf8") {

				descriptor.wrapper.type = "url-encoded";
				descriptor.wrapper.code = "'" + encodeURIComponent(descriptor.descriptor.code).replace(/'/g, "\\'") + "'";

			} else {
				return callback(new Error("Unrecognized format '" + descriptor.descriptor.format + "' for syntax '" + descriptor.descriptor.syntax + "'"));
			}

		} else {
			return callback(new Error("Unrecognized syntax '" + descriptor.descriptor.syntax + "'"));
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
		    '        dependencies = ["require", "exports", "module"];',
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
	        '                var apis = [];',
	        '                var callback = arguments[1];',
	        '                id.forEach(function(moduleId, index) {',
	        '                    realRequire.async(moduleId, function(api) {',
	        '                        apis[index] = api',
	        '                        if (apis.length === id.length) {',
	        '                            if (callback) callback.apply(null, apis);',
	        '                        }',
	        '                    }, function(err) {',
	        '                        throw err;',
	        '                    });',
	        '                });',
	        '            } else {',
	        '                return realRequire(id.replace(/^[^!]*!/, ""));',
	        '            }',
	        '        }',
	        '        require.toUrl = function(id) {',
	        '            return realRequire.sandbox.id.replace(/\\/[^\\/]*$/, "") + realRequire.id(id);',
	        '        }',
	        '        if (typeof amdRequireImplementation !== "undefined") {',
	        '            amdRequireImplementation = require;',
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
		    'define.amd = { jQuery: true };'
		].join("\n");
	} else
	if (type === "amd-ish") {
		return [
			'var amdRequireImplementation = null;',
		    'function wrapAMD(callback) {',
		    exports.headerForWrapper("amd").split("\n").map(function(line) {
		    	return "    " + line;
		    }).join("\n"),
		    '    var exports = null;',
		    '    function wrappedDefine() {',
		    '        exports = define.apply(null, arguments);',
		    '    }',
		    '    function amdRequire() {',
		    '        return amdRequireImplementation.apply(null, arguments);',
		    '    }',
		    '    wrappedDefine.amd = { jQuery: true };',
		    '    callback(amdRequire, wrappedDefine);',
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
			return callback(null);
        } catch (err) {
        	return callback(err);
        }
	});
}
