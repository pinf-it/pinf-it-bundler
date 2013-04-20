
const ASSERT = require("assert");
const PATH = require("path");
const FS = require("fs-extra");


const LOADER_PATH = require.resolve("pinf-loader-js/loader.js");


exports.open = function(filePath, options, callback) {
	try {
		options = options || {};

		if (options.debug) console.log("Open bundle:", filePath);

		var bundle = new Bundle(filePath);

		return bundle.open(function(err) {
			if (err) return callback(err);

			return callback(null, bundle);
		});
	} catch(err) {
		return callback(err);
	}
}


function Bundle(path) {
    this.path = path;
    this.reset();
}

Bundle.prototype.reset = function() {
	if (this.fd) {
		try {
			FS.closeSync(this.fd);
		} catch(err) {}
	}
    this.fd = null;
    this.header = ["", {}];
    this.descriptors = {};
    this.modules = {};
    this.report = {};
    this.bundleLoader = [false, {}];
}

Bundle.prototype.saveTo = function(filePath, callback) {
	var self = this;
	var bundle = new Bundle(filePath);
	return bundle.open(function(err) {
		if (err) return callback(err);
	    bundle.header = self.header;
	    bundle.descriptors = self.descriptors;
	    bundle.modules = self.modules;
	    bundle.report = self.report;
	    bundle.bundleLoader = self.bundleLoader;
	    return bundle.save(function(err) {
	    	if (err) return callback(err);
		    return bundle.close(callback);
	    });
	});
}

Bundle.prototype.open = function(done) {
    var self = this;
    if (self.fd) return callback(new Error("Cannot open. Bundle already open. Call `close()` first."));
    function callback(err) {
    	if (err) self.reset();
    	return done.apply(null, arguments);
    }
    return FS.exists(self.path, function(exists) {
    	if (!exists) {
    		FS.writeFileSync(self.path, "");
    	}
	    return FS.open(self.path, "rs+", function(err, fd) {
	    	if (err) return callback(err);

	    	self.fd = fd;

			return FS.fstat(self.fd, function(err, stats) {
				if (err) return callback(err);

				if (stats.size === 0) {
					return callback(null);
				}

		    	var buffer = new Buffer(stats.size);

		    	return FS.read(self.fd, buffer, 0, stats.size, 0, function(err, bytesRead, buffer) {
		    		if (err) return callback(err);
		    		if (bytesRead !== buffer.length || bytesRead !== stats.size) {
		    			return callback(new Error("Did not read entire file"));
		    		}

		    		return self.parseCode(buffer.toString("utf8"), callback);
		    	});
			});
		});
	});
}

Bundle.prototype.close = function(callback) {
	var self = this;
    if (!self.fd) return callback(new Error("Cannot close. Bundle not open. Call `open()` first."));
    return FS.close(self.fd, function(err) {
    	if (err) return callback(err);
        self.fd = null;
        return callback(null);
    });
}

Bundle.prototype.parseCode = function(code, callback) {
    var self = this;
    try {
        var codeParts = code.split(/(?:^|\n)\s*\/\/\s*@(pinf-bundle-[^:]*)\s*:/);
        var i;
        var sectionParts;
        for (i = 1 ; i < (codeParts.length-1) ; i += 2) {
            sectionParts = codeParts[i+1].match(/^\s*([^\n]*)\s*(\n([\S\s]*))?$/);

            if (codeParts[i] === "pinf-bundle-ignore") {
                // Ignore.
            } else
            if (codeParts[i] === "pinf-bundle-header") {
                self.setBundleHeader(sectionParts[3], JSON.parse(sectionParts[1]));
            } else
            if (codeParts[i] === "pinf-bundle-loader") {
                self.setBundleLoader(true, JSON.parse(sectionParts[1]));
            } else
            if (codeParts[i] === "pinf-bundle-module") {
                self.setModule(null, sectionParts[3].match(/^.*\n([\s\S]+)\n.*$/)[1], JSON.parse(sectionParts[1]));
            } else
            if (codeParts[i] === "pinf-bundle-descriptor") {
                self.setDescriptor(null, sectionParts[3].match(/^.*\n([\s\S]+)\n.*$/)[1], JSON.parse(sectionParts[1]));
            } else
            if (codeParts[i] === "pinf-bundle-report") {
                self.setReport(JSON.parse(sectionParts[1]));
            } else {
                throw new Error("Found unknown section type '" + codeParts[i] + "'!");
            }
        }
        return callback(null);
    } catch(err) {
    	return callback(err);
    }
}

Bundle.prototype.setBundleLoader = function(flag, info) {
    this.bundleLoader = [flag, info || {}];
}

Bundle.prototype.setBundleHeader = function(code, info) {
    this.header = [code, info || {}];
}

Bundle.prototype.setDescriptor = function(id, code, info) {
    id = id || info.id;
    info.id = id;
    this.descriptors[id] = [code, info];
}

Bundle.prototype.setModule = function(id, code, info) {
    id = id || info.id;
    info.id = id;
    this.modules[id] = [code, info];
}

Bundle.prototype.setReport = function(obj) {
    this.report = obj;
}

Bundle.prototype.save = function(callback) {
    var self = this;

    if (!this.fd) return callback(new Error("Cannot save. Bundle is not open. Call `open()` first."));

    function generateCode(callback) {

	    var code = [];

        function writeLoader(callback) {

        	if (self.bundleLoader[0] !== true) {

        		writePayload();

        		return callback(null);
        	}

        	code = code.concat([
                '// @pinf-bundle-loader: ' + JSON.stringify(self.bundleLoader[1]),
                'var require, sourcemint;',
                '(function() {',
                '    var rootBundleLoader = function(uri, loadedCallback) {'
            ]);

            writePayload();

            code = code.concat([
                '// @pinf-bundle-ignore: ',
                '        if (typeof loadedCallback === "function") loadedCallback();',
                '    }',
                '    function initLoader(exports) {'
            ]);

            return FS.readFile(LOADER_PATH, "utf8", function (err, loaderCode) {
            	if (err) return callback(err);

            	code.push(loaderCode);

                if (typeof self.bundleLoader[1].platformLoaderSource === "function") {

                	return self.bundleLoader[1].platformLoaderSource(function(err, platformCode) {
                		if (err) return callback(err);

                        code = code.concat([
                            '    };',
                            '    if (typeof sourcemint === "undefined") {',
                            '        sourcemint = {};',
                            '        var LOADER_INJECTED = {};',
                            '        initLoader(LOADER_INJECTED);',
                            '        (function(require, exports) {',
                            '            ' + platformCode,
                            '        })(require, sourcemint);',
                            '        var platformRequire = require;',
                            '        var isMain = ((platformRequire && platformRequire.main === module)?true:false);',
                            '        require = LOADER_INJECTED.require;',
                            '        sourcemint.bundle = require.bundle;',
                            '        sourcemint.sandbox(((typeof __dirname !== "undefined")?__dirname:".") + "/' + ((self.bundleLoader[1].bundleUrlPrefix)?"/{host}"+self.bundleLoader[1].bundleUrlPrefix:"") + PATH.basename(self.path) + '", function(sandbox) {',
                            '            if (typeof exports === "object") {',
                            '                var mainExports = sandbox.boot();',
                            '                if (typeof mainExports === "function") {',
                            '                    module.exports = mainExports;',
                            '                } else {',
                            '                    for (var key in mainExports) {',
                            '                        exports[key] = mainExports[key];',
                            '                    }',
                            '                }',
                            '            } else {',
                            '                sandbox.main();',
                            '            }',
                            '        }, {',
                            '            rootBundleLoader: rootBundleLoader,',
                            '            isMain: isMain',
                            '        });',
                            '    } else {',
                            '        rootBundleLoader();',
                            '    }',
                            '})();',
                        ]);

						return callback(null);
                	});

                } else {
                    code = code.concat([
                        '    };',
                        '    if (typeof sourcemint === "undefined") {',
                        '        var exports = {};',
                        '        initLoader(exports);',
                        '        sourcemint = exports.require;',
                        '        if (!require) require = sourcemint;',
                        '        sourcemint.sandbox("' + ((self.bundleLoader[1].bundleUrlPrefix)?"/{host}"+self.bundleLoader[1].bundleUrlPrefix:"") + PATH.basename(self.path) + '", function(sandbox) {',
                        '            sandbox.main();',
                        '        }, {',
                        '            rootBundleLoader: rootBundleLoader',
                        '        });',
                        '    } else {',
                        '        rootBundleLoader();',
                        '    }',
                        '})();'                  
                    ]);

					return callback(null);
                }
            });
        }

        function writePayload() {
            code.push('// @pinf-bundle-ignore: \nsourcemint.bundle("", function(require) {');

            code.push('// @pinf-bundle-header: ' + JSON.stringify(self.header[1]));
            code.push(self.header[0]);

            for (var key in self.modules) {
                code.push('// @pinf-bundle-module: ' + JSON.stringify(self.modules[key][1]));
                code.push('require.memoize("' + key + '", ');
                code.push(self.modules[key][0]);
                code.push(');');
            }

            for (var key in self.descriptors) {
                code.push('// @pinf-bundle-descriptor: ' + JSON.stringify(self.descriptors[key][1]));
                code.push('require.memoize("' + key + '", ');
                code.push(self.descriptors[key][0]);
                code.push(');');
            }

            code.push('// @pinf-bundle-ignore: \n});');
        }
        
        function writeFooter() {
            code.push('// @pinf-bundle-report: ' + JSON.stringify(self.report));
        }

        return writeLoader(function(err) {
        	if (err) return callback(err);

        	writeFooter();

        	return callback(null, code);
        });
    }

	return generateCode(function(err, code) {
		if (err) return callback(err);

		code = code.join("\n");

		var buffer = new Buffer(code, "utf8");

	    return FS.ftruncate(self.fd, 0, function(err) {
	    	if (err) return callback(err);

            return FS.write(self.fd, buffer, 0, buffer.length, 0, function(err, written, buffer) {
            	if (err) return callback(err);
            	if (written !== buffer.length) return callback(new Error("Did not write entire buffer to file."));
            	return callback(null);
            });
	    });
	});
}
