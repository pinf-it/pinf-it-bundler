// @pinf-bundle-ignore: 
sourcemint.bundle("", function(require) {
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/various/q.js","mtime":1366479052,"wrapper":"commonjs","format":"commonjs","id":"q.js"}
require.memoize("q.js", 
function(require, exports, module) {
// @see https://github.com/kriskowal/q/blob/master/q.js
(function (definition) {
    // Turn off strict mode for this function so we can assign to global.Q
    /*jshint strict: false, -W117*/

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else {
        Q = definition();
    }

})(function () {
"use strict";

var nextTick;
if (typeof setImmediate === "function") {
    if (typeof window !== "undefined") {
        nextTick = setImmediate.bind(window);
    } else {
        nextTick = setImmediate;
    }
} else if (typeof process !== "undefined" && process.nextTick) {
    nextTick = process.nextTick;
} else {
    (function () {
        var requestTick = void 0;

        function onTick() {
        }

        nextTick = function (task) {
        };

        if (typeof MessageChannel !== "undefined") {
            var channel = new MessageChannel();

        } else {
            // old browsers
            requestTick = function () {
                setTimeout(onTick, 0);
            };
        }
    })();
}

function Q() {
}

Q.STRING = "string-value";
Q.OBJECT = {
    id: "object-value"
};

return Q;

});
}
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}