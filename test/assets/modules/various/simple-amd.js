// @pinf-bundle-ignore: 
sourcemint.bundle("", function(require) {
// @pinf-bundle-header: {"helper":"amd-ish"}
function defineish()
{
    // TODO
}
// @pinf-bundle-module: {"file":"/pinf/projects/github.com+pinf-it+pinf-it-bundler/node_modules/pinf-it-module-insight/test/assets/various/simple-amd.js","mtime":1366479052,"wrapper":"amd-ish","format":"amd-ish","id":"simple-amd.js"}
require.memoize("simple-amd.js", 
defineish(function(define) {

define(function() {
	return {
		STRING: "string-value",
		OBJECT: {
			id: "object-value"
		}
	};
});

})
);
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}