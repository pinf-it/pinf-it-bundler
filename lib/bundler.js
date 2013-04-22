
const ASSERT = require("assert");
const PATH = require("path");
const FS = require("fs-extra");
const MODULE_INSIGHT = require("pinf-it-module-insight");
const BUNDLE = require("./bundle");
const WRAPPER = require("./wrapper");


exports.bundleFile = function(filePath, options, callback) {
	try {

		ASSERT.equal(typeof options, "object");
		ASSERT.equal(typeof options.distPath, "string");

		var descriptor = {
			modules: {},
			bundle: {
				path: PATH.join(options.distPath, PATH.basename(filePath))
			},
			warnings: [],
			errors: []
		};

		return MODULE_INSIGHT.parseFile(filePath, options, function(err, moduleDescriptor) {
			if (err) return callback(err);

			descriptor.modules[filePath] = {
				// TODO: Set ID based on `options.id` or other
				id: moduleDescriptor.filename,
				descriptor: moduleDescriptor,
				wrapper: {
					type: null,
					top: null,
					code: null,
					bottom: null
				},
				warnings: [].concat(moduleDescriptor.warnings),
				errors: [].concat(moduleDescriptor.errors)
			};
			delete moduleDescriptor.warnings;
			delete moduleDescriptor.errors;

			return WRAPPER.wrapModule(descriptor.modules[filePath], options, function(err) {
				if (err) return callback(err);

				return BUNDLE.open(descriptor.bundle.path, options, function(err, bundle) {
					if (err) return callback(err);

					if (descriptor.modules[filePath].wrapper.type === "amd") {

						bundle.setHeader({
							helper: "amd"
						}, [
						    'function define(dependencies, moduleInitializer)',
						    '{',
						    '    return function(require, exports, module) {',
					        // @see http://requirejs.org/docs/api.html#cjsmodule
						    '        if (typeof moduleInitializer === "function") {',
						    '            return moduleInitializer.apply(moduleInitializer, dependencies.map(function(name) {',
						    '                if (name === "require") return require;',
						    '                if (name === "exports") return exports;',
						    '                if (name === "module") return module;',
						    '                return require(name);',
						    '            }))',
						    '        } else',
						    // @see http://requirejs.org/docs/api.html#defsimple
					        '        if (typeof dependencies === "object") {',
					        '            return dependencies;',
					        '        }',
						    '    }',
						    '}'
						].join("\n"));

					} else
					if (descriptor.modules[filePath].wrapper.type === "amd-ish") {

						bundle.setHeader({
							helper: "amd-ish"
						}, [
						    'function defineish()',
						    '{',
						    '    // TODO',
						    '}'
						].join("\n"));
					}

					bundle.setModule(
						descriptor.modules[filePath].id,
						(descriptor.modules[filePath].wrapper.code || [
							descriptor.modules[filePath].wrapper.top,
							descriptor.modules[filePath].descriptor.code,
							descriptor.modules[filePath].wrapper.bottom
						].join("\n")),
						{
							file: filePath,
							mtime: moduleDescriptor.mtime,
							wrapper: descriptor.modules[filePath].wrapper.type,
							format: moduleDescriptor.format
						}
					);

					return bundle.save(function(err) {
						if (err) return callback(err);
						return bundle.close(function(err) {
							if (err) return callback(err);
							return callback(null, descriptor);
						});
					});
				});
			});
		});

	} catch(err) {
		return callback(err);
	}
}
