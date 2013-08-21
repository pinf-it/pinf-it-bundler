// @pinf-bundle-ignore: 
PINF.bundle("", function(require) {
// @pinf-bundle-module: {"file":"test/assets/packages/require-async-deep-pkg/extra.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"/extra.js"}
require.memoize("/extra.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/require-async-deep-pkg';

const PINF_MAIN = require("pinf-for-nodejs/lib/main").main;

exports.run = function(callback) {
    return PINF_MAIN(function(context, callback) {
        return callback(null, context);
    }, module, callback);
}

}
);
// @pinf-bundle-module: {"file":"test/assets/packages/require-async-deep-pkg/node_modules/pinf-for-nodejs/lib/main.js","mtime":0,"wrapper":"commonjs","format":"commonjs","id":"3d651410283fe41ff53775736a29d43f95b1f37f-pinf-for-nodejs/lib/main.js"}
require.memoize("3d651410283fe41ff53775736a29d43f95b1f37f-pinf-for-nodejs/lib/main.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/require-async-deep-pkg/node_modules/pinf-for-nodejs/lib';

require("require.async")(require);


exports.main = function(main, module, options, callback) {
	if (typeof module === "function" && typeof options === "undefined" && typeof callback === "undefined") {
		callback = module;
		module = null;
	}
	if (typeof options === "function" && typeof callback === "undefined") {
		callback = options;
		options = null;
	}

	options = options || {};

	function done(err) {
		if (callback) {
			try {
				return callback.apply(null, arguments);
			} catch(err) {
                console.error(err.stack);
	            process.exit(1);
			}
		}
        if (err) {
            if (err !== true) {
                console.error(err.stack);
            }
            process.exit(1);
        }
        process.exit(0);
	}
	if (!module) {
	    try {
			return main(done);
	    } catch(err) {
	        return done(err);
	    }		
	}
	// Don't call app unless it is the main file loaded or there is a callback registered.
	if (require.main !== module && !callback) {
		return;
	}

	// TODO: module.pinf should be set and memoized in bundle based on on the program context and available at `module.pinf`.
	if (typeof module.pinf === "object") {
		return callback(null, module.pinf);
	}

	// TODO: Only continue below if no context found in cache.
	//       Only load cache module and determine cache path by looking at PINF_RUNTIME and own package uid (use pinf-primitives-js to do this).
	//		 Cache module is in primitives package as well.
	return require.async("./context", function(CONTEXT) {
		return CONTEXT.contextForModule(module, options, function(err, context) {
			if (err) return done(err);
		    try {
				return main(context, done);
		    } catch(err) {
		        return done(err);
		    }		
		});
	}, done);
}

}
);
// @pinf-bundle-module: {"file":"test/assets/packages/require-async-deep-pkg/node_modules/pinf-for-nodejs/node_modules/require.async/require.async.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","id":"f49fa9ddb2d9f9b859bcb1c1c85478a78e23ba61-require.async/require.async.js"}
require.memoize("f49fa9ddb2d9f9b859bcb1c1c85478a78e23ba61-require.async/require.async.js", 
function(require, exports, module) {var __dirname = 'test/assets/packages/require-async-deep-pkg/node_modules/pinf-for-nodejs/node_modules/require.async';
/**
 * Author: Christoph Dorn <christoph@christophdorn.com>
 * [UNLICENSE](http://unlicense.org/)
 */

module.exports = function(require) {

	// We only add the method if it is not already there.
	if (typeof require.async !== "undefined") {
		return;
	}

	// We add the portable `require.async` method.
	require.async = function(id, successCallback, errorCallback) {
		var exports = null;
		try {
			exports = require(id);
		} catch(err) {
			if (typeof errorCallback === "function") {
				errorCallback(err);
			}
			return;
		}
		successCallback(exports);
		return;
	}

}

return {
    module: (typeof module !== "undefined") ? module : null
};
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js",
    "mappings": {
        "pinf-for-nodejs": "3d651410283fe41ff53775736a29d43f95b1f37f-pinf-for-nodejs"
    },
    "dirpath": "test/assets/packages/require-async-deep-pkg"
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"3d651410283fe41ff53775736a29d43f95b1f37f-pinf-for-nodejs/package.json"}
require.memoize("3d651410283fe41ff53775736a29d43f95b1f37f-pinf-for-nodejs/package.json", 
{
    "main": "3d651410283fe41ff53775736a29d43f95b1f37f-pinf-for-nodejs/lib/pinf.js",
    "mappings": {
        "require.async": "f49fa9ddb2d9f9b859bcb1c1c85478a78e23ba61-require.async"
    },
    "dirpath": "test/assets/packages/require-async-deep-pkg/node_modules/pinf-for-nodejs"
}
);
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"f49fa9ddb2d9f9b859bcb1c1c85478a78e23ba61-require.async/package.json"}
require.memoize("f49fa9ddb2d9f9b859bcb1c1c85478a78e23ba61-require.async/package.json", 
{
    "main": "f49fa9ddb2d9f9b859bcb1c1c85478a78e23ba61-require.async/require.async.js",
    "dirpath": "test/assets/packages/require-async-deep-pkg/node_modules/pinf-for-nodejs/node_modules/require.async"
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}