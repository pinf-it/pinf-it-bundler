*STATUS: DEV*

Code Bundler
============

Code bundle standards are evolving but there are various differences across communities.

This library attempts to generate normalized code bundles for
any code modules and packages that can be parsed by the
[PackageInsight](https://github.com/pinf-it/pinf-it-packageinsight) and
[CodeInsight](https://github.com/pinf-it/pinf-it-codeinsight) libraries.

This bundler is intended to replace the following tools and conventions:

  * [RequireJS Optimizer](http://requirejs.org/docs/optimization.html)
  * [component builder](https://github.com/component/builder.js)
  * [Grunt](http://gruntjs.com/) scripts that create concatenated and optimized code bundles
  * Build scripts that create concatenated and optimized code bundles


Install
-------

    npm install pinf-it-bundler


Usage
-----

    const BUNDLER = require("pinf-it-bundler");
    
    BUNDLER.bundleFile("<path>", {
        distPath: "<target directory>"
    }, function(err, descriptor) {
    });


Development
-----------

    make test


License
=======

[UNLICENSE](http://unlicense.org/)
