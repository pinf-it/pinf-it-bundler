#!/bin/bash

if [ ! -e "test/assets/packages_externals/node_modules" ]; then
    pushd "test/assets/packages_externals" > /dev/null
        npm install
    popd > /dev/null
fi

./node_modules/.bin/mocha --reporter list test/*.js
