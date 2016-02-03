// @pinf-bundle-ignore: 
PINF.bundle("", function(require, _____bundle_global) {
// @pinf-bundle-module: {"file":"test/assets/packages/nodejs-npm3-flat/app.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"/app.js"}
require.memoize("/app.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + 'test/assets/packages/nodejs-npm3-flat';

function main() {

	var h = require('mercury').h;

	function render(count)  {
	    return h('div', {
	        style: {
	            textAlign: 'center'
	        }
	    }, [String(count)]);
	}

	console.log("Hello World");

	var tree = render(3);

	console.log(JSON.parse(JSON.stringify(tree)));
}

if (require.main === module) {
	main();
}

return {
    require: (typeof require !== "undefined") ? require : null,
    String: (typeof String !== "undefined") ? String : null,
    console: (typeof console !== "undefined") ? console : null,
    JSON: (typeof JSON !== "undefined") ? JSON : null
};
}
, {"filename":"test/assets/packages/nodejs-npm3-flat/app.js","variation":""});
// @pinf-bundle-module: {"file":"../mercury/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"5aa290c24f24dacbba3d98464ee2496c359e2fa9-mercury/index.js"}
require.memoize("5aa290c24f24dacbba3d98464ee2496c359e2fa9-mercury/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../mercury';
'use strict';

var SingleEvent = require('geval/single');
var MultipleEvent = require('geval/multiple');
var extend = require('xtend');

/*
    Pro tip: Don't require `mercury` itself.
      require and depend on all these modules directly!
*/
var mercury = module.exports = {
    // Entry
    main: require('main-loop'),
    app: app,

    // Base
    BaseEvent: require('value-event/base-event'),

    // Input
    Delegator: require('dom-delegator'),
    // deprecated: use hg.channels instead.
    input: input,
    // deprecated: use hg.channels instead.
    handles: channels,
    channels: channels,
    // deprecated: use hg.send instead.
    event: require('value-event/event'),
    send: require('value-event/event'),
    // deprecated: use hg.sendValue instead.
    valueEvent: require('value-event/value'),
    sendValue: require('value-event/value'),
    // deprecated: use hg.sendSubmit instead.
    submitEvent: require('value-event/submit'),
    sendSubmit: require('value-event/submit'),
    // deprecated: use hg.sendChange instead.
    changeEvent: require('value-event/change'),
    sendChange: require('value-event/change'),
    // deprecated: use hg.sendKey instead.
    keyEvent: require('value-event/key'),
    sendKey: require('value-event/key'),
    // deprecated use hg.sendClick instead.
    clickEvent: require('value-event/click'),
    sendClick: require('value-event/click'),

    // State
    // remove from core: favor hg.varhash instead.
    array: require('observ-array'),
    struct: require('observ-struct'),
    // deprecated: use hg.struct instead.
    hash: require('observ-struct'),
    varhash: require('observ-varhash'),
    value: require('observ'),
    state: state,

    // Render
    diff: require('virtual-dom/vtree/diff'),
    patch: require('virtual-dom/vdom/patch'),
    partial: require('vdom-thunk'),
    create: require('virtual-dom/vdom/create-element'),
    h: require('virtual-dom/virtual-hyperscript'),

    // Utilities
    // remove from core: require computed directly instead.
    computed: require('observ/computed'),
    // remove from core: require watch directly instead.
    watch: require('observ/watch')
};

function input(names) {
    if (!names) {
        return SingleEvent();
    }

    return MultipleEvent(names);
}

function state(obj) {
    var copy = extend(obj);
    var $channels = copy.channels;
    var $handles = copy.handles;

    if ($channels) {
        copy.channels = mercury.value(null);
    } else if ($handles) {
        copy.handles = mercury.value(null);
    }

    var observ = mercury.struct(copy);
    if ($channels) {
        observ.channels.set(mercury.channels($channels, observ));
    } else if ($handles) {
        observ.handles.set(mercury.channels($handles, observ));
    }
    return observ;
}

function channels(funcs, context) {
    return Object.keys(funcs).reduce(createHandle, {});

    function createHandle(acc, name) {
        var handle = mercury.Delegator.allocateHandle(
            funcs[name].bind(null, context));

        acc[name] = handle;
        return acc;
    }
}

function app(elem, observ, render, opts) {
    mercury.Delegator(opts);
    var loop = mercury.main(observ(), render, extend({
        diff: mercury.diff,
        create: mercury.create,
        patch: mercury.patch
    }, opts));
    if (elem) {
        elem.appendChild(loop.target);
    }
    return observ(loop.update);
}

return {
    SingleEvent: (typeof SingleEvent !== "undefined") ? SingleEvent : null,
    require: (typeof require !== "undefined") ? require : null,
    MultipleEvent: (typeof MultipleEvent !== "undefined") ? MultipleEvent : null,
    extend: (typeof extend !== "undefined") ? extend : null,
    mercury: (typeof mercury !== "undefined") ? mercury : null,
    module: (typeof module !== "undefined") ? module : null,
    input: (typeof input !== "undefined") ? input : null,
    state: (typeof state !== "undefined") ? state : null,
    channels: (typeof channels !== "undefined") ? channels : null,
    Object: (typeof Object !== "undefined") ? Object : null,
    app: (typeof app !== "undefined") ? app : null
};
}
, {"filename":"../mercury/index.js","variation":""});
// @pinf-bundle-module: {"file":"../geval/single.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"fe0e6550bbef2c036fb585219c557a4fe6179940-geval/single.js"}
require.memoize("fe0e6550bbef2c036fb585219c557a4fe6179940-geval/single.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../geval';
var Event = require('./event.js')

module.exports = Single

function Single() {
    var tuple = Event()

    return function event(value) {
        if (typeof value === "function") {
            return tuple.listen(value)
        } else {
            return tuple.broadcast(value)
        }
    }
}

return {
    Event: (typeof Event !== "undefined") ? Event : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    Single: (typeof Single !== "undefined") ? Single : null
};
}
, {"filename":"../geval/single.js","variation":""});
// @pinf-bundle-module: {"file":"../geval/event.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"fe0e6550bbef2c036fb585219c557a4fe6179940-geval/event.js"}
require.memoize("fe0e6550bbef2c036fb585219c557a4fe6179940-geval/event.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../geval';
module.exports = Event

function Event() {
    var listeners = []

    return { broadcast: broadcast, listen: event }

    function broadcast(value) {
        for (var i = 0; i < listeners.length; i++) {
            listeners[i](value)
        }
    }

    function event(listener) {
        listeners.push(listener)

        return removeListener

        function removeListener() {
            var index = listeners.indexOf(listener)
            if (index !== -1) {
                listeners.splice(index, 1)
            }
        }
    }
}

return {
    module: (typeof module !== "undefined") ? module : null,
    Event: (typeof Event !== "undefined") ? Event : null
};
}
, {"filename":"../geval/event.js","variation":""});
// @pinf-bundle-module: {"file":"../geval/multiple.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"fe0e6550bbef2c036fb585219c557a4fe6179940-geval/multiple.js"}
require.memoize("fe0e6550bbef2c036fb585219c557a4fe6179940-geval/multiple.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../geval';
var event = require("./single.js")

module.exports = multiple

function multiple(names) {
    return names.reduce(function (acc, name) {
        acc[name] = event()
        return acc
    }, {})
}

return {
    event: (typeof event !== "undefined") ? event : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    multiple: (typeof multiple !== "undefined") ? multiple : null
};
}
, {"filename":"../geval/multiple.js","variation":""});
// @pinf-bundle-module: {"file":"../xtend/immutable.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"1785d6964ca526223d5851a54ae43268bcd80878-xtend/immutable.js"}
require.memoize("1785d6964ca526223d5851a54ae43268bcd80878-xtend/immutable.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../xtend';
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

return {
    module: (typeof module !== "undefined") ? module : null,
    Object: (typeof Object !== "undefined") ? Object : null,
    extend: (typeof extend !== "undefined") ? extend : null
};
}
, {"filename":"../xtend/immutable.js","variation":""});
// @pinf-bundle-module: {"file":"../main-loop/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"a1266e7ecc769cb741acd7f364709f047959edb8-main-loop/index.js"}
require.memoize("a1266e7ecc769cb741acd7f364709f047959edb8-main-loop/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../main-loop';
var raf = require("raf")
var TypedError = require("error/typed")

var InvalidUpdateInRender = TypedError({
    type: "main-loop.invalid.update.in-render",
    message: "main-loop: Unexpected update occurred in loop.\n" +
        "We are currently rendering a view, " +
            "you can't change state right now.\n" +
        "The diff is: {stringDiff}.\n" +
        "SUGGESTED FIX: find the state mutation in your view " +
            "or rendering function and remove it.\n" +
        "The view should not have any side effects.\n",
    diff: null,
    stringDiff: null
})

module.exports = main

function main(initialState, view, opts) {
    opts = opts || {}

    var currentState = initialState
    var create = opts.create
    var diff = opts.diff
    var patch = opts.patch
    var redrawScheduled = false

    var tree = opts.initialTree || view(currentState)
    var target = opts.target || create(tree, opts)
    var inRenderingTransaction = false

    currentState = null

    var loop = {
        state: initialState,
        target: target,
        update: update
    }
    return loop

    function update(state) {
        if (inRenderingTransaction) {
            throw InvalidUpdateInRender({
                diff: state._diff,
                stringDiff: JSON.stringify(state._diff)
            })
        }

        if (currentState === null && !redrawScheduled) {
            redrawScheduled = true
            raf(redraw)
        }

        currentState = state
        loop.state = state
    }

    function redraw() {
        redrawScheduled = false
        if (currentState === null) {
            return
        }

        inRenderingTransaction = true
        var newTree = view(currentState)

        if (opts.createOnly) {
            inRenderingTransaction = false
            create(newTree, opts)
        } else {
            var patches = diff(tree, newTree, opts)
            inRenderingTransaction = false
            target = patch(target, patches, opts)
        }

        tree = newTree
        currentState = null
    }
}

return {
    raf: (typeof raf !== "undefined") ? raf : null,
    require: (typeof require !== "undefined") ? require : null,
    TypedError: (typeof TypedError !== "undefined") ? TypedError : null,
    InvalidUpdateInRender: (typeof InvalidUpdateInRender !== "undefined") ? InvalidUpdateInRender : null,
    module: (typeof module !== "undefined") ? module : null,
    main: (typeof main !== "undefined") ? main : null
};
}
, {"filename":"../main-loop/index.js","variation":""});
// @pinf-bundle-module: {"file":"../raf/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"776fdf2bd359c0842eabb6e35eb383938b1c8a13-raf/index.js"}
require.memoize("776fdf2bd359c0842eabb6e35eb383938b1c8a13-raf/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../raf';
var now = require('performance-now')
  , global = typeof window === 'undefined' ? {} : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = global['request' + suffix]
  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]
  , isNative = true

for(var i = 0; i < vendors.length && !raf; i++) {
  raf = global[vendors[i] + 'Request' + suffix]
  caf = global[vendors[i] + 'Cancel' + suffix]
      || global[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  isNative = false

  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  if(!isNative) {
    return raf.call(global, fn)
  }
  return raf.call(global, function() {
    try{
      fn.apply(this, arguments)
    } catch(e) {
      setTimeout(function() { throw e }, 0)
    }
  })
}
module.exports.cancel = function() {
  caf.apply(global, arguments)
}

return {
    now: (typeof now !== "undefined") ? now : null,
    require: (typeof require !== "undefined") ? require : null,
    global: (typeof global !== "undefined") ? global : null,
    window: (typeof window !== "undefined") ? window : null,
    vendors: (typeof vendors !== "undefined") ? vendors : null,
    suffix: (typeof suffix !== "undefined") ? suffix : null,
    raf: (typeof raf !== "undefined") ? raf : null,
    caf: (typeof caf !== "undefined") ? caf : null,
    isNative: (typeof isNative !== "undefined") ? isNative : null,
    last: (typeof last !== "undefined") ? last : null,
    id: (typeof id !== "undefined") ? id : null,
    queue: (typeof queue !== "undefined") ? queue : null,
    frameDuration: (typeof frameDuration !== "undefined") ? frameDuration : null,
    Math: (typeof Math !== "undefined") ? Math : null,
    setTimeout: (typeof setTimeout !== "undefined") ? setTimeout : null,
    module: (typeof module !== "undefined") ? module : null
};
}
, {"filename":"../raf/index.js","variation":""});
// @pinf-bundle-module: {"file":"../performance-now/lib/performance-now.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"747e45a55b2cfbbce6fc8c3da11ec4bc08bdbbf7-performance-now/lib/performance-now.js"}
require.memoize("747e45a55b2cfbbce6fc8c3da11ec4bc08bdbbf7-performance-now/lib/performance-now.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../performance-now/lib';
// Generated by CoffeeScript 1.6.3
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

/*
//@ sourceMappingURL=performance-now.map
*/

return {
    performance: (typeof performance !== "undefined") ? performance : null,
    module: (typeof module !== "undefined") ? module : null,
    process: (typeof process !== "undefined") ? process : null,
    Date: (typeof Date !== "undefined") ? Date : null
};
}
, {"filename":"../performance-now/lib/performance-now.js","variation":""});
// @pinf-bundle-module: {"file":"../error/typed.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"b9238a6795a9ff3c21edb77008fe66b19e571992-error/typed.js"}
require.memoize("b9238a6795a9ff3c21edb77008fe66b19e571992-error/typed.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../error';
var camelize = require("camelize")
var template = require("string-template")
var extend = require("xtend/mutable")

module.exports = TypedError

function TypedError(args) {
    if (!args) {
        throw new Error("args is required");
    }
    if (!args.type) {
        throw new Error("args.type is required");
    }
    if (!args.message) {
        throw new Error("args.message is required");
    }

    var message = args.message

    if (args.type && !args.name) {
        var errorName = camelize(args.type) + "Error"
        args.name = errorName[0].toUpperCase() + errorName.substr(1)
    }

    extend(createError, args);
    createError._name = args.name;

    return createError;

    function createError(opts) {
        var result = new Error()

        Object.defineProperty(result, "type", {
            value: result.type,
            enumerable: true,
            writable: true,
            configurable: true
        })

        var options = extend({}, args, opts)

        extend(result, options)
        result.message = template(message, options)

        return result
    }
}


return {
    camelize: (typeof camelize !== "undefined") ? camelize : null,
    require: (typeof require !== "undefined") ? require : null,
    template: (typeof template !== "undefined") ? template : null,
    extend: (typeof extend !== "undefined") ? extend : null,
    module: (typeof module !== "undefined") ? module : null,
    TypedError: (typeof TypedError !== "undefined") ? TypedError : null,
    Object: (typeof Object !== "undefined") ? Object : null
};
}
, {"filename":"../error/typed.js","variation":""});
// @pinf-bundle-module: {"file":"../camelize/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"7a6afee7f88ad8b1ba389df4d83b4462b9997d16-camelize/index.js"}
require.memoize("7a6afee7f88ad8b1ba389df4d83b4462b9997d16-camelize/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../camelize';
module.exports = function(obj) {
    if (typeof obj === 'string') return camelCase(obj);
    return walk(obj);
};

function walk (obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (isDate(obj) || isRegex(obj)) return obj;
    if (isArray(obj)) return map(obj, walk);
    return reduce(objectKeys(obj), function (acc, key) {
        var camel = camelCase(key);
        acc[camel] = walk(obj[key]);
        return acc;
    }, {});
}

function camelCase(str) {
    return str.replace(/[_.-](\w|$)/g, function (_,x) {
        return x.toUpperCase();
    });
}

var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

var isDate = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
};

var isRegex = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var has = Object.prototype.hasOwnProperty;
var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};

function map (xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        res.push(f(xs[i], i));
    }
    return res;
}

function reduce (xs, f, acc) {
    if (xs.reduce) return xs.reduce(f, acc);
    for (var i = 0; i < xs.length; i++) {
        acc = f(acc, xs[i], i);
    }
    return acc;
}

return {
    module: (typeof module !== "undefined") ? module : null,
    camelCase: (typeof camelCase !== "undefined") ? camelCase : null,
    walk: (typeof walk !== "undefined") ? walk : null,
    isDate: (typeof isDate !== "undefined") ? isDate : null,
    isRegex: (typeof isRegex !== "undefined") ? isRegex : null,
    isArray: (typeof isArray !== "undefined") ? isArray : null,
    map: (typeof map !== "undefined") ? map : null,
    reduce: (typeof reduce !== "undefined") ? reduce : null,
    objectKeys: (typeof objectKeys !== "undefined") ? objectKeys : null,
    Array: (typeof Array !== "undefined") ? Array : null,
    Object: (typeof Object !== "undefined") ? Object : null,
    has: (typeof has !== "undefined") ? has : null,
    i: (typeof i !== "undefined") ? i : null
};
}
, {"filename":"../camelize/index.js","variation":""});
// @pinf-bundle-module: {"file":"../string-template/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"e30cf416f3e94cb0ded210d62758303e4fde3abf-string-template/index.js"}
require.memoize("e30cf416f3e94cb0ded210d62758303e4fde3abf-string-template/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../string-template';
var nargs = /\{([0-9a-zA-Z]+)\}/g
var slice = Array.prototype.slice

module.exports = template

function template(string) {
    var args

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1]
    } else {
        args = slice.call(arguments, 1)
    }

    if (!args || !args.hasOwnProperty) {
        args = {}
    }

    return string.replace(nargs, function replaceArg(match, i, index) {
        var result

        if (string[index - 1] === "{" &&
            string[index + match.length] === "}") {
            return i
        } else {
            result = args.hasOwnProperty(i) ? args[i] : null
            if (result === null || result === undefined) {
                return ""
            }

            return result
        }
    })
}

return {
    nargs: (typeof nargs !== "undefined") ? nargs : null,
    slice: (typeof slice !== "undefined") ? slice : null,
    Array: (typeof Array !== "undefined") ? Array : null,
    module: (typeof module !== "undefined") ? module : null,
    template: (typeof template !== "undefined") ? template : null
};
}
, {"filename":"../string-template/index.js","variation":""});
// @pinf-bundle-module: {"file":"../xtend/mutable.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"1785d6964ca526223d5851a54ae43268bcd80878-xtend/mutable.js"}
require.memoize("1785d6964ca526223d5851a54ae43268bcd80878-xtend/mutable.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../xtend';
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

return {
    module: (typeof module !== "undefined") ? module : null,
    Object: (typeof Object !== "undefined") ? Object : null,
    extend: (typeof extend !== "undefined") ? extend : null
};
}
, {"filename":"../xtend/mutable.js","variation":""});
// @pinf-bundle-module: {"file":"../value-event/base-event.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/base-event.js"}
require.memoize("a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/base-event.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../value-event';
var Delegator = require('dom-delegator')

module.exports = BaseEvent

function BaseEvent(lambda) {
    return EventHandler;

    function EventHandler(fn, data, opts) {
        var handler = {
            fn: fn,
            data: data !== undefined ? data : {},
            opts: opts || {},
            handleEvent: handleEvent
        }

        if (fn && fn.type === 'dom-delegator-handle') {
            return Delegator.transformHandle(fn,
                handleLambda.bind(handler))
        }

        return handler;
    }

    function handleLambda(ev, broadcast) {
        if (this.opts.startPropagation && ev.startPropagation) {
            ev.startPropagation();
        }

        return lambda.call(this, ev, broadcast)
    }

    function handleEvent(ev) {
        var self = this

        if (self.opts.startPropagation && ev.startPropagation) {
            ev.startPropagation()
        }

        lambda.call(self, ev, broadcast)

        function broadcast(value) {
            if (typeof self.fn === 'function') {
                self.fn(value)
            } else {
                self.fn.write(value)
            }
        }
    }
}

return {
    Delegator: (typeof Delegator !== "undefined") ? Delegator : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    BaseEvent: (typeof BaseEvent !== "undefined") ? BaseEvent : null
};
}
, {"filename":"../value-event/base-event.js","variation":""});
// @pinf-bundle-module: {"file":"../dom-delegator/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/index.js"}
require.memoize("188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../dom-delegator';
var Individual = require("individual")
var cuid = require("cuid")
var globalDocument = require("global/document")

var DOMDelegator = require("./dom-delegator.js")

var versionKey = "13"
var cacheKey = "__DOM_DELEGATOR_CACHE@" + versionKey
var cacheTokenKey = "__DOM_DELEGATOR_CACHE_TOKEN@" + versionKey
var delegatorCache = Individual(cacheKey, {
    delegators: {}
})
var commonEvents = [
    "blur", "change", "click",  "contextmenu", "dblclick",
    "error","focus", "focusin", "focusout", "input", "keydown",
    "keypress", "keyup", "load", "mousedown", "mouseup",
    "resize", "select", "submit", "touchcancel",
    "touchend", "touchstart", "unload"
]

/*  Delegator is a thin wrapper around a singleton `DOMDelegator`
        instance.

    Only one DOMDelegator should exist because we do not want
        duplicate event listeners bound to the DOM.

    `Delegator` will also `listenTo()` all events unless
        every caller opts out of it
*/
module.exports = Delegator

function Delegator(opts) {
    opts = opts || {}
    var document = opts.document || globalDocument

    var cacheKey = document[cacheTokenKey]

    if (!cacheKey) {
        cacheKey =
            document[cacheTokenKey] = cuid()
    }

    var delegator = delegatorCache.delegators[cacheKey]

    if (!delegator) {
        delegator = delegatorCache.delegators[cacheKey] =
            new DOMDelegator(document)
    }

    if (opts.defaultEvents !== false) {
        for (var i = 0; i < commonEvents.length; i++) {
            delegator.listenTo(commonEvents[i])
        }
    }

    return delegator
}

Delegator.allocateHandle = DOMDelegator.allocateHandle;
Delegator.transformHandle = DOMDelegator.transformHandle;

return {
    Individual: (typeof Individual !== "undefined") ? Individual : null,
    require: (typeof require !== "undefined") ? require : null,
    cuid: (typeof cuid !== "undefined") ? cuid : null,
    globalDocument: (typeof globalDocument !== "undefined") ? globalDocument : null,
    DOMDelegator: (typeof DOMDelegator !== "undefined") ? DOMDelegator : null,
    versionKey: (typeof versionKey !== "undefined") ? versionKey : null,
    cacheKey: (typeof cacheKey !== "undefined") ? cacheKey : null,
    cacheTokenKey: (typeof cacheTokenKey !== "undefined") ? cacheTokenKey : null,
    delegatorCache: (typeof delegatorCache !== "undefined") ? delegatorCache : null,
    commonEvents: (typeof commonEvents !== "undefined") ? commonEvents : null,
    module: (typeof module !== "undefined") ? module : null,
    Delegator: (typeof Delegator !== "undefined") ? Delegator : null
};
}
, {"filename":"../dom-delegator/index.js","variation":""});
// @pinf-bundle-module: {"file":"../individual/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"bf72d7446c35cd68ebc718de4c886bae7574e077-individual/index.js"}
require.memoize("bf72d7446c35cd68ebc718de4c886bae7574e077-individual/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../individual';
var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual

function Individual(key, value) {
    if (root[key]) {
        return root[key]
    }

    Object.defineProperty(root, key, {
        value: value
        , configurable: true
    })

    return value
}

return {
    root: (typeof root !== "undefined") ? root : null,
    window: (typeof window !== "undefined") ? window : null,
    global: (typeof global !== "undefined") ? global : null,
    module: (typeof module !== "undefined") ? module : null,
    Individual: (typeof Individual !== "undefined") ? Individual : null,
    Object: (typeof Object !== "undefined") ? Object : null
};
}
, {"filename":"../individual/index.js","variation":""});
// @pinf-bundle-module: {"file":"../cuid/dist/node-cuid.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"389ae956e18469d6376883cc8f4bfc8f983c9c13-cuid/dist/node-cuid.js"}
require.memoize("389ae956e18469d6376883cc8f4bfc8f983c9c13-cuid/dist/node-cuid.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../cuid/dist';
/**
 * cuid.js
 * Collision-resistant UID generator for browsers and node.
 * Sequential for fast db lookups and recency sorting.
 * Safe for element IDs and server-side lookups.
 *
 * Extracted from CLCTR
 *
 * Copyright (c) Eric Elliott 2012
 * MIT License
 */

/*global window, navigator, document, require, process, module */
(function (app) {
  'use strict';
  var namespace = 'cuid',
    c = 0,
    blockSize = 4,
    base = 36,
    discreteValues = Math.pow(base, blockSize),

    pad = function pad(num, size) {
      var s = "000000000" + num;
      return s.substr(s.length-size);
    },

    randomBlock = function randomBlock() {
      return pad((Math.random() *
            discreteValues << 0)
            .toString(base), blockSize);
    },

    safeCounter = function () {
      c = (c < discreteValues) ? c : 0;
      c++; // this is not subliminal
      return c - 1;
    },

    api = function cuid() {
      // Starting with a lowercase letter makes
      // it HTML element ID friendly.
      var letter = 'c', // hard-coded allows for sequential access

        // timestamp
        // warning: this exposes the exact date and time
        // that the uid was created.
        timestamp = (new Date().getTime()).toString(base),

        // Prevent same-machine collisions.
        counter,

        // A few chars to generate distinct ids for different
        // clients (so different computers are far less
        // likely to generate the same id)
        fingerprint = api.fingerprint(),

        // Grab some more chars from Math.random()
        random = randomBlock() + randomBlock();

        counter = pad(safeCounter().toString(base), blockSize);

      return  (letter + timestamp + counter + fingerprint + random);
    };

  api.slug = function slug() {
    var date = new Date().getTime().toString(36),
      counter,
      print = api.fingerprint().slice(0,1) +
        api.fingerprint().slice(-1),
      random = randomBlock().slice(-2);

      counter = safeCounter().toString(36).slice(-4);

    return date.slice(-2) +
      counter + print + random;
  };

  api.fingerprint = function nodePrint() {
    var os = require('__SYSTEM__/os'),

      padding = 2,
      pid = pad((process.pid).toString(36), padding),
      hostname = os.hostname(),
      length = hostname.length,
      hostId = pad((hostname)
        .split('')
        .reduce(function (prev, char) {
          return +prev + char.charCodeAt(0);
        }, +length + 36)
        .toString(36),
      padding);
    return pid + hostId;
  };


  // don't change anything from here down.
  if (app.register) {
    app.register(namespace, api);
  } else if (typeof module !== 'undefined') {
    module.exports = api;
  } else {
    app[namespace] = api;
  }

}(this.applitude || this));

return {
    Math: (typeof Math !== "undefined") ? Math : null,
    require: (typeof require !== "undefined") ? require : null,
    process: (typeof process !== "undefined") ? process : null,
    module: (typeof module !== "undefined") ? module : null
};
}
, {"filename":"../cuid/dist/node-cuid.js","variation":""});
// @pinf-bundle-module: {"file":"../global/document.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"13986d51e21380cfc0d85f20cf3b63da6e225b2e-global/document.js"}
require.memoize("13986d51e21380cfc0d85f20cf3b63da6e225b2e-global/document.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../global';
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

return {
    topLevel: (typeof topLevel !== "undefined") ? topLevel : null,
    global: (typeof global !== "undefined") ? global : null,
    window: (typeof window !== "undefined") ? window : null,
    minDoc: (typeof minDoc !== "undefined") ? minDoc : null,
    require: (typeof require !== "undefined") ? require : null,
    document: (typeof document !== "undefined") ? document : null,
    module: (typeof module !== "undefined") ? module : null,
    doccy: (typeof doccy !== "undefined") ? doccy : null
};
}
, {"filename":"../global/document.js","variation":""});
// @pinf-bundle-module: {"file":"../min-document/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/index.js"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../min-document';
var Document = require('./document.js');

module.exports = new Document();

return {
    Document: (typeof Document !== "undefined") ? Document : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null
};
}
, {"filename":"../min-document/index.js","variation":""});
// @pinf-bundle-module: {"file":"../min-document/document.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/document.js"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/document.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../min-document';
var domWalk = require("dom-walk")

var Comment = require("./dom-comment.js")
var DOMText = require("./dom-text.js")
var DOMElement = require("./dom-element.js")
var DocumentFragment = require("./dom-fragment.js")
var Event = require("./event.js")
var dispatchEvent = require("./event/dispatch-event.js")
var addEventListener = require("./event/add-event-listener.js")
var removeEventListener = require("./event/remove-event-listener.js")

module.exports = Document;

function Document() {
    if (!(this instanceof Document)) {
        return new Document();
    }

    this.head = this.createElement("head")
    this.body = this.createElement("body")
    this.documentElement = this.createElement("html")
    this.documentElement.appendChild(this.head)
    this.documentElement.appendChild(this.body)
    this.childNodes = [this.documentElement]
    this.nodeType = 9
}

var proto = Document.prototype;
proto.createTextNode = function createTextNode(value) {
    return new DOMText(value, this)
}

proto.createElementNS = function createElementNS(namespace, tagName) {
    var ns = namespace === null ? null : String(namespace)
    return new DOMElement(tagName, this, ns)
}

proto.createElement = function createElement(tagName) {
    return new DOMElement(tagName, this)
}

proto.createDocumentFragment = function createDocumentFragment() {
    return new DocumentFragment(this)
}

proto.createEvent = function createEvent(family) {
    return new Event(family)
}

proto.createComment = function createComment(data) {
    return new Comment(data, this)
}

proto.getElementById = function getElementById(id) {
    id = String(id)

    var result = domWalk(this.childNodes, function (node) {
        if (String(node.id) === id) {
            return node
        }
    })

    return result || null
}

proto.getElementsByClassName = DOMElement.prototype.getElementsByClassName
proto.getElementsByTagName = DOMElement.prototype.getElementsByTagName
proto.contains = DOMElement.prototype.contains

proto.removeEventListener = removeEventListener
proto.addEventListener = addEventListener
proto.dispatchEvent = dispatchEvent

return {
    domWalk: (typeof domWalk !== "undefined") ? domWalk : null,
    require: (typeof require !== "undefined") ? require : null,
    Comment: (typeof Comment !== "undefined") ? Comment : null,
    DOMText: (typeof DOMText !== "undefined") ? DOMText : null,
    DOMElement: (typeof DOMElement !== "undefined") ? DOMElement : null,
    DocumentFragment: (typeof DocumentFragment !== "undefined") ? DocumentFragment : null,
    Event: (typeof Event !== "undefined") ? Event : null,
    dispatchEvent: (typeof dispatchEvent !== "undefined") ? dispatchEvent : null,
    addEventListener: (typeof addEventListener !== "undefined") ? addEventListener : null,
    removeEventListener: (typeof removeEventListener !== "undefined") ? removeEventListener : null,
    module: (typeof module !== "undefined") ? module : null,
    Document: (typeof Document !== "undefined") ? Document : null,
    proto: (typeof proto !== "undefined") ? proto : null,
    String: (typeof String !== "undefined") ? String : null
};
}
, {"filename":"../min-document/document.js","variation":""});
// @pinf-bundle-module: {"file":"../dom-walk/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"bafb1bd85d795649867d457cd2647f73cf5cf5f0-dom-walk/index.js"}
require.memoize("bafb1bd85d795649867d457cd2647f73cf5cf5f0-dom-walk/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../dom-walk';
var slice = Array.prototype.slice

module.exports = iterativelyWalk

function iterativelyWalk(nodes, cb) {
    if (!('length' in nodes)) {
        nodes = [nodes]
    }
    
    nodes = slice.call(nodes)

    while(nodes.length) {
        var node = nodes.shift(),
            ret = cb(node)

        if (ret) {
            return ret
        }

        if (node.childNodes && node.childNodes.length) {
            nodes = slice.call(node.childNodes).concat(nodes)
        }
    }
}

return {
    slice: (typeof slice !== "undefined") ? slice : null,
    Array: (typeof Array !== "undefined") ? Array : null,
    module: (typeof module !== "undefined") ? module : null,
    iterativelyWalk: (typeof iterativelyWalk !== "undefined") ? iterativelyWalk : null
};
}
, {"filename":"../dom-walk/index.js","variation":""});
// @pinf-bundle-module: {"file":"../min-document/dom-comment.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/dom-comment.js"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/dom-comment.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../min-document';
module.exports = Comment

function Comment(data, owner) {
    if (!(this instanceof Comment)) {
        return new Comment(data, owner)
    }

    this.data = data
    this.nodeValue = data
    this.length = data.length
    this.ownerDocument = owner || null
}

Comment.prototype.nodeType = 8
Comment.prototype.nodeName = "#comment"

Comment.prototype.toString = function _Comment_toString() {
    return "[object Comment]"
}

return {
    module: (typeof module !== "undefined") ? module : null,
    Comment: (typeof Comment !== "undefined") ? Comment : null
};
}
, {"filename":"../min-document/dom-comment.js","variation":""});
// @pinf-bundle-module: {"file":"../min-document/dom-text.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/dom-text.js"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/dom-text.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../min-document';
module.exports = DOMText

function DOMText(value, owner) {
    if (!(this instanceof DOMText)) {
        return new DOMText(value)
    }

    this.data = value || ""
    this.length = this.data.length
    this.ownerDocument = owner || null
}

DOMText.prototype.type = "DOMTextNode"
DOMText.prototype.nodeType = 3

DOMText.prototype.toString = function _Text_toString() {
    return this.data
}

DOMText.prototype.replaceData = function replaceData(index, length, value) {
    var current = this.data
    var left = current.substring(0, index)
    var right = current.substring(index + length, current.length)
    this.data = left + value + right
    this.length = this.data.length
}

return {
    module: (typeof module !== "undefined") ? module : null,
    DOMText: (typeof DOMText !== "undefined") ? DOMText : null
};
}
, {"filename":"../min-document/dom-text.js","variation":""});
// @pinf-bundle-module: {"file":"../min-document/dom-element.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/dom-element.js"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/dom-element.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../min-document';
var domWalk = require("dom-walk")
var dispatchEvent = require("./event/dispatch-event.js")
var addEventListener = require("./event/add-event-listener.js")
var removeEventListener = require("./event/remove-event-listener.js")
var serializeNode = require("./serialize.js")

var htmlns = "http://www.w3.org/1999/xhtml"

module.exports = DOMElement

function DOMElement(tagName, owner, namespace) {
    if (!(this instanceof DOMElement)) {
        return new DOMElement(tagName)
    }

    var ns = namespace === undefined ? htmlns : (namespace || null)

    this.tagName = ns === htmlns ? String(tagName).toUpperCase() : tagName
    this.className = ""
    this.dataset = {}
    this.childNodes = []
    this.parentNode = null
    this.style = {}
    this.ownerDocument = owner || null
    this.namespaceURI = ns
    this._attributes = {}

    if (this.tagName === 'INPUT') {
      this.type = 'text'
    }
}

DOMElement.prototype.type = "DOMElement"
DOMElement.prototype.nodeType = 1

DOMElement.prototype.appendChild = function _Element_appendChild(child) {
    if (child.parentNode) {
        child.parentNode.removeChild(child)
    }

    this.childNodes.push(child)
    child.parentNode = this

    return child
}

DOMElement.prototype.replaceChild =
    function _Element_replaceChild(elem, needle) {
        // TODO: Throw NotFoundError if needle.parentNode !== this

        if (elem.parentNode) {
            elem.parentNode.removeChild(elem)
        }

        var index = this.childNodes.indexOf(needle)

        needle.parentNode = null
        this.childNodes[index] = elem
        elem.parentNode = this

        return needle
    }

DOMElement.prototype.removeChild = function _Element_removeChild(elem) {
    // TODO: Throw NotFoundError if elem.parentNode !== this

    var index = this.childNodes.indexOf(elem)
    this.childNodes.splice(index, 1)

    elem.parentNode = null
    return elem
}

DOMElement.prototype.insertBefore =
    function _Element_insertBefore(elem, needle) {
        // TODO: Throw NotFoundError if referenceElement is a dom node
        // and parentNode !== this

        if (elem.parentNode) {
            elem.parentNode.removeChild(elem)
        }

        var index = needle === null || needle === undefined ?
            -1 :
            this.childNodes.indexOf(needle)

        if (index > -1) {
            this.childNodes.splice(index, 0, elem)
        } else {
            this.childNodes.push(elem)
        }

        elem.parentNode = this
        return elem
    }

DOMElement.prototype.setAttributeNS =
    function _Element_setAttributeNS(namespace, name, value) {
        var prefix = null
        var localName = name
        var colonPosition = name.indexOf(":")
        if (colonPosition > -1) {
            prefix = name.substr(0, colonPosition)
            localName = name.substr(colonPosition + 1)
        }
        var attributes = this._attributes[namespace] || (this._attributes[namespace] = {})
        attributes[localName] = {value: value, prefix: prefix}
    }

DOMElement.prototype.getAttributeNS =
    function _Element_getAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace];
        var value = attributes && attributes[name] && attributes[name].value
        if (typeof value !== "string") {
            return null
        }

        return value
    }

DOMElement.prototype.removeAttributeNS =
    function _Element_removeAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace];
        if (attributes) {
            delete attributes[name]
        }
    }

DOMElement.prototype.hasAttributeNS =
    function _Element_hasAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace]
        return !!attributes && name in attributes;
    }

DOMElement.prototype.setAttribute = function _Element_setAttribute(name, value) {
    return this.setAttributeNS(null, name, value)
}

DOMElement.prototype.getAttribute = function _Element_getAttribute(name) {
    return this.getAttributeNS(null, name)
}

DOMElement.prototype.removeAttribute = function _Element_removeAttribute(name) {
    return this.removeAttributeNS(null, name)
}

DOMElement.prototype.hasAttribute = function _Element_hasAttribute(name) {
    return this.hasAttributeNS(null, name)
}

DOMElement.prototype.removeEventListener = removeEventListener
DOMElement.prototype.addEventListener = addEventListener
DOMElement.prototype.dispatchEvent = dispatchEvent

// Un-implemented
DOMElement.prototype.focus = function _Element_focus() {
    return void 0
}

DOMElement.prototype.toString = function _Element_toString() {
    return serializeNode(this)
}

DOMElement.prototype.getElementsByClassName = function _Element_getElementsByClassName(classNames) {
    var classes = classNames.split(" ");
    var elems = []

    domWalk(this, function (node) {
        if (node.nodeType === 1) {
            var nodeClassName = node.className || ""
            var nodeClasses = nodeClassName.split(" ")

            if (classes.every(function (item) {
                return nodeClasses.indexOf(item) !== -1
            })) {
                elems.push(node)
            }
        }
    })

    return elems
}

DOMElement.prototype.getElementsByTagName = function _Element_getElementsByTagName(tagName) {
    tagName = tagName.toLowerCase()
    var elems = []

    domWalk(this.childNodes, function (node) {
        if (node.nodeType === 1 && (tagName === '*' || node.tagName.toLowerCase() === tagName)) {
            elems.push(node)
        }
    })

    return elems
}

DOMElement.prototype.contains = function _Element_contains(element) {
    return domWalk(this, function (node) {
        return element === node
    }) || false
}

return {
    domWalk: (typeof domWalk !== "undefined") ? domWalk : null,
    require: (typeof require !== "undefined") ? require : null,
    dispatchEvent: (typeof dispatchEvent !== "undefined") ? dispatchEvent : null,
    addEventListener: (typeof addEventListener !== "undefined") ? addEventListener : null,
    removeEventListener: (typeof removeEventListener !== "undefined") ? removeEventListener : null,
    serializeNode: (typeof serializeNode !== "undefined") ? serializeNode : null,
    htmlns: (typeof htmlns !== "undefined") ? htmlns : null,
    module: (typeof module !== "undefined") ? module : null,
    DOMElement: (typeof DOMElement !== "undefined") ? DOMElement : null,
    String: (typeof String !== "undefined") ? String : null
};
}
, {"filename":"../min-document/dom-element.js","variation":""});
// @pinf-bundle-module: {"file":"../min-document/event/dispatch-event.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/event/dispatch-event.js"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/event/dispatch-event.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../min-document/event';
module.exports = dispatchEvent

function dispatchEvent(ev) {
    var elem = this
    var type = ev.type

    if (!ev.target) {
        ev.target = elem
    }

    if (!elem.listeners) {
        elem.listeners = {}
    }

    var listeners = elem.listeners[type]

    if (listeners) {
        return listeners.forEach(function (listener) {
            ev.currentTarget = elem
            if (typeof listener === 'function') {
                listener(ev)
            } else {
                listener.handleEvent(ev)
            }
        })
    }

    if (elem.parentNode) {
        elem.parentNode.dispatchEvent(ev)
    }
}

return {
    module: (typeof module !== "undefined") ? module : null,
    dispatchEvent: (typeof dispatchEvent !== "undefined") ? dispatchEvent : null
};
}
, {"filename":"../min-document/event/dispatch-event.js","variation":""});
// @pinf-bundle-module: {"file":"../min-document/event/add-event-listener.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/event/add-event-listener.js"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/event/add-event-listener.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../min-document/event';
module.exports = addEventListener

function addEventListener(type, listener) {
    var elem = this

    if (!elem.listeners) {
        elem.listeners = {}
    }

    if (!elem.listeners[type]) {
        elem.listeners[type] = []
    }

    if (elem.listeners[type].indexOf(listener) === -1) {
        elem.listeners[type].push(listener)
    }
}

return {
    module: (typeof module !== "undefined") ? module : null,
    addEventListener: (typeof addEventListener !== "undefined") ? addEventListener : null
};
}
, {"filename":"../min-document/event/add-event-listener.js","variation":""});
// @pinf-bundle-module: {"file":"../min-document/event/remove-event-listener.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/event/remove-event-listener.js"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/event/remove-event-listener.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../min-document/event';
module.exports = removeEventListener

function removeEventListener(type, listener) {
    var elem = this

    if (!elem.listeners) {
        return
    }

    if (!elem.listeners[type]) {
        return
    }

    var list = elem.listeners[type]
    var index = list.indexOf(listener)
    if (index !== -1) {
        list.splice(index, 1)
    }
}

return {
    module: (typeof module !== "undefined") ? module : null,
    removeEventListener: (typeof removeEventListener !== "undefined") ? removeEventListener : null
};
}
, {"filename":"../min-document/event/remove-event-listener.js","variation":""});
// @pinf-bundle-module: {"file":"../min-document/serialize.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/serialize.js"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/serialize.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../min-document';
module.exports = serializeNode

var voidElements = /area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr/i;

function serializeNode(node) {
    switch (node.nodeType) {
        case 3:
            return escapeText(node.data)
        case 8:
            return "<!--" + node.data + "-->"
        default:
            return serializeElement(node)
    }
}

function serializeElement(elem) {
    var strings = []

    var tagname = elem.tagName

    if (elem.namespaceURI === "http://www.w3.org/1999/xhtml") {
        tagname = tagname.toLowerCase()
    }

    strings.push("<" + tagname + properties(elem) + datasetify(elem))

    if (voidElements.test(tagname)) {
        strings.push(" />")
    } else {
        strings.push(">")

        if (elem.childNodes.length) {
            strings.push.apply(strings, elem.childNodes.map(serializeNode))
        } else if (elem.textContent || elem.innerText) {
            strings.push(escapeText(elem.textContent || elem.innerText))
        } else if (elem.innerHTML) {
            strings.push(elem.innerHTML)
        }

        strings.push("</" + tagname + ">")
    }

    return strings.join("")
}

function isProperty(elem, key) {
    var type = typeof elem[key]

    if (key === "style" && Object.keys(elem.style).length > 0) {
      return true
    }

    return elem.hasOwnProperty(key) &&
        (type === "string" || type === "boolean" || type === "number") &&
        key !== "nodeName" && key !== "className" && key !== "tagName" &&
        key !== "textContent" && key !== "innerText" && key !== "namespaceURI" &&  key !== "innerHTML"
}

function stylify(styles) {
    var attr = ""
    Object.keys(styles).forEach(function (key) {
        var value = styles[key]
        key = key.replace(/[A-Z]/g, function(c) {
            return "-" + c.toLowerCase();
        })
        attr += key + ":" + value + ";"
    })
    return attr
}

function datasetify(elem) {
    var ds = elem.dataset
    var props = []

    for (var key in ds) {
        props.push({ name: "data-" + key, value: ds[key] })
    }

    return props.length ? stringify(props) : ""
}

function stringify(list) {
    var attributes = []
    list.forEach(function (tuple) {
        var name = tuple.name
        var value = tuple.value

        if (name === "style") {
            value = stylify(value)
        }

        attributes.push(name + "=" + "\"" + escapeAttributeValue(value) + "\"")
    })

    return attributes.length ? " " + attributes.join(" ") : ""
}

function properties(elem) {
    var props = []
    for (var key in elem) {
        if (isProperty(elem, key)) {
            props.push({ name: key, value: elem[key] })
        }
    }

    for (var ns in elem._attributes) {
      for (var attribute in elem._attributes[ns]) {
        var prop = elem._attributes[ns][attribute]
        var name = (prop.prefix ? prop.prefix + ":" : "") + attribute
        props.push({ name: name, value: prop.value })
      }
    }

    if (elem.className) {
        props.push({ name: "class", value: elem.className })
    }

    return props.length ? stringify(props) : ""
}

function escapeText(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

function escapeAttributeValue(str) {
    return escapeText(str).replace(/"/g, "&quot;")
}

return {
    module: (typeof module !== "undefined") ? module : null,
    voidElements: (typeof voidElements !== "undefined") ? voidElements : null,
    serializeNode: (typeof serializeNode !== "undefined") ? serializeNode : null,
    escapeText: (typeof escapeText !== "undefined") ? escapeText : null,
    serializeElement: (typeof serializeElement !== "undefined") ? serializeElement : null,
    properties: (typeof properties !== "undefined") ? properties : null,
    datasetify: (typeof datasetify !== "undefined") ? datasetify : null,
    isProperty: (typeof isProperty !== "undefined") ? isProperty : null,
    Object: (typeof Object !== "undefined") ? Object : null,
    stylify: (typeof stylify !== "undefined") ? stylify : null,
    stringify: (typeof stringify !== "undefined") ? stringify : null,
    escapeAttributeValue: (typeof escapeAttributeValue !== "undefined") ? escapeAttributeValue : null
};
}
, {"filename":"../min-document/serialize.js","variation":""});
// @pinf-bundle-module: {"file":"../min-document/dom-fragment.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/dom-fragment.js"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/dom-fragment.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../min-document';
var DOMElement = require("./dom-element.js")

module.exports = DocumentFragment

function DocumentFragment(owner) {
    if (!(this instanceof DocumentFragment)) {
        return new DocumentFragment()
    }

    this.childNodes = []
    this.parentNode = null
    this.ownerDocument = owner || null
}

DocumentFragment.prototype.type = "DocumentFragment"
DocumentFragment.prototype.nodeType = 11
DocumentFragment.prototype.nodeName = "#document-fragment"

DocumentFragment.prototype.appendChild  = DOMElement.prototype.appendChild
DocumentFragment.prototype.replaceChild = DOMElement.prototype.replaceChild
DocumentFragment.prototype.removeChild  = DOMElement.prototype.removeChild

DocumentFragment.prototype.toString =
    function _DocumentFragment_toString() {
        return this.childNodes.map(function (node) {
            return String(node)
        }).join("")
    }

return {
    DOMElement: (typeof DOMElement !== "undefined") ? DOMElement : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    DocumentFragment: (typeof DocumentFragment !== "undefined") ? DocumentFragment : null,
    String: (typeof String !== "undefined") ? String : null
};
}
, {"filename":"../min-document/dom-fragment.js","variation":""});
// @pinf-bundle-module: {"file":"../min-document/event.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/event.js"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/event.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../min-document';
module.exports = Event

function Event(family) {}

Event.prototype.initEvent = function _Event_initEvent(type, bubbles, cancelable) {
    this.type = type
    this.bubbles = bubbles
    this.cancelable = cancelable
}

Event.prototype.preventDefault = function _Event_preventDefault() {
    
}

return {
    module: (typeof module !== "undefined") ? module : null,
    Event: (typeof Event !== "undefined") ? Event : null
};
}
, {"filename":"../min-document/event.js","variation":""});
// @pinf-bundle-module: {"file":"../dom-delegator/dom-delegator.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/dom-delegator.js"}
require.memoize("188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/dom-delegator.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../dom-delegator';
var globalDocument = require("global/document")
var EvStore = require("ev-store")
var createStore = require("weakmap-shim/create-store")

var addEvent = require("./add-event.js")
var removeEvent = require("./remove-event.js")
var ProxyEvent = require("./proxy-event.js")

var HANDLER_STORE = createStore()

module.exports = DOMDelegator

function DOMDelegator(document) {
    if (!(this instanceof DOMDelegator)) {
        return new DOMDelegator(document);
    }

    document = document || globalDocument

    this.target = document.documentElement
    this.events = {}
    this.rawEventListeners = {}
    this.globalListeners = {}
}

DOMDelegator.prototype.addEventListener = addEvent
DOMDelegator.prototype.removeEventListener = removeEvent

DOMDelegator.allocateHandle =
    function allocateHandle(func) {
        var handle = new Handle()

        HANDLER_STORE(handle).func = func;

        return handle
    }

DOMDelegator.transformHandle =
    function transformHandle(handle, broadcast) {
        var func = HANDLER_STORE(handle).func

        return this.allocateHandle(function (ev) {
            broadcast(ev, func);
        })
    }

DOMDelegator.prototype.addGlobalEventListener =
    function addGlobalEventListener(eventName, fn) {
        var listeners = this.globalListeners[eventName] || [];
        if (listeners.indexOf(fn) === -1) {
            listeners.push(fn)
        }

        this.globalListeners[eventName] = listeners;
    }

DOMDelegator.prototype.removeGlobalEventListener =
    function removeGlobalEventListener(eventName, fn) {
        var listeners = this.globalListeners[eventName] || [];

        var index = listeners.indexOf(fn)
        if (index !== -1) {
            listeners.splice(index, 1)
        }
    }

DOMDelegator.prototype.listenTo = function listenTo(eventName) {
    if (!(eventName in this.events)) {
        this.events[eventName] = 0;
    }

    this.events[eventName]++;

    if (this.events[eventName] !== 1) {
        return
    }

    var listener = this.rawEventListeners[eventName]
    if (!listener) {
        listener = this.rawEventListeners[eventName] =
            createHandler(eventName, this)
    }

    this.target.addEventListener(eventName, listener, true)
}

DOMDelegator.prototype.unlistenTo = function unlistenTo(eventName) {
    if (!(eventName in this.events)) {
        this.events[eventName] = 0;
    }

    if (this.events[eventName] === 0) {
        throw new Error("already unlistened to event.");
    }

    this.events[eventName]--;

    if (this.events[eventName] !== 0) {
        return
    }

    var listener = this.rawEventListeners[eventName]

    if (!listener) {
        throw new Error("dom-delegator#unlistenTo: cannot " +
            "unlisten to " + eventName)
    }

    this.target.removeEventListener(eventName, listener, true)
}

function createHandler(eventName, delegator) {
    var globalListeners = delegator.globalListeners;
    var delegatorTarget = delegator.target;

    return handler

    function handler(ev) {
        var globalHandlers = globalListeners[eventName] || []

        if (globalHandlers.length > 0) {
            var globalEvent = new ProxyEvent(ev);
            globalEvent.currentTarget = delegatorTarget;
            callListeners(globalHandlers, globalEvent)
        }

        findAndInvokeListeners(ev.target, ev, eventName)
    }
}

function findAndInvokeListeners(elem, ev, eventName) {
    var listener = getListener(elem, eventName)

    if (listener && listener.handlers.length > 0) {
        var listenerEvent = new ProxyEvent(ev);
        listenerEvent.currentTarget = listener.currentTarget
        callListeners(listener.handlers, listenerEvent)

        if (listenerEvent._bubbles) {
            var nextTarget = listener.currentTarget.parentNode
            findAndInvokeListeners(nextTarget, ev, eventName)
        }
    }
}

function getListener(target, type) {
    // terminate recursion if parent is `null`
    if (target === null || typeof target === "undefined") {
        return null
    }

    var events = EvStore(target)
    // fetch list of handler fns for this event
    var handler = events[type]
    var allHandler = events.event

    if (!handler && !allHandler) {
        return getListener(target.parentNode, type)
    }

    var handlers = [].concat(handler || [], allHandler || [])
    return new Listener(target, handlers)
}

function callListeners(handlers, ev) {
    handlers.forEach(function (handler) {
        if (typeof handler === "function") {
            handler(ev)
        } else if (typeof handler.handleEvent === "function") {
            handler.handleEvent(ev)
        } else if (handler.type === "dom-delegator-handle") {
            HANDLER_STORE(handler).func(ev)
        } else {
            throw new Error("dom-delegator: unknown handler " +
                "found: " + JSON.stringify(handlers));
        }
    })
}

function Listener(target, handlers) {
    this.currentTarget = target
    this.handlers = handlers
}

function Handle() {
    this.type = "dom-delegator-handle"
}

return {
    globalDocument: (typeof globalDocument !== "undefined") ? globalDocument : null,
    require: (typeof require !== "undefined") ? require : null,
    EvStore: (typeof EvStore !== "undefined") ? EvStore : null,
    createStore: (typeof createStore !== "undefined") ? createStore : null,
    addEvent: (typeof addEvent !== "undefined") ? addEvent : null,
    removeEvent: (typeof removeEvent !== "undefined") ? removeEvent : null,
    ProxyEvent: (typeof ProxyEvent !== "undefined") ? ProxyEvent : null,
    HANDLER_STORE: (typeof HANDLER_STORE !== "undefined") ? HANDLER_STORE : null,
    module: (typeof module !== "undefined") ? module : null,
    DOMDelegator: (typeof DOMDelegator !== "undefined") ? DOMDelegator : null,
    createHandler: (typeof createHandler !== "undefined") ? createHandler : null,
    callListeners: (typeof callListeners !== "undefined") ? callListeners : null,
    findAndInvokeListeners: (typeof findAndInvokeListeners !== "undefined") ? findAndInvokeListeners : null,
    getListener: (typeof getListener !== "undefined") ? getListener : null,
    Listener: (typeof Listener !== "undefined") ? Listener : null,
    Handle: (typeof Handle !== "undefined") ? Handle : null
};
}
, {"filename":"../dom-delegator/dom-delegator.js","variation":""});
// @pinf-bundle-module: {"file":"../ev-store/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"8e106d5677990df298bfc71bb4226fd7f310abfa-ev-store/index.js"}
require.memoize("8e106d5677990df298bfc71bb4226fd7f310abfa-ev-store/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../ev-store';
'use strict';

var OneVersionConstraint = require('individual/one-version');

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}

return {
    OneVersionConstraint: (typeof OneVersionConstraint !== "undefined") ? OneVersionConstraint : null,
    require: (typeof require !== "undefined") ? require : null,
    MY_VERSION: (typeof MY_VERSION !== "undefined") ? MY_VERSION : null,
    hashKey: (typeof hashKey !== "undefined") ? hashKey : null,
    module: (typeof module !== "undefined") ? module : null,
    EvStore: (typeof EvStore !== "undefined") ? EvStore : null
};
}
, {"filename":"../ev-store/index.js","variation":""});
// @pinf-bundle-module: {"file":"../ev-store/node_modules/individual/one-version.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"069cdb460b03a4609646e8111164c92d58ea0494-individual/one-version.js"}
require.memoize("069cdb460b03a4609646e8111164c92d58ea0494-individual/one-version.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../ev-store/node_modules/individual';
'use strict';

var Individual = require('./index.js');

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' +
            moduleName + '.\n' +
            'You already have version ' + versionValue +
            ' installed.\n' +
            'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}

return {
    Individual: (typeof Individual !== "undefined") ? Individual : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    OneVersion: (typeof OneVersion !== "undefined") ? OneVersion : null
};
}
, {"filename":"../ev-store/node_modules/individual/one-version.js","variation":""});
// @pinf-bundle-module: {"file":"../ev-store/node_modules/individual/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"069cdb460b03a4609646e8111164c92d58ea0494-individual/index.js"}
require.memoize("069cdb460b03a4609646e8111164c92d58ea0494-individual/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../ev-store/node_modules/individual';
'use strict';

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

return {
    root: (typeof root !== "undefined") ? root : null,
    window: (typeof window !== "undefined") ? window : null,
    global: (typeof global !== "undefined") ? global : null,
    module: (typeof module !== "undefined") ? module : null,
    Individual: (typeof Individual !== "undefined") ? Individual : null
};
}
, {"filename":"../ev-store/node_modules/individual/index.js","variation":""});
// @pinf-bundle-module: {"file":"../weakmap-shim/create-store.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"d2dd073247e4f84cb840cd764bf6f2f953e4d71a-weakmap-shim/create-store.js"}
require.memoize("d2dd073247e4f84cb840cd764bf6f2f953e4d71a-weakmap-shim/create-store.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../weakmap-shim';
var hiddenStore = require('./hidden-store.js');

module.exports = createStore;

function createStore() {
    var key = {};

    return function (obj) {
        if ((typeof obj !== 'object' || obj === null) &&
            typeof obj !== 'function'
        ) {
            throw new Error('Weakmap-shim: Key must be object')
        }

        var store = obj.valueOf(key);
        return store && store.identity === key ?
            store : hiddenStore(obj, key);
    };
}

return {
    hiddenStore: (typeof hiddenStore !== "undefined") ? hiddenStore : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    createStore: (typeof createStore !== "undefined") ? createStore : null
};
}
, {"filename":"../weakmap-shim/create-store.js","variation":""});
// @pinf-bundle-module: {"file":"../weakmap-shim/hidden-store.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"d2dd073247e4f84cb840cd764bf6f2f953e4d71a-weakmap-shim/hidden-store.js"}
require.memoize("d2dd073247e4f84cb840cd764bf6f2f953e4d71a-weakmap-shim/hidden-store.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../weakmap-shim';
module.exports = hiddenStore;

function hiddenStore(obj, key) {
    var store = { identity: key };
    var valueOf = obj.valueOf;

    Object.defineProperty(obj, "valueOf", {
        value: function (value) {
            return value !== key ?
                valueOf.apply(this, arguments) : store;
        },
        writable: true
    });

    return store;
}

return {
    module: (typeof module !== "undefined") ? module : null,
    hiddenStore: (typeof hiddenStore !== "undefined") ? hiddenStore : null,
    Object: (typeof Object !== "undefined") ? Object : null
};
}
, {"filename":"../weakmap-shim/hidden-store.js","variation":""});
// @pinf-bundle-module: {"file":"../dom-delegator/add-event.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/add-event.js"}
require.memoize("188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/add-event.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../dom-delegator';
var EvStore = require("ev-store")

module.exports = addEvent

function addEvent(target, type, handler) {
    var events = EvStore(target)
    var event = events[type]

    if (!event) {
        events[type] = handler
    } else if (Array.isArray(event)) {
        if (event.indexOf(handler) === -1) {
            event.push(handler)
        }
    } else if (event !== handler) {
        events[type] = [event, handler]
    }
}

return {
    EvStore: (typeof EvStore !== "undefined") ? EvStore : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    addEvent: (typeof addEvent !== "undefined") ? addEvent : null,
    Array: (typeof Array !== "undefined") ? Array : null
};
}
, {"filename":"../dom-delegator/add-event.js","variation":""});
// @pinf-bundle-module: {"file":"../dom-delegator/remove-event.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/remove-event.js"}
require.memoize("188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/remove-event.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../dom-delegator';
var EvStore = require("ev-store")

module.exports = removeEvent

function removeEvent(target, type, handler) {
    var events = EvStore(target)
    var event = events[type]

    if (!event) {
        return
    } else if (Array.isArray(event)) {
        var index = event.indexOf(handler)
        if (index !== -1) {
            event.splice(index, 1)
        }
    } else if (event === handler) {
        events[type] = null
    }
}

return {
    EvStore: (typeof EvStore !== "undefined") ? EvStore : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    removeEvent: (typeof removeEvent !== "undefined") ? removeEvent : null,
    Array: (typeof Array !== "undefined") ? Array : null
};
}
, {"filename":"../dom-delegator/remove-event.js","variation":""});
// @pinf-bundle-module: {"file":"../dom-delegator/proxy-event.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/proxy-event.js"}
require.memoize("188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/proxy-event.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../dom-delegator';
var inherits = require("inherits")

var ALL_PROPS = [
    "altKey", "bubbles", "cancelable", "ctrlKey",
    "eventPhase", "metaKey", "relatedTarget", "shiftKey",
    "target", "timeStamp", "type", "view", "which"
]
var KEY_PROPS = ["char", "charCode", "key", "keyCode"]
var MOUSE_PROPS = [
    "button", "buttons", "clientX", "clientY", "layerX",
    "layerY", "offsetX", "offsetY", "pageX", "pageY",
    "screenX", "screenY", "toElement"
]

var rkeyEvent = /^key|input/
var rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/

module.exports = ProxyEvent

function ProxyEvent(ev) {
    if (!(this instanceof ProxyEvent)) {
        return new ProxyEvent(ev)
    }

    if (rkeyEvent.test(ev.type)) {
        return new KeyEvent(ev)
    } else if (rmouseEvent.test(ev.type)) {
        return new MouseEvent(ev)
    }

    for (var i = 0; i < ALL_PROPS.length; i++) {
        var propKey = ALL_PROPS[i]
        this[propKey] = ev[propKey]
    }

    this._rawEvent = ev
    this._bubbles = false;
}

ProxyEvent.prototype.preventDefault = function () {
    this._rawEvent.preventDefault()
}

ProxyEvent.prototype.startPropagation = function () {
    this._bubbles = true;
}

function MouseEvent(ev) {
    for (var i = 0; i < ALL_PROPS.length; i++) {
        var propKey = ALL_PROPS[i]
        this[propKey] = ev[propKey]
    }

    for (var j = 0; j < MOUSE_PROPS.length; j++) {
        var mousePropKey = MOUSE_PROPS[j]
        this[mousePropKey] = ev[mousePropKey]
    }

    this._rawEvent = ev
}

inherits(MouseEvent, ProxyEvent)

function KeyEvent(ev) {
    for (var i = 0; i < ALL_PROPS.length; i++) {
        var propKey = ALL_PROPS[i]
        this[propKey] = ev[propKey]
    }

    for (var j = 0; j < KEY_PROPS.length; j++) {
        var keyPropKey = KEY_PROPS[j]
        this[keyPropKey] = ev[keyPropKey]
    }

    this._rawEvent = ev
}

inherits(KeyEvent, ProxyEvent)

return {
    inherits: (typeof inherits !== "undefined") ? inherits : null,
    require: (typeof require !== "undefined") ? require : null,
    ALL_PROPS: (typeof ALL_PROPS !== "undefined") ? ALL_PROPS : null,
    KEY_PROPS: (typeof KEY_PROPS !== "undefined") ? KEY_PROPS : null,
    MOUSE_PROPS: (typeof MOUSE_PROPS !== "undefined") ? MOUSE_PROPS : null,
    rkeyEvent: (typeof rkeyEvent !== "undefined") ? rkeyEvent : null,
    rmouseEvent: (typeof rmouseEvent !== "undefined") ? rmouseEvent : null,
    module: (typeof module !== "undefined") ? module : null,
    ProxyEvent: (typeof ProxyEvent !== "undefined") ? ProxyEvent : null,
    MouseEvent: (typeof MouseEvent !== "undefined") ? MouseEvent : null,
    KeyEvent: (typeof KeyEvent !== "undefined") ? KeyEvent : null
};
}
, {"filename":"../dom-delegator/proxy-event.js","variation":""});
// @pinf-bundle-module: {"file":"../inherits/inherits.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"a42e50050a54413069e6526883e41b54232ecb51-inherits/inherits.js"}
require.memoize("a42e50050a54413069e6526883e41b54232ecb51-inherits/inherits.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../inherits';
module.exports = require('__SYSTEM__/util').inherits

return {
    module: (typeof module !== "undefined") ? module : null,
    require: (typeof require !== "undefined") ? require : null
};
}
, {"filename":"../inherits/inherits.js","variation":""});
// @pinf-bundle-module: {"file":"../value-event/event.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/event.js"}
require.memoize("a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/event.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../value-event';
var BaseEvent = require('./base-event.js');

module.exports = BaseEvent(eventLambda);

function eventLambda(ev, broadcast) {
    broadcast(this.data);
}

return {
    BaseEvent: (typeof BaseEvent !== "undefined") ? BaseEvent : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    eventLambda: (typeof eventLambda !== "undefined") ? eventLambda : null
};
}
, {"filename":"../value-event/event.js","variation":""});
// @pinf-bundle-module: {"file":"../value-event/value.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/value.js"}
require.memoize("a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/value.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../value-event';
var extend = require('xtend')
var getFormData = require('form-data-set/element')

var BaseEvent = require('./base-event.js');

module.exports = BaseEvent(valueLambda);

function valueLambda(ev, broadcast) {
    var value = getFormData(ev.currentTarget)
    var data = extend(value, this.data)

    broadcast(data);
}

return {
    extend: (typeof extend !== "undefined") ? extend : null,
    require: (typeof require !== "undefined") ? require : null,
    getFormData: (typeof getFormData !== "undefined") ? getFormData : null,
    BaseEvent: (typeof BaseEvent !== "undefined") ? BaseEvent : null,
    module: (typeof module !== "undefined") ? module : null,
    valueLambda: (typeof valueLambda !== "undefined") ? valueLambda : null
};
}
, {"filename":"../value-event/value.js","variation":""});
// @pinf-bundle-module: {"file":"../value-event/node_modules/xtend/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"822968178ae54008cf98ee66ff499fa2be684578-xtend/index.js"}
require.memoize("822968178ae54008cf98ee66ff499fa2be684578-xtend/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../value-event/node_modules/xtend';
var hasKeys = require("./has-keys")

module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        if (!hasKeys(source)) {
            continue
        }

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

return {
    hasKeys: (typeof hasKeys !== "undefined") ? hasKeys : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    extend: (typeof extend !== "undefined") ? extend : null
};
}
, {"filename":"../value-event/node_modules/xtend/index.js","variation":""});
// @pinf-bundle-module: {"file":"../value-event/node_modules/xtend/has-keys.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"822968178ae54008cf98ee66ff499fa2be684578-xtend/has-keys.js"}
require.memoize("822968178ae54008cf98ee66ff499fa2be684578-xtend/has-keys.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../value-event/node_modules/xtend';
module.exports = hasKeys

function hasKeys(source) {
    return source !== null &&
        (typeof source === "object" ||
        typeof source === "function")
}

return {
    module: (typeof module !== "undefined") ? module : null,
    hasKeys: (typeof hasKeys !== "undefined") ? hasKeys : null
};
}
, {"filename":"../value-event/node_modules/xtend/has-keys.js","variation":""});
// @pinf-bundle-module: {"file":"../form-data-set/element.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"09e6f92cd04eda1fe09b6753906b14604f3493e5-form-data-set/element.js"}
require.memoize("09e6f92cd04eda1fe09b6753906b14604f3493e5-form-data-set/element.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../form-data-set';
var walk = require('dom-walk')

var FormData = require('./index.js')

module.exports = getFormData

function buildElems(rootElem) {
    var hash = {}
    if (rootElem.name) {
    	hash[rootElem.name] = rootElem
    }

    walk(rootElem, function (child) {
        if (child.name) {
            hash[child.name] = child
        }
    })


    return hash
}

function getFormData(rootElem) {
    var elements = buildElems(rootElem)

    return FormData(elements)
}

return {
    walk: (typeof walk !== "undefined") ? walk : null,
    require: (typeof require !== "undefined") ? require : null,
    FormData: (typeof FormData !== "undefined") ? FormData : null,
    module: (typeof module !== "undefined") ? module : null,
    buildElems: (typeof buildElems !== "undefined") ? buildElems : null,
    getFormData: (typeof getFormData !== "undefined") ? getFormData : null
};
}
, {"filename":"../form-data-set/element.js","variation":""});
// @pinf-bundle-module: {"file":"../form-data-set/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"09e6f92cd04eda1fe09b6753906b14604f3493e5-form-data-set/index.js"}
require.memoize("09e6f92cd04eda1fe09b6753906b14604f3493e5-form-data-set/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../form-data-set';
/*jshint maxcomplexity: 10*/

module.exports = FormData

//TODO: Massive spec: http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#constructing-form-data-set
function FormData(elements) {
    return Object.keys(elements).reduce(function (acc, key) {
        var elem = elements[key]

        acc[key] = valueOfElement(elem)

        return acc
    }, {})
}

function valueOfElement(elem) {
    if (typeof elem === "function") {
        return elem()
    } else if (containsRadio(elem)) {
        var elems = toList(elem)
        var checked = elems.filter(function (elem) {
            return elem.checked
        })[0] || null

        return checked ? checked.value : null
    } else if (Array.isArray(elem)) {
        return elem.map(valueOfElement).filter(filterNull)
    } else if (elem.tagName === undefined && elem.nodeType === undefined) {
        return FormData(elem)
    } else if (elem.tagName === "INPUT" && isChecked(elem)) {
        if (elem.hasAttribute("value")) {
            return elem.checked ? elem.value : null
        } else {
            return elem.checked
        }
    } else if (elem.tagName === "INPUT") {
        return elem.value
    } else if (elem.tagName === "TEXTAREA") {
        return elem.value
    } else if (elem.tagName === "SELECT") {
        return elem.value
    }
}

function isChecked(elem) {
    return elem.type === "checkbox" || elem.type === "radio"
}

function containsRadio(value) {
    if (value.tagName || value.nodeType) {
        return false
    }

    var elems = toList(value)

    return elems.some(function (elem) {
        return elem.tagName === "INPUT" && elem.type === "radio"
    })
}

function toList(value) {
    if (Array.isArray(value)) {
        return value
    }

    return Object.keys(value).map(prop, value)
}

function prop(x) {
    return this[x]
}

function filterNull(val) {
    return val !== null
}

return {
    module: (typeof module !== "undefined") ? module : null,
    FormData: (typeof FormData !== "undefined") ? FormData : null,
    valueOfElement: (typeof valueOfElement !== "undefined") ? valueOfElement : null,
    Object: (typeof Object !== "undefined") ? Object : null,
    containsRadio: (typeof containsRadio !== "undefined") ? containsRadio : null,
    toList: (typeof toList !== "undefined") ? toList : null,
    Array: (typeof Array !== "undefined") ? Array : null,
    filterNull: (typeof filterNull !== "undefined") ? filterNull : null,
    isChecked: (typeof isChecked !== "undefined") ? isChecked : null,
    prop: (typeof prop !== "undefined") ? prop : null
};
}
, {"filename":"../form-data-set/index.js","variation":""});
// @pinf-bundle-module: {"file":"../value-event/submit.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/submit.js"}
require.memoize("a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/submit.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../value-event';
var extend = require('xtend')
var getFormData = require('form-data-set/element')

var BaseEvent = require('./base-event.js');

var ENTER = 13

module.exports = BaseEvent(submitLambda);

function submitLambda(ev, broadcast) {
    var target = ev.target

    var isValid =
        (ev.type === 'submit' && target.tagName === 'FORM') ||
        (ev.type === 'click' && target.tagName === 'BUTTON') ||
        (ev.type === 'click' && target.type === 'submit') ||
        (
            (target.type === 'text') &&
            (ev.keyCode === ENTER && ev.type === 'keydown')
        )

    if (!isValid) {
        if (ev.startPropagation) {
            ev.startPropagation()
        }
        return
    }

    var value = getFormData(ev.currentTarget)
    var data = extend(value, this.data)

    if (ev.preventDefault) {
        ev.preventDefault();
    }

    broadcast(data);
}

return {
    extend: (typeof extend !== "undefined") ? extend : null,
    require: (typeof require !== "undefined") ? require : null,
    getFormData: (typeof getFormData !== "undefined") ? getFormData : null,
    BaseEvent: (typeof BaseEvent !== "undefined") ? BaseEvent : null,
    ENTER: (typeof ENTER !== "undefined") ? ENTER : null,
    module: (typeof module !== "undefined") ? module : null,
    submitLambda: (typeof submitLambda !== "undefined") ? submitLambda : null
};
}
, {"filename":"../value-event/submit.js","variation":""});
// @pinf-bundle-module: {"file":"../value-event/change.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/change.js"}
require.memoize("a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/change.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../value-event';
var extend = require('xtend')
var getFormData = require('form-data-set/element')

var BaseEvent = require('./base-event.js')

var VALID_CHANGE = ['checkbox', 'file', 'select-multiple', 'select-one'];
var VALID_INPUT = ['color', 'date', 'datetime', 'datetime-local', 'email',
    'month', 'number', 'password', 'range', 'search', 'tel', 'text', 'time',
    'url', 'week'];

module.exports = BaseEvent(changeLambda);

function changeLambda(ev, broadcast) {
    var target = ev.target

    var isValid =
        (ev.type === 'input' && VALID_INPUT.indexOf(target.type) !== -1) ||
        (ev.type === 'change' && VALID_CHANGE.indexOf(target.type) !== -1);

    if (!isValid) {
        if (ev.startPropagation) {
            ev.startPropagation()
        }
        return
    }

    var value = getFormData(ev.currentTarget)
    var data = extend(value, this.data)

    broadcast(data)
}

return {
    extend: (typeof extend !== "undefined") ? extend : null,
    require: (typeof require !== "undefined") ? require : null,
    getFormData: (typeof getFormData !== "undefined") ? getFormData : null,
    BaseEvent: (typeof BaseEvent !== "undefined") ? BaseEvent : null,
    VALID_CHANGE: (typeof VALID_CHANGE !== "undefined") ? VALID_CHANGE : null,
    VALID_INPUT: (typeof VALID_INPUT !== "undefined") ? VALID_INPUT : null,
    module: (typeof module !== "undefined") ? module : null,
    changeLambda: (typeof changeLambda !== "undefined") ? changeLambda : null
};
}
, {"filename":"../value-event/change.js","variation":""});
// @pinf-bundle-module: {"file":"../value-event/key.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/key.js"}
require.memoize("a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/key.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../value-event';
var BaseEvent = require('./base-event.js');

module.exports = BaseEvent(keyLambda);

function keyLambda(ev, broadcast) {
    var key = this.opts.key;

    if (ev.keyCode === key) {
        broadcast(this.data);
    }
}

return {
    BaseEvent: (typeof BaseEvent !== "undefined") ? BaseEvent : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    keyLambda: (typeof keyLambda !== "undefined") ? keyLambda : null
};
}
, {"filename":"../value-event/key.js","variation":""});
// @pinf-bundle-module: {"file":"../value-event/click.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/click.js"}
require.memoize("a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/click.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../value-event';
var BaseEvent = require('./base-event.js');

module.exports = BaseEvent(clickLambda);

function clickLambda(ev, broadcast) {
    var opts = this.opts;

    if (!opts.ctrl && ev.ctrlKey) {
        return;
    }

    if (!opts.meta && ev.metaKey) {
        return;
    }

    if (!opts.rightClick && ev.which === 2) {
        return;
    }

    if (this.opts.preventDefault && ev.preventDefault) {
        ev.preventDefault();
    }

    broadcast(this.data);
}

return {
    BaseEvent: (typeof BaseEvent !== "undefined") ? BaseEvent : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    clickLambda: (typeof clickLambda !== "undefined") ? clickLambda : null
};
}
, {"filename":"../value-event/click.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-array/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/index.js"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-array';
var Observ = require("observ")

// circular dep between ArrayMethods & this file
module.exports = ObservArray

var splice = require("./splice.js")
var put = require("./put.js")
var set = require("./set.js")
var transaction = require("./transaction.js")
var ArrayMethods = require("./array-methods.js")
var addListener = require("./add-listener.js")


/*  ObservArray := (Array<T>) => Observ<
        Array<T> & { _diff: Array }
    > & {
        splice: (index: Number, amount: Number, rest...: T) =>
            Array<T>,
        push: (values...: T) => Number,
        filter: (lambda: Function, thisValue: Any) => Array<T>,
        indexOf: (item: T, fromIndex: Number) => Number
    }

    Fix to make it more like ObservHash.

    I.e. you write observables into it.
        reading methods take plain JS objects to read
        and the value of the array is always an array of plain
        objsect.

        The observ array instance itself would have indexed
        properties that are the observables
*/
function ObservArray(initialList) {
    // list is the internal mutable list observ instances that
    // all methods on `obs` dispatch to.
    var list = initialList
    var initialState = []

    // copy state out of initialList into initialState
    list.forEach(function (observ, index) {
        initialState[index] = typeof observ === "function" ?
            observ() : observ
    })

    var obs = Observ(initialState)
    obs.splice = splice

    // override set and store original for later use
    obs._observSet = obs.set
    obs.set = set

    obs.get = get
    obs.getLength = getLength
    obs.put = put
    obs.transaction = transaction

    // you better not mutate this list directly
    // this is the list of observs instances
    obs._list = list

    var removeListeners = list.map(function (observ) {
        return typeof observ === "function" ?
            addListener(obs, observ) :
            null
    });
    // this is a list of removal functions that must be called
    // when observ instances are removed from `obs.list`
    // not calling this means we do not GC our observ change
    // listeners. Which causes rage bugs
    obs._removeListeners = removeListeners

    obs._type = "observ-array"
    obs._version = "3"

    return ArrayMethods(obs, list)
}

function get(index) {
    return this._list[index]
}

function getLength() {
    return this._list.length
}

return {
    Observ: (typeof Observ !== "undefined") ? Observ : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    splice: (typeof splice !== "undefined") ? splice : null,
    put: (typeof put !== "undefined") ? put : null,
    set: (typeof set !== "undefined") ? set : null,
    transaction: (typeof transaction !== "undefined") ? transaction : null,
    ArrayMethods: (typeof ArrayMethods !== "undefined") ? ArrayMethods : null,
    addListener: (typeof addListener !== "undefined") ? addListener : null,
    ObservArray: (typeof ObservArray !== "undefined") ? ObservArray : null,
    get: (typeof get !== "undefined") ? get : null,
    getLength: (typeof getLength !== "undefined") ? getLength : null
};
}
, {"filename":"../observ-array/index.js","variation":""});
// @pinf-bundle-module: {"file":"../observ/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"763f9fee82cab36f35fe21dc7804803adeb52177-observ/index.js"}
require.memoize("763f9fee82cab36f35fe21dc7804803adeb52177-observ/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ';
module.exports = Observable

function Observable(value) {
    var listeners = []
    value = value === undefined ? null : value

    observable.set = function (v) {
        value = v
        listeners.forEach(function (f) {
            f(v)
        })
    }

    return observable

    function observable(listener) {
        if (!listener) {
            return value
        }

        listeners.push(listener)

        return function remove() {
            listeners.splice(listeners.indexOf(listener), 1)
        }
    }
}

return {
    module: (typeof module !== "undefined") ? module : null,
    Observable: (typeof Observable !== "undefined") ? Observable : null
};
}
, {"filename":"../observ/index.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-array/splice.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/splice.js"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/splice.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-array';
var slice = Array.prototype.slice

var addListener = require("./add-listener.js")
var setNonEnumerable = require("./lib/set-non-enumerable.js");

module.exports = splice

// `obs.splice` is a mutable implementation of `splice()`
// that mutates both `list` and the internal `valueList` that
// is the current value of `obs` itself
function splice(index, amount) {
    var obs = this
    var args = slice.call(arguments, 0)
    var valueList = obs().slice()

    // generate a list of args to mutate the internal
    // list of only obs
    var valueArgs = args.map(function (value, index) {
        if (index === 0 || index === 1) {
            return value
        }

        // must unpack observables that we are adding
        return typeof value === "function" ? value() : value
    })

    valueList.splice.apply(valueList, valueArgs)
    // we remove the observs that we remove
    var removed = obs._list.splice.apply(obs._list, args)

    var extraRemoveListeners = args.slice(2).map(function (observ) {
        return typeof observ === "function" ?
            addListener(obs, observ) :
            null
    })
    extraRemoveListeners.unshift(args[0], args[1])
    var removedListeners = obs._removeListeners.splice
        .apply(obs._removeListeners, extraRemoveListeners)

    removedListeners.forEach(function (removeObservListener) {
        if (removeObservListener) {
            removeObservListener()
        }
    })

    setNonEnumerable(valueList, "_diff", [valueArgs])

    obs._observSet(valueList)
    return removed
}

return {
    slice: (typeof slice !== "undefined") ? slice : null,
    Array: (typeof Array !== "undefined") ? Array : null,
    addListener: (typeof addListener !== "undefined") ? addListener : null,
    require: (typeof require !== "undefined") ? require : null,
    setNonEnumerable: (typeof setNonEnumerable !== "undefined") ? setNonEnumerable : null,
    module: (typeof module !== "undefined") ? module : null,
    splice: (typeof splice !== "undefined") ? splice : null
};
}
, {"filename":"../observ-array/splice.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-array/add-listener.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/add-listener.js"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/add-listener.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-array';
var setNonEnumerable = require("./lib/set-non-enumerable.js");

module.exports = addListener

function addListener(observArray, observ) {
    var list = observArray._list

    return observ(function (value) {
        var valueList =  observArray().slice()
        var index = list.indexOf(observ)

        // This code path should never hit. If this happens
        // there's a bug in the cleanup code
        if (index === -1) {
            var message = "observ-array: Unremoved observ listener"
            var err = new Error(message)
            err.list = list
            err.index = index
            err.observ = observ
            throw err
        }

        valueList.splice(index, 1, value)
        setNonEnumerable(valueList, "_diff", [ [index, 1, value] ])

        observArray._observSet(valueList)
    })
}

return {
    setNonEnumerable: (typeof setNonEnumerable !== "undefined") ? setNonEnumerable : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    addListener: (typeof addListener !== "undefined") ? addListener : null
};
}
, {"filename":"../observ-array/add-listener.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-array/lib/set-non-enumerable.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/lib/set-non-enumerable.js"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/lib/set-non-enumerable.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-array/lib';
module.exports = setNonEnumerable;

function setNonEnumerable(object, key, value) {
    Object.defineProperty(object, key, {
        value: value,
        writable: true,
        configurable: true,
        enumerable: false
    });
}

return {
    module: (typeof module !== "undefined") ? module : null,
    setNonEnumerable: (typeof setNonEnumerable !== "undefined") ? setNonEnumerable : null,
    Object: (typeof Object !== "undefined") ? Object : null
};
}
, {"filename":"../observ-array/lib/set-non-enumerable.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-array/put.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/put.js"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/put.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-array';
var addListener = require("./add-listener.js")
var setNonEnumerable = require("./lib/set-non-enumerable.js");

module.exports = put

// `obs.put` is a mutable implementation of `array[index] = value`
// that mutates both `list` and the internal `valueList` that
// is the current value of `obs` itself
function put(index, value) {
    var obs = this
    var valueList = obs().slice()

    var originalLength = valueList.length
    valueList[index] = typeof value === "function" ? value() : value

    obs._list[index] = value

    // remove past value listener if was observ
    var removeListener = obs._removeListeners[index]
    if (removeListener){
        removeListener()
    }

    // add listener to value if observ
    obs._removeListeners[index] = typeof value === "function" ?
        addListener(obs, value) :
        null

    // fake splice diff
    var valueArgs = index < originalLength ? 
        [index, 1, valueList[index]] :
        [index, 0, valueList[index]]

    setNonEnumerable(valueList, "_diff", [valueArgs])

    obs._observSet(valueList)
    return value
}
return {
    addListener: (typeof addListener !== "undefined") ? addListener : null,
    require: (typeof require !== "undefined") ? require : null,
    setNonEnumerable: (typeof setNonEnumerable !== "undefined") ? setNonEnumerable : null,
    module: (typeof module !== "undefined") ? module : null,
    put: (typeof put !== "undefined") ? put : null
};
}
, {"filename":"../observ-array/put.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-array/set.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/set.js"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/set.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-array';
var applyPatch = require("./apply-patch.js")
var setNonEnumerable = require("./lib/set-non-enumerable.js")
var adiff = require("adiff")

module.exports = set

function set(rawList) {
    if (!Array.isArray(rawList)) rawList = []

    var obs = this
    var changes = adiff.diff(obs._list, rawList)
    var valueList = obs().slice()

    var valueChanges = changes.map(applyPatch.bind(obs, valueList))

    setNonEnumerable(valueList, "_diff", valueChanges)

    obs._observSet(valueList)
    return changes
}

return {
    applyPatch: (typeof applyPatch !== "undefined") ? applyPatch : null,
    require: (typeof require !== "undefined") ? require : null,
    setNonEnumerable: (typeof setNonEnumerable !== "undefined") ? setNonEnumerable : null,
    adiff: (typeof adiff !== "undefined") ? adiff : null,
    module: (typeof module !== "undefined") ? module : null,
    set: (typeof set !== "undefined") ? set : null,
    Array: (typeof Array !== "undefined") ? Array : null
};
}
, {"filename":"../observ-array/set.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-array/apply-patch.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/apply-patch.js"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/apply-patch.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-array';
var addListener = require('./add-listener.js')

module.exports = applyPatch

function applyPatch (valueList, args) {
    var obs = this
    var valueArgs = args.map(unpack)

    valueList.splice.apply(valueList, valueArgs)
    obs._list.splice.apply(obs._list, args)

    var extraRemoveListeners = args.slice(2).map(function (observ) {
        return typeof observ === "function" ?
            addListener(obs, observ) :
            null
    })

    extraRemoveListeners.unshift(args[0], args[1])
    var removedListeners = obs._removeListeners.splice
        .apply(obs._removeListeners, extraRemoveListeners)

    removedListeners.forEach(function (removeObservListener) {
        if (removeObservListener) {
            removeObservListener()
        }
    })

    return valueArgs
}

function unpack(value, index){
    if (index === 0 || index === 1) {
        return value
    }
    return typeof value === "function" ? value() : value
}

return {
    addListener: (typeof addListener !== "undefined") ? addListener : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    applyPatch: (typeof applyPatch !== "undefined") ? applyPatch : null,
    unpack: (typeof unpack !== "undefined") ? unpack : null
};
}
, {"filename":"../observ-array/apply-patch.js","variation":""});
// @pinf-bundle-module: {"file":"../adiff/index.js","mtime":0,"wrapper":"commonjs","format":"commonjs","variation":"","id":"940ee15dbc47ffff9aab0426eb8d652731895883-adiff/index.js"}
require.memoize("940ee15dbc47ffff9aab0426eb8d652731895883-adiff/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../adiff';
function head (a) {
  return a[0]
}

function last (a) {
  return a[a.length - 1]
}

function tail(a) {
  return a.slice(1)
}

function retreat (e) {
  return e.pop()
}

function hasLength (e) {
  return e.length
}

function any(ary, test) {
  for(var i=0;i<ary.length;i++)
    if(test(ary[i]))
      return true
  return false
}

function score (a) {
  return a.reduce(function (s, a) {
      return s + a.length + a[1] + 1
  }, 0)
}

function best (a, b) {
  return score(a) <= score(b) ? a : b
}


var _rules // set at the bottom  

// note, naive implementation. will break on circular objects.

function _equal(a, b) {
  if(a && !b) return false
  if(Array.isArray(a))
    if(a.length != b.length) return false
  if(a && 'object' == typeof a) {
    for(var i in a)
      if(!_equal(a[i], b[i])) return false
    for(var i in b)
      if(!_equal(a[i], b[i])) return false
    return true
  }
  return a == b
}

function getArgs(args) {
  return args.length == 1 ? args[0] : [].slice.call(args)
}

// return the index of the element not like the others, or -1
function oddElement(ary, cmp) {
  var c
  function guess(a) {
    var odd = -1
    c = 0
    for (var i = a; i < ary.length; i ++) {
      if(!cmp(ary[a], ary[i])) {
        odd = i, c++
      }
    }
    return c > 1 ? -1 : odd
  }
  //assume that it is the first element.
  var g = guess(0)
  if(-1 != g) return g
  //0 was the odd one, then all the other elements are equal
  //else there more than one different element
  guess(1)
  return c == 0 ? 0 : -1
}
var exports = module.exports = function (deps, exports) {
  var equal = (deps && deps.equal) || _equal
  exports = exports || {} 
  exports.lcs = 
  function lcs() {
    var cache = {}
    var args = getArgs(arguments)
    var a = args[0], b = args[1]

    function key (a,b){
      return a.length + ':' + b.length
    }

    //find length that matches at the head

    if(args.length > 2) {
      //if called with multiple sequences
      //recurse, since lcs(a, b, c, d) == lcs(lcs(a,b), lcs(c,d))
      args.push(lcs(args.shift(), args.shift()))
      return lcs(args)
    }
    
    //this would be improved by truncating input first
    //and not returning an lcs as an intermediate step.
    //untill that is a performance problem.

    var start = 0, end = 0
    for(var i = 0; i < a.length && i < b.length 
      && equal(a[i], b[i])
      ; i ++
    )
      start = i + 1

    if(a.length === start)
      return a.slice()

    for(var i = 0;  i < a.length - start && i < b.length - start
      && equal(a[a.length - 1 - i], b[b.length - 1 - i])
      ; i ++
    )
      end = i

    function recurse (a, b) {
      if(!a.length || !b.length) return []
      //avoid exponential time by caching the results
      if(cache[key(a, b)]) return cache[key(a, b)]

      if(equal(a[0], b[0]))
        return [head(a)].concat(recurse(tail(a), tail(b)))
      else { 
        var _a = recurse(tail(a), b)
        var _b = recurse(a, tail(b))
        return cache[key(a,b)] = _a.length > _b.length ? _a : _b  
      }
    }
    
    var middleA = a.slice(start, a.length - end)
    var middleB = b.slice(start, b.length - end)

    return (
      a.slice(0, start).concat(
        recurse(middleA, middleB)
      ).concat(a.slice(a.length - end))
    )
  }

  // given n sequences, calc the lcs, and then chunk strings into stable and unstable sections.
  // unstable chunks are passed to build
  exports.chunk =
  function (q, build) {
    var q = q.map(function (e) { return e.slice() })
    var lcs = exports.lcs.apply(null, q)
    var all = [lcs].concat(q)

    function matchLcs (e) {
      if(e.length && !lcs.length || !e.length && lcs.length)
        return false //incase the last item is null
      return equal(last(e), last(lcs)) || ((e.length + lcs.length) === 0)
    }

    while(any(q, hasLength)) {
      //if each element is at the lcs then this chunk is stable.
      while(q.every(matchLcs) && q.every(hasLength))
        all.forEach(retreat)
      //collect the changes in each array upto the next match with the lcs
      var c = false
      var unstable = q.map(function (e) {
        var change = []
        while(!matchLcs(e)) {
          change.unshift(retreat(e))
          c = true
        }
        return change
      })
      if(c) build(q[0].length, unstable)
    }
  }

  //calculate a diff this is only updates
  exports.optimisticDiff =
  function (a, b) {
    var M = Math.max(a.length, b.length)
    var m = Math.min(a.length, b.length)
    var patch = []
    for(var i = 0; i < M; i++)
      if(a[i] !== b[i]) {
        var cur = [i,0], deletes = 0
        while(a[i] !== b[i] && i < m) {
          cur[1] = ++deletes
          cur.push(b[i++])
        }
        //the rest are deletes or inserts
        if(i >= m) {
          //the rest are deletes
          if(a.length > b.length)
            cur[1] += a.length - b.length
          //the rest are inserts
          else if(a.length < b.length)
            cur = cur.concat(b.slice(a.length))
        }
        patch.push(cur)
      }

    return patch
  }

  exports.diff =
  function (a, b) {
    var optimistic = exports.optimisticDiff(a, b)
    var changes = []
    exports.chunk([a, b], function (index, unstable) {
      var del = unstable.shift().length
      var insert = unstable.shift()
      changes.push([index, del].concat(insert))
    })
    return best(optimistic, changes)
  }

  exports.patch = function (a, changes, mutate) {
    if(mutate !== true) a = a.slice(a)//copy a
    changes.forEach(function (change) {
      [].splice.apply(a, change)
    })
    return a
  }

  // http://en.wikipedia.org/wiki/Concestor
  // me, concestor, you...
  exports.merge = function () {
    var args = getArgs(arguments)
    var patch = exports.diff3(args)
    return exports.patch(args[0], patch)
  }

  exports.diff3 = function () {
    var args = getArgs(arguments)
    var r = []
    exports.chunk(args, function (index, unstable) {
      var mine = unstable[0]
      var insert = resolve(unstable)
      if(equal(mine, insert)) return 
      r.push([index, mine.length].concat(insert)) 
    })
    return r
  }
  exports.oddOneOut =
    function oddOneOut (changes) {
      changes = changes.slice()
      //put the concestor first
      changes.unshift(changes.splice(1,1)[0])
      var i = oddElement(changes, equal)
      if(i == 0) // concestor was different, 'false conflict'
        return changes[1]
      if (~i)
        return changes[i] 
    }
  exports.insertMergeOverDelete = 
    //i've implemented this as a seperate rule,
    //because I had second thoughts about this.
    function insertMergeOverDelete (changes) {
      changes = changes.slice()
      changes.splice(1,1)// remove concestor
      
      //if there is only one non empty change thats okay.
      //else full confilct
      for (var i = 0, nonempty; i < changes.length; i++)
        if(changes[i].length) 
          if(!nonempty) nonempty = changes[i]
          else return // full conflict
      return nonempty
    }

  var rules = (deps && deps.rules) || [exports.oddOneOut, exports.insertMergeOverDelete]

  function resolve (changes) {
    var l = rules.length
    for (var i in rules) { // first
      
      var c = rules[i] && rules[i](changes)
      if(c) return c
    }
    changes.splice(1,1) // remove concestor
    //returning the conflicts as an object is a really bad idea,
    // because == will not detect they are the same. and conflicts build.
    // better to use
    // '<<<<<<<<<<<<<'
    // of course, i wrote this before i started on snob, so i didn't know that then.
    /*var conflict = ['>>>>>>>>>>>>>>>>']
    while(changes.length)
      conflict = conflict.concat(changes.shift()).concat('============')
    conflict.pop()
    conflict.push          ('<<<<<<<<<<<<<<<')
    changes.unshift       ('>>>>>>>>>>>>>>>')
    return conflict*/
    //nah, better is just to use an equal can handle objects
    return {'?': changes}
  }
  return exports
}
exports(null, exports)

}
, {"filename":"../adiff/index.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-array/transaction.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/transaction.js"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/transaction.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-array';
module.exports = transaction

function transaction (func) {
    var obs = this
    var rawList = obs._list.slice()

    if (func(rawList) !== false){ // allow cancel
        return obs.set(rawList)
    }

}
return {
    module: (typeof module !== "undefined") ? module : null,
    transaction: (typeof transaction !== "undefined") ? transaction : null
};
}
, {"filename":"../observ-array/transaction.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-array/array-methods.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/array-methods.js"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/array-methods.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-array';
var ObservArray = require("./index.js")

var slice = Array.prototype.slice

var ARRAY_METHODS = [
    "concat", "slice", "every", "filter", "forEach", "indexOf",
    "join", "lastIndexOf", "map", "reduce", "reduceRight",
    "some", "toString", "toLocaleString"
]

var methods = ARRAY_METHODS.map(function (name) {
    return [name, function () {
        var res = this._list[name].apply(this._list, arguments)

        if (res && Array.isArray(res)) {
            res = ObservArray(res)
        }

        return res
    }]
})

module.exports = ArrayMethods

function ArrayMethods(obs) {
    obs.push = observArrayPush
    obs.pop = observArrayPop
    obs.shift = observArrayShift
    obs.unshift = observArrayUnshift
    obs.reverse = require("./array-reverse.js")
    obs.sort = require("./array-sort.js")

    methods.forEach(function (tuple) {
        obs[tuple[0]] = tuple[1]
    })
    return obs
}



function observArrayPush() {
    var args = slice.call(arguments)
    args.unshift(this._list.length, 0)
    this.splice.apply(this, args)

    return this._list.length
}
function observArrayPop() {
    return this.splice(this._list.length - 1, 1)[0]
}
function observArrayShift() {
    return this.splice(0, 1)[0]
}
function observArrayUnshift() {
    var args = slice.call(arguments)
    args.unshift(0, 0)
    this.splice.apply(this, args)

    return this._list.length
}


function notImplemented() {
    throw new Error("Pull request welcome")
}

return {
    ObservArray: (typeof ObservArray !== "undefined") ? ObservArray : null,
    require: (typeof require !== "undefined") ? require : null,
    slice: (typeof slice !== "undefined") ? slice : null,
    Array: (typeof Array !== "undefined") ? Array : null,
    ARRAY_METHODS: (typeof ARRAY_METHODS !== "undefined") ? ARRAY_METHODS : null,
    methods: (typeof methods !== "undefined") ? methods : null,
    module: (typeof module !== "undefined") ? module : null,
    ArrayMethods: (typeof ArrayMethods !== "undefined") ? ArrayMethods : null,
    observArrayPush: (typeof observArrayPush !== "undefined") ? observArrayPush : null,
    observArrayPop: (typeof observArrayPop !== "undefined") ? observArrayPop : null,
    observArrayShift: (typeof observArrayShift !== "undefined") ? observArrayShift : null,
    observArrayUnshift: (typeof observArrayUnshift !== "undefined") ? observArrayUnshift : null,
    notImplemented: (typeof notImplemented !== "undefined") ? notImplemented : null
};
}
, {"filename":"../observ-array/array-methods.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-array/array-reverse.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/array-reverse.js"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/array-reverse.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-array';
var applyPatch = require("./apply-patch.js")
var setNonEnumerable = require('./lib/set-non-enumerable.js')

module.exports = reverse

function reverse() {
    var obs = this
    var changes = fakeDiff(obs._list.slice().reverse())
    var valueList = obs().slice().reverse()

    var valueChanges = changes.map(applyPatch.bind(obs, valueList))

    setNonEnumerable(valueList, "_diff", valueChanges)

    obs._observSet(valueList)
    return changes
}

function fakeDiff(arr) {
    var _diff
    var len = arr.length

    if(len % 2) {
        var midPoint = (len -1) / 2
        var a = [0, midPoint].concat(arr.slice(0, midPoint))
        var b = [midPoint +1, midPoint].concat(arr.slice(midPoint +1, len))
        var _diff = [a, b]
    } else {
        _diff = [ [0, len].concat(arr) ]
    }

    return _diff
}

return {
    applyPatch: (typeof applyPatch !== "undefined") ? applyPatch : null,
    require: (typeof require !== "undefined") ? require : null,
    setNonEnumerable: (typeof setNonEnumerable !== "undefined") ? setNonEnumerable : null,
    module: (typeof module !== "undefined") ? module : null,
    reverse: (typeof reverse !== "undefined") ? reverse : null,
    fakeDiff: (typeof fakeDiff !== "undefined") ? fakeDiff : null
};
}
, {"filename":"../observ-array/array-reverse.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-array/array-sort.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/array-sort.js"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/array-sort.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-array';
var applyPatch = require("./apply-patch.js")
var setNonEnumerable = require("./lib/set-non-enumerable.js")

module.exports = sort

function sort(compare) {
    var obs = this
    var list = obs._list.slice()

    var unpacked = unpack(list)

    var sorted = unpacked
            .map(function(it) { return it.val })
            .sort(compare)

    var packed = repack(sorted, unpacked)

    //fake diff - for perf
    //adiff on 10k items === ~3200ms
    //fake on 10k items === ~110ms
    var changes = [ [ 0, packed.length ].concat(packed) ]

    var valueChanges = changes.map(applyPatch.bind(obs, sorted))

    setNonEnumerable(sorted, "_diff", valueChanges)

    obs._observSet(sorted)
    return changes
}

function unpack(list) {
    var unpacked = []
    for(var i = 0; i < list.length; i++) {
        unpacked.push({
            val: ("function" == typeof list[i]) ? list[i]() : list[i],
            obj: list[i]
        })
    }
    return unpacked
}

function repack(sorted, unpacked) {
    var packed = []

    while(sorted.length) {
        var s = sorted.shift()
        var indx = indexOf(s, unpacked)
        if(~indx) packed.push(unpacked.splice(indx, 1)[0].obj)
    }

    return packed
}

function indexOf(n, h) {
    for(var i = 0; i < h.length; i++) {
        if(n === h[i].val) return i
    }
    return -1
}

return {
    applyPatch: (typeof applyPatch !== "undefined") ? applyPatch : null,
    require: (typeof require !== "undefined") ? require : null,
    setNonEnumerable: (typeof setNonEnumerable !== "undefined") ? setNonEnumerable : null,
    module: (typeof module !== "undefined") ? module : null,
    sort: (typeof sort !== "undefined") ? sort : null,
    unpack: (typeof unpack !== "undefined") ? unpack : null,
    repack: (typeof repack !== "undefined") ? repack : null,
    indexOf: (typeof indexOf !== "undefined") ? indexOf : null
};
}
, {"filename":"../observ-array/array-sort.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-struct/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"18225cba6f52ea4ccb31cf78cf073fe680ca694b-observ-struct/index.js"}
require.memoize("18225cba6f52ea4ccb31cf78cf073fe680ca694b-observ-struct/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-struct';
var Observ = require("observ")
var extend = require("xtend")

var blackList = ["name", "_diff", "_type", "_version"]
var blackListReasons = {
    "name": "Clashes with `Function.prototype.name`.\n",
    "_diff": "_diff is reserved key of observ-struct.\n",
    "_type": "_type is reserved key of observ-struct.\n",
    "_version": "_version is reserved key of observ-struct.\n"
}
var NO_TRANSACTION = {}

function setNonEnumerable(object, key, value) {
    Object.defineProperty(object, key, {
        value: value,
        writable: true,
        configurable: true,
        enumerable: false
    })
}

/* ObservStruct := (Object<String, Observ<T>>) => 
    Object<String, Observ<T>> &
        Observ<Object<String, T> & {
            _diff: Object<String, Any>
        }>

*/
module.exports = ObservStruct

function ObservStruct(struct) {
    var keys = Object.keys(struct)

    var initialState = {}
    var currentTransaction = NO_TRANSACTION
    var nestedTransaction = NO_TRANSACTION

    keys.forEach(function (key) {
        if (blackList.indexOf(key) !== -1) {
            throw new Error("cannot create an observ-struct " +
                "with a key named '" + key + "'.\n" +
                blackListReasons[key]);
        }

        var observ = struct[key]
        initialState[key] = typeof observ === "function" ?
            observ() : observ
    })

    var obs = Observ(initialState)
    keys.forEach(function (key) {
        var observ = struct[key]
        obs[key] = observ

        if (typeof observ === "function") {
            observ(function (value) {
                if (nestedTransaction === value) {
                    return
                }

                var state = extend(obs())
                state[key] = value
                var diff = {}
                diff[key] = value && value._diff ?
                    value._diff : value

                setNonEnumerable(state, "_diff", diff)
                currentTransaction = state
                obs.set(state)
                currentTransaction = NO_TRANSACTION
            })
        }
    })
    var _set = obs.set
    obs.set = function trackDiff(value) {
        if (currentTransaction === value) {
            return _set(value)
        }

        var newState = extend(value)
        setNonEnumerable(newState, "_diff", value)
        _set(newState)
    }

    obs(function (newState) {
        if (currentTransaction === newState) {
            return
        }

        keys.forEach(function (key) {
            var observ = struct[key]
            var newObservValue = newState[key]

            if (typeof observ === "function" &&
                observ() !== newObservValue
            ) {
                nestedTransaction = newObservValue
                observ.set(newState[key])
                nestedTransaction = NO_TRANSACTION
            }
        })
    })

    obs._type = "observ-struct"
    obs._version = "5"

    return obs
}

return {
    Observ: (typeof Observ !== "undefined") ? Observ : null,
    require: (typeof require !== "undefined") ? require : null,
    extend: (typeof extend !== "undefined") ? extend : null,
    blackList: (typeof blackList !== "undefined") ? blackList : null,
    blackListReasons: (typeof blackListReasons !== "undefined") ? blackListReasons : null,
    NO_TRANSACTION: (typeof NO_TRANSACTION !== "undefined") ? NO_TRANSACTION : null,
    setNonEnumerable: (typeof setNonEnumerable !== "undefined") ? setNonEnumerable : null,
    Object: (typeof Object !== "undefined") ? Object : null,
    module: (typeof module !== "undefined") ? module : null,
    ObservStruct: (typeof ObservStruct !== "undefined") ? ObservStruct : null
};
}
, {"filename":"../observ-struct/index.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-struct/node_modules/xtend/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"1d83ab096fb740c2fae8491c4cd4ad2e18f011f7-xtend/index.js"}
require.memoize("1d83ab096fb740c2fae8491c4cd4ad2e18f011f7-xtend/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-struct/node_modules/xtend';
module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

return {
    module: (typeof module !== "undefined") ? module : null,
    extend: (typeof extend !== "undefined") ? extend : null
};
}
, {"filename":"../observ-struct/node_modules/xtend/index.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-varhash/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"3e8f5ffc0eec6592bd0d1b847bf253210576b5cd-observ-varhash/index.js"}
require.memoize("3e8f5ffc0eec6592bd0d1b847bf253210576b5cd-observ-varhash/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-varhash';
var Observ = require('observ')
var extend = require('xtend')

var NO_TRANSACTION = {}

module.exports = ObservVarhash

function ObservVarhash (hash, createValue) {
  createValue = createValue || function (obj) { return obj }

  var initialState = {}
  var currentTransaction = NO_TRANSACTION
  var nestedTransaction = NO_TRANSACTION

  var obs = Observ(initialState)
  setNonEnumerable(obs, '_removeListeners', {})

  setNonEnumerable(obs, 'get', get.bind(obs))
  setNonEnumerable(obs, 'put', put.bind(obs))
  setNonEnumerable(obs, 'delete', del.bind(obs))

  for (var key in hash) {
    obs[key] = isFn(hash[key]) ? hash[key] : createValue(hash[key], key)

    if (isFn(obs[key])) {
      obs._removeListeners[key] = obs[key](watch(obs, key))
    }
  }

  var _set = obs.set

  obs.set = function trackDiff (value) {
    if (currentTransaction === value) {
      return _set(value)
    }

    var newState = extend(value)
    setNonEnumerable(newState, '_diff', value)

    _set(newState)
  }

  var newState = {}
  for (key in hash) {
    var observ = obs[key]
    checkKey(key)
    newState[key] = isFn(observ) ? observ() : observ
  }
  obs.set(newState)

  obs(function (newState) {
    if (currentTransaction === newState) {
      return
    }

    for (var key in hash) {
      var observ = hash[key]
      var newObservValue = newState[key]

      if (isFn(observ) && observ() !== newState[key]) {
        nestedTransaction = newObservValue
        observ.set(newState[key])
        nestedTransaction = NO_TRANSACTION
      }
    }
  })

  function put (key, val) {
    checkKey(key)

    if (val === undefined) {
      throw new Error('cannot varhash.put(key, undefined).')
    }

    var observ = isFn(val) ? val : createValue(val, key)
    var state = extend(this())

    state[key] = isFn(observ) ? observ() : observ

    if (isFn(this._removeListeners[key])) {
      this._removeListeners[key]()
    }

    this._removeListeners[key] = isFn(observ)
      ? observ(watch(this, key)) : null

    setNonEnumerable(state, '_diff', diff(key, state[key]))

    this[key] = observ

    currentTransaction = state
    _set(state)
    currentTransaction = NO_TRANSACTION

    return this
  }

  function del (key) {
    var state = extend(this())
    if (isFn(this._removeListeners[key])) {
      this._removeListeners[key]()
    }

    delete this._removeListeners[key]
    delete state[key]
    delete this[key]

    setNonEnumerable(state, '_diff', diff(key, undefined))
    _set(state)

    return this
  }

  return obs

  // processing
  function watch (obs, key) {
    return function (value) {
      if (nestedTransaction === value) {
        return
      }

      var state = extend(obs())
      state[key] = value

      setNonEnumerable(state, '_diff', diff(key, value))

      currentTransaction = state
      obs.set(state)
      currentTransaction = NO_TRANSACTION
    }
  }
}

// access and mutate
function get (key) {
  return this[key]
}

function diff (key, value) {
  var obj = {}
  obj[key] = value && value._diff ? value._diff : value
  return obj
}

function isFn (obj) {
  return typeof obj === 'function'
}

function setNonEnumerable (object, key, value) {
  Object.defineProperty(object, key, {
    value: value,
    writable: true,
    configurable: true,
    enumerable: false
  })
}

// errors
var blacklist = {
  name: 'Clashes with `Function.prototype.name`.',
  get: 'get is a reserved key of observ-varhash method',
  put: 'put is a reserved key of observ-varhash method',
  'delete': 'delete is a reserved key of observ-varhash method',
  _diff: '_diff is a reserved key of observ-varhash method',
  _removeListeners: '_removeListeners is a reserved key of observ-varhash'
}

function checkKey (key) {
  if (!blacklist[key]) return
  throw new Error(
    'cannot create an observ-varhash with key `' + key + '`. ' + blacklist[key]
  )
}

return {
    Observ: (typeof Observ !== "undefined") ? Observ : null,
    require: (typeof require !== "undefined") ? require : null,
    extend: (typeof extend !== "undefined") ? extend : null,
    NO_TRANSACTION: (typeof NO_TRANSACTION !== "undefined") ? NO_TRANSACTION : null,
    module: (typeof module !== "undefined") ? module : null,
    ObservVarhash: (typeof ObservVarhash !== "undefined") ? ObservVarhash : null,
    setNonEnumerable: (typeof setNonEnumerable !== "undefined") ? setNonEnumerable : null,
    get: (typeof get !== "undefined") ? get : null,
    isFn: (typeof isFn !== "undefined") ? isFn : null,
    checkKey: (typeof checkKey !== "undefined") ? checkKey : null,
    diff: (typeof diff !== "undefined") ? diff : null,
    Object: (typeof Object !== "undefined") ? Object : null,
    blacklist: (typeof blacklist !== "undefined") ? blacklist : null
};
}
, {"filename":"../observ-varhash/index.js","variation":""});
// @pinf-bundle-module: {"file":"../observ-varhash/node_modules/xtend/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"0c321377f76ba4f1037f8b0fcd64cfc56c192488-xtend/index.js"}
require.memoize("0c321377f76ba4f1037f8b0fcd64cfc56c192488-xtend/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ-varhash/node_modules/xtend';
module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

return {
    module: (typeof module !== "undefined") ? module : null,
    extend: (typeof extend !== "undefined") ? extend : null
};
}
, {"filename":"../observ-varhash/node_modules/xtend/index.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vtree/diff.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vtree/diff.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vtree/diff.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vtree';
var isArray = require("x-is-array")

var VPatch = require("../vnode/vpatch")
var isVNode = require("../vnode/is-vnode")
var isVText = require("../vnode/is-vtext")
var isWidget = require("../vnode/is-widget")
var isThunk = require("../vnode/is-thunk")
var handleThunk = require("../vnode/handle-thunk")

var diffProps = require("./diff-props")

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true;
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var bChildren = reorder(aChildren, b.children)

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (bChildren.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, bChildren.moves))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b);
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true;
        }
    }

    return false;
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {

    var bKeys = keyIndex(bChildren)

    if (!bKeys) {
        return bChildren
    }

    var aKeys = keyIndex(aChildren)

    if (!aKeys) {
        return bChildren
    }

    var bMatch = {}, aMatch = {}

    for (var aKey in bKeys) {
        bMatch[bKeys[aKey]] = aKeys[aKey]
    }

    for (var bKey in aKeys) {
        aMatch[aKeys[bKey]] = bKeys[bKey]
    }

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen
    var shuffle = []
    var freeIndex = 0
    var i = 0
    var moveIndex = 0
    var moves = {}
    var removes = moves.removes = {}
    var reverse = moves.reverse = {}
    var hasMoves = false

    while (freeIndex < len) {
        var move = aMatch[i]
        if (move !== undefined) {
            shuffle[i] = bChildren[move]
            if (move !== moveIndex) {
                moves[move] = moveIndex
                reverse[moveIndex] = move
                hasMoves = true
            }
            moveIndex++
        } else if (i in aMatch) {
            shuffle[i] = undefined
            removes[i] = moveIndex++
            hasMoves = true
        } else {
            while (bMatch[freeIndex] !== undefined) {
                freeIndex++
            }

            if (freeIndex < len) {
                var freeChild = bChildren[freeIndex]
                if (freeChild) {
                    shuffle[i] = freeChild
                    if (freeIndex !== moveIndex) {
                        hasMoves = true
                        moves[freeIndex] = moveIndex
                        reverse[moveIndex] = freeIndex
                    }
                    moveIndex++
                }
                freeIndex++
            }
        }
        i++
    }

    if (hasMoves) {
        shuffle.moves = moves
    }

    return shuffle
}

function keyIndex(children) {
    var i, keys

    for (i = 0; i < children.length; i++) {
        var child = children[i]

        if (child.key !== undefined) {
            keys = keys || {}
            keys[child.key] = i
        }
    }

    return keys
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}

return {
    isArray: (typeof isArray !== "undefined") ? isArray : null,
    require: (typeof require !== "undefined") ? require : null,
    VPatch: (typeof VPatch !== "undefined") ? VPatch : null,
    isVNode: (typeof isVNode !== "undefined") ? isVNode : null,
    isVText: (typeof isVText !== "undefined") ? isVText : null,
    isWidget: (typeof isWidget !== "undefined") ? isWidget : null,
    isThunk: (typeof isThunk !== "undefined") ? isThunk : null,
    handleThunk: (typeof handleThunk !== "undefined") ? handleThunk : null,
    diffProps: (typeof diffProps !== "undefined") ? diffProps : null,
    module: (typeof module !== "undefined") ? module : null,
    diff: (typeof diff !== "undefined") ? diff : null,
    walk: (typeof walk !== "undefined") ? walk : null,
    thunks: (typeof thunks !== "undefined") ? thunks : null,
    clearState: (typeof clearState !== "undefined") ? clearState : null,
    appendPatch: (typeof appendPatch !== "undefined") ? appendPatch : null,
    diffChildren: (typeof diffChildren !== "undefined") ? diffChildren : null,
    reorder: (typeof reorder !== "undefined") ? reorder : null,
    unhook: (typeof unhook !== "undefined") ? unhook : null,
    destroyWidgets: (typeof destroyWidgets !== "undefined") ? destroyWidgets : null,
    hasPatches: (typeof hasPatches !== "undefined") ? hasPatches : null,
    undefinedKeys: (typeof undefinedKeys !== "undefined") ? undefinedKeys : null,
    keyIndex: (typeof keyIndex !== "undefined") ? keyIndex : null
};
}
, {"filename":"../virtual-dom/vtree/diff.js","variation":""});
// @pinf-bundle-module: {"file":"../x-is-array/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"7e70e8113b08f862aa24c1f5e47959e7f8915019-x-is-array/index.js"}
require.memoize("7e70e8113b08f862aa24c1f5e47959e7f8915019-x-is-array/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../x-is-array';
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

return {
    nativeIsArray: (typeof nativeIsArray !== "undefined") ? nativeIsArray : null,
    Array: (typeof Array !== "undefined") ? Array : null,
    Object: (typeof Object !== "undefined") ? Object : null,
    module: (typeof module !== "undefined") ? module : null,
    isArray: (typeof isArray !== "undefined") ? isArray : null
};
}
, {"filename":"../x-is-array/index.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vnode/vpatch.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/vpatch.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/vpatch.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vnode';
var version = require("./version")

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"

return {
    version: (typeof version !== "undefined") ? version : null,
    require: (typeof require !== "undefined") ? require : null,
    VirtualPatch: (typeof VirtualPatch !== "undefined") ? VirtualPatch : null,
    module: (typeof module !== "undefined") ? module : null,
    Number: (typeof Number !== "undefined") ? Number : null
};
}
, {"filename":"../virtual-dom/vnode/vpatch.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vnode/version.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/version.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/version.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vnode';
module.exports = "1"

return {
    module: (typeof module !== "undefined") ? module : null
};
}
, {"filename":"../virtual-dom/vnode/version.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vnode/is-vnode.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/is-vnode.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/is-vnode.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vnode';
var version = require("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}

return {
    version: (typeof version !== "undefined") ? version : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    isVirtualNode: (typeof isVirtualNode !== "undefined") ? isVirtualNode : null
};
}
, {"filename":"../virtual-dom/vnode/is-vnode.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vnode/is-vtext.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/is-vtext.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/is-vtext.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vnode';
var version = require("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}

return {
    version: (typeof version !== "undefined") ? version : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    isVirtualText: (typeof isVirtualText !== "undefined") ? isVirtualText : null
};
}
, {"filename":"../virtual-dom/vnode/is-vtext.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vnode/is-widget.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/is-widget.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/is-widget.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vnode';
module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}

return {
    module: (typeof module !== "undefined") ? module : null,
    isWidget: (typeof isWidget !== "undefined") ? isWidget : null
};
}
, {"filename":"../virtual-dom/vnode/is-widget.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vnode/is-thunk.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/is-thunk.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/is-thunk.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vnode';
module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}

return {
    module: (typeof module !== "undefined") ? module : null,
    isThunk: (typeof isThunk !== "undefined") ? isThunk : null
};
}
, {"filename":"../virtual-dom/vnode/is-thunk.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vnode/handle-thunk.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/handle-thunk.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/handle-thunk.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vnode';
var isVNode = require("./is-vnode")
var isVText = require("./is-vtext")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}

return {
    isVNode: (typeof isVNode !== "undefined") ? isVNode : null,
    require: (typeof require !== "undefined") ? require : null,
    isVText: (typeof isVText !== "undefined") ? isVText : null,
    isWidget: (typeof isWidget !== "undefined") ? isWidget : null,
    isThunk: (typeof isThunk !== "undefined") ? isThunk : null,
    module: (typeof module !== "undefined") ? module : null,
    handleThunk: (typeof handleThunk !== "undefined") ? handleThunk : null,
    renderThunk: (typeof renderThunk !== "undefined") ? renderThunk : null
};
}
, {"filename":"../virtual-dom/vnode/handle-thunk.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vtree/diff-props.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vtree/diff-props.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vtree/diff-props.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vtree';
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook")

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}

return {
    isObject: (typeof isObject !== "undefined") ? isObject : null,
    require: (typeof require !== "undefined") ? require : null,
    isHook: (typeof isHook !== "undefined") ? isHook : null,
    module: (typeof module !== "undefined") ? module : null,
    diffProps: (typeof diffProps !== "undefined") ? diffProps : null,
    getPrototype: (typeof getPrototype !== "undefined") ? getPrototype : null,
    Object: (typeof Object !== "undefined") ? Object : null
};
}
, {"filename":"../virtual-dom/vtree/diff-props.js","variation":""});
// @pinf-bundle-module: {"file":"../is-object/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"612ea617e4c6ef171db6393340a654971edd1f12-is-object/index.js"}
require.memoize("612ea617e4c6ef171db6393340a654971edd1f12-is-object/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../is-object';
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

return {
    module: (typeof module !== "undefined") ? module : null
};
}
, {"filename":"../is-object/index.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vnode/is-vhook.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/is-vhook.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/is-vhook.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vnode';
module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}

return {
    module: (typeof module !== "undefined") ? module : null,
    isHook: (typeof isHook !== "undefined") ? isHook : null
};
}
, {"filename":"../virtual-dom/vnode/is-vhook.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vdom/patch.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/patch.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/patch.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vdom';
var document = require("global/document")
var isArray = require("x-is-array")

var domIndex = require("./dom-index")
var patchOp = require("./patch-op")
module.exports = patch

function patch(rootNode, patches) {
    return patchRecursive(rootNode, patches)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions) {
        renderOptions = { patch: patchRecursive }
        if (ownerDocument !== document) {
            renderOptions.document = ownerDocument
        }
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}

return {
    document: (typeof document !== "undefined") ? document : null,
    require: (typeof require !== "undefined") ? require : null,
    isArray: (typeof isArray !== "undefined") ? isArray : null,
    domIndex: (typeof domIndex !== "undefined") ? domIndex : null,
    patchOp: (typeof patchOp !== "undefined") ? patchOp : null,
    module: (typeof module !== "undefined") ? module : null,
    patch: (typeof patch !== "undefined") ? patch : null,
    patchRecursive: (typeof patchRecursive !== "undefined") ? patchRecursive : null,
    patchIndices: (typeof patchIndices !== "undefined") ? patchIndices : null,
    applyPatch: (typeof applyPatch !== "undefined") ? applyPatch : null,
    Number: (typeof Number !== "undefined") ? Number : null
};
}
, {"filename":"../virtual-dom/vdom/patch.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vdom/dom-index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/dom-index.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/dom-index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vdom';
// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

return {
    noChild: (typeof noChild !== "undefined") ? noChild : null,
    module: (typeof module !== "undefined") ? module : null,
    domIndex: (typeof domIndex !== "undefined") ? domIndex : null,
    ascending: (typeof ascending !== "undefined") ? ascending : null,
    recurse: (typeof recurse !== "undefined") ? recurse : null,
    indexInRange: (typeof indexInRange !== "undefined") ? indexInRange : null
};
}
, {"filename":"../virtual-dom/vdom/dom-index.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vdom/patch-op.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/patch-op.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/patch-op.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vdom';
var applyProperties = require("./apply-properties")

var isWidget = require("../vnode/is-widget.js")
var VPatch = require("../vnode/vpatch.js")

var render = require("./create-element")
var updateWidget = require("./update-widget")

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = render(vText, renderOptions)

        if (parentNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = render(vNode, renderOptions)

    if (parentNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, bIndex) {
    var children = []
    var childNodes = domNode.childNodes
    var len = childNodes.length
    var i
    var reverseIndex = bIndex.reverse

    for (i = 0; i < len; i++) {
        children.push(domNode.childNodes[i])
    }

    var insertOffset = 0
    var move
    var node
    var insertNode
    var chainLength
    var insertedLength
    var nextSibling
    for (i = 0; i < len;) {
        move = bIndex[i]
        chainLength = 1
        if (move !== undefined && move !== i) {
            // try to bring forward as long of a chain as possible
            while (bIndex[i + chainLength] === move + chainLength) {
                chainLength++;
            }

            // the element currently at this index will be moved later so increase the insert offset
            if (reverseIndex[i] > i + chainLength) {
                insertOffset++
            }

            node = children[move]
            insertNode = childNodes[i + insertOffset] || null
            insertedLength = 0
            while (node !== insertNode && insertedLength++ < chainLength) {
                domNode.insertBefore(node, insertNode);
                node = children[move + insertedLength];
            }

            // the moved element came from the front of the array so reduce the insert offset
            if (move + chainLength < i) {
                insertOffset--
            }
        }

        // element at this index is scheduled to be removed so increase insert offset
        if (i in bIndex.removes) {
            insertOffset++
        }

        i += chainLength
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        console.log(oldRoot)
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}

return {
    applyProperties: (typeof applyProperties !== "undefined") ? applyProperties : null,
    require: (typeof require !== "undefined") ? require : null,
    isWidget: (typeof isWidget !== "undefined") ? isWidget : null,
    VPatch: (typeof VPatch !== "undefined") ? VPatch : null,
    render: (typeof render !== "undefined") ? render : null,
    updateWidget: (typeof updateWidget !== "undefined") ? updateWidget : null,
    module: (typeof module !== "undefined") ? module : null,
    applyPatch: (typeof applyPatch !== "undefined") ? applyPatch : null,
    removeNode: (typeof removeNode !== "undefined") ? removeNode : null,
    insertNode: (typeof insertNode !== "undefined") ? insertNode : null,
    stringPatch: (typeof stringPatch !== "undefined") ? stringPatch : null,
    widgetPatch: (typeof widgetPatch !== "undefined") ? widgetPatch : null,
    vNodePatch: (typeof vNodePatch !== "undefined") ? vNodePatch : null,
    reorderChildren: (typeof reorderChildren !== "undefined") ? reorderChildren : null,
    replaceRoot: (typeof replaceRoot !== "undefined") ? replaceRoot : null,
    destroyWidget: (typeof destroyWidget !== "undefined") ? destroyWidget : null,
    console: (typeof console !== "undefined") ? console : null
};
}
, {"filename":"../virtual-dom/vdom/patch-op.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vdom/apply-properties.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/apply-properties.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/apply-properties.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vdom';
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook.js")

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

return {
    isObject: (typeof isObject !== "undefined") ? isObject : null,
    require: (typeof require !== "undefined") ? require : null,
    isHook: (typeof isHook !== "undefined") ? isHook : null,
    module: (typeof module !== "undefined") ? module : null,
    applyProperties: (typeof applyProperties !== "undefined") ? applyProperties : null,
    removeProperty: (typeof removeProperty !== "undefined") ? removeProperty : null,
    patchObject: (typeof patchObject !== "undefined") ? patchObject : null,
    getPrototype: (typeof getPrototype !== "undefined") ? getPrototype : null,
    Object: (typeof Object !== "undefined") ? Object : null
};
}
, {"filename":"../virtual-dom/vdom/apply-properties.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vdom/create-element.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/create-element.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/create-element.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vdom';
var document = require("global/document")

var applyProperties = require("./apply-properties")

var isVNode = require("../vnode/is-vnode.js")
var isVText = require("../vnode/is-vtext.js")
var isWidget = require("../vnode/is-widget.js")
var handleThunk = require("../vnode/handle-thunk.js")

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}

return {
    document: (typeof document !== "undefined") ? document : null,
    require: (typeof require !== "undefined") ? require : null,
    applyProperties: (typeof applyProperties !== "undefined") ? applyProperties : null,
    isVNode: (typeof isVNode !== "undefined") ? isVNode : null,
    isVText: (typeof isVText !== "undefined") ? isVText : null,
    isWidget: (typeof isWidget !== "undefined") ? isWidget : null,
    handleThunk: (typeof handleThunk !== "undefined") ? handleThunk : null,
    module: (typeof module !== "undefined") ? module : null,
    createElement: (typeof createElement !== "undefined") ? createElement : null
};
}
, {"filename":"../virtual-dom/vdom/create-element.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vdom/update-widget.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/update-widget.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vdom/update-widget.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vdom';
var isWidget = require("../vnode/is-widget.js")

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}

return {
    isWidget: (typeof isWidget !== "undefined") ? isWidget : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    updateWidget: (typeof updateWidget !== "undefined") ? updateWidget : null
};
}
, {"filename":"../virtual-dom/vdom/update-widget.js","variation":""});
// @pinf-bundle-module: {"file":"../vdom-thunk/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk/index.js"}
require.memoize("87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../vdom-thunk';
var Partial = require('./partial');

module.exports = Partial();

return {
    Partial: (typeof Partial !== "undefined") ? Partial : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null
};
}
, {"filename":"../vdom-thunk/index.js","variation":""});
// @pinf-bundle-module: {"file":"../vdom-thunk/partial.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk/partial.js"}
require.memoize("87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk/partial.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../vdom-thunk';
var shallowEq = require('./shallow-eq');
var Thunk = require('./immutable-thunk');

module.exports = createPartial;

function createPartial(eq) {
    return function partial(fn) {
        var args = copyOver(arguments, 1);
        var firstArg = args[0];
        var key;

        var eqArgs = eq || shallowEq;

        if (typeof firstArg === 'object' && firstArg !== null) {
            if ('key' in firstArg) {
                key = firstArg.key;
            } else if ('id' in firstArg) {
                key = firstArg.id;
            }
        }

        return new Thunk(fn, args, key, eqArgs);
    };
}

function copyOver(list, offset) {
    var newList = [];
    for (var i = list.length - 1; i >= offset; i--) {
        newList[i - offset] = list[i];
    }
    return newList;
}

return {
    shallowEq: (typeof shallowEq !== "undefined") ? shallowEq : null,
    require: (typeof require !== "undefined") ? require : null,
    Thunk: (typeof Thunk !== "undefined") ? Thunk : null,
    module: (typeof module !== "undefined") ? module : null,
    createPartial: (typeof createPartial !== "undefined") ? createPartial : null,
    copyOver: (typeof copyOver !== "undefined") ? copyOver : null
};
}
, {"filename":"../vdom-thunk/partial.js","variation":""});
// @pinf-bundle-module: {"file":"../vdom-thunk/shallow-eq.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk/shallow-eq.js"}
require.memoize("87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk/shallow-eq.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../vdom-thunk';
module.exports = shallowEq;

function shallowEq(currentArgs, previousArgs) {
    if (currentArgs.length === 0 && previousArgs.length === 0) {
        return true;
    }

    if (currentArgs.length !== previousArgs.length) {
        return false;
    }

    var len = currentArgs.length;

    for (var i = 0; i < len; i++) {
        if (currentArgs[i] !== previousArgs[i]) {
            return false;
        }
    }

    return true;
}

return {
    module: (typeof module !== "undefined") ? module : null,
    shallowEq: (typeof shallowEq !== "undefined") ? shallowEq : null
};
}
, {"filename":"../vdom-thunk/shallow-eq.js","variation":""});
// @pinf-bundle-module: {"file":"../vdom-thunk/immutable-thunk.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk/immutable-thunk.js"}
require.memoize("87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk/immutable-thunk.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../vdom-thunk';
function Thunk(fn, args, key, eqArgs) {
    this.fn = fn;
    this.args = args;
    this.key = key;
    this.eqArgs = eqArgs;
}

Thunk.prototype.type = 'Thunk';
Thunk.prototype.render = render;
module.exports = Thunk;

function shouldUpdate(current, previous) {
    if (!current || !previous || current.fn !== previous.fn) {
        return true;
    }

    var cargs = current.args;
    var pargs = previous.args;

    return !current.eqArgs(cargs, pargs);
}

function render(previous) {
    if (shouldUpdate(this, previous)) {
        return this.fn.apply(null, this.args);
    } else {
        return previous.vnode;
    }
}

return {
    Thunk: (typeof Thunk !== "undefined") ? Thunk : null,
    module: (typeof module !== "undefined") ? module : null,
    shouldUpdate: (typeof shouldUpdate !== "undefined") ? shouldUpdate : null,
    render: (typeof render !== "undefined") ? render : null
};
}
, {"filename":"../vdom-thunk/immutable-thunk.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/virtual-hyperscript/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/virtual-hyperscript/index.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/virtual-hyperscript/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/virtual-hyperscript';
'use strict';

var isArray = require('x-is-array');

var VNode = require('../vnode/vnode.js');
var VText = require('../vnode/vtext.js');
var isVNode = require('../vnode/is-vnode');
var isVText = require('../vnode/is-vtext');
var isWidget = require('../vnode/is-widget');
var isHook = require('../vnode/is-vhook');
var isVThunk = require('../vnode/is-thunk');

var parseTag = require('./parse-tag.js');
var softSetHook = require('./hooks/soft-set-hook.js');
var evHook = require('./hooks/ev-hook.js');

module.exports = h;

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parseTag(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' &&
        !namespace &&
        props.hasOwnProperty('value') &&
        props.value !== undefined &&
        !isHook(props.value)
    ) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new VNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText(c));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (isHook(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = evHook(value);
            }
        }
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' +
        'Expected a VNode / Vthunk / VWidget / string but:\n' +
        'got:\n' +
        errorString(data.foreignObject) +
        '.\n' +
        'The parent vnode is:\n' +
        errorString(data.parentVnode)
        '\n' +
        'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}

return {
    isArray: (typeof isArray !== "undefined") ? isArray : null,
    require: (typeof require !== "undefined") ? require : null,
    VNode: (typeof VNode !== "undefined") ? VNode : null,
    VText: (typeof VText !== "undefined") ? VText : null,
    isVNode: (typeof isVNode !== "undefined") ? isVNode : null,
    isVText: (typeof isVText !== "undefined") ? isVText : null,
    isWidget: (typeof isWidget !== "undefined") ? isWidget : null,
    isHook: (typeof isHook !== "undefined") ? isHook : null,
    isVThunk: (typeof isVThunk !== "undefined") ? isVThunk : null,
    parseTag: (typeof parseTag !== "undefined") ? parseTag : null,
    softSetHook: (typeof softSetHook !== "undefined") ? softSetHook : null,
    evHook: (typeof evHook !== "undefined") ? evHook : null,
    module: (typeof module !== "undefined") ? module : null,
    h: (typeof h !== "undefined") ? h : null,
    isChildren: (typeof isChildren !== "undefined") ? isChildren : null,
    transformProperties: (typeof transformProperties !== "undefined") ? transformProperties : null,
    addChild: (typeof addChild !== "undefined") ? addChild : null,
    isChild: (typeof isChild !== "undefined") ? isChild : null,
    UnexpectedVirtualElement: (typeof UnexpectedVirtualElement !== "undefined") ? UnexpectedVirtualElement : null,
    errorString: (typeof errorString !== "undefined") ? errorString : null,
    JSON: (typeof JSON !== "undefined") ? JSON : null,
    String: (typeof String !== "undefined") ? String : null
};
}
, {"filename":"../virtual-dom/virtual-hyperscript/index.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vnode/vnode.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/vnode.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/vnode.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vnode';
var version = require("./version")
var isVNode = require("./is-vnode")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")
var isVHook = require("./is-vhook")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"

return {
    version: (typeof version !== "undefined") ? version : null,
    require: (typeof require !== "undefined") ? require : null,
    isVNode: (typeof isVNode !== "undefined") ? isVNode : null,
    isWidget: (typeof isWidget !== "undefined") ? isWidget : null,
    isThunk: (typeof isThunk !== "undefined") ? isThunk : null,
    isVHook: (typeof isVHook !== "undefined") ? isVHook : null,
    module: (typeof module !== "undefined") ? module : null,
    noProperties: (typeof noProperties !== "undefined") ? noProperties : null,
    noChildren: (typeof noChildren !== "undefined") ? noChildren : null,
    VirtualNode: (typeof VirtualNode !== "undefined") ? VirtualNode : null,
    String: (typeof String !== "undefined") ? String : null
};
}
, {"filename":"../virtual-dom/vnode/vnode.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/vnode/vtext.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/vtext.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/vnode/vtext.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/vnode';
var version = require("./version")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"

return {
    version: (typeof version !== "undefined") ? version : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    VirtualText: (typeof VirtualText !== "undefined") ? VirtualText : null,
    String: (typeof String !== "undefined") ? String : null
};
}
, {"filename":"../virtual-dom/vnode/vtext.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/virtual-hyperscript/parse-tag.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/virtual-hyperscript/parse-tag.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/virtual-hyperscript/parse-tag.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/virtual-hyperscript';
'use strict';

var split = require('browser-split');

var classIdSplit = /([\.#]?[a-zA-Z0-9_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}

return {
    split: (typeof split !== "undefined") ? split : null,
    require: (typeof require !== "undefined") ? require : null,
    classIdSplit: (typeof classIdSplit !== "undefined") ? classIdSplit : null,
    notClassId: (typeof notClassId !== "undefined") ? notClassId : null,
    module: (typeof module !== "undefined") ? module : null,
    parseTag: (typeof parseTag !== "undefined") ? parseTag : null
};
}
, {"filename":"../virtual-dom/virtual-hyperscript/parse-tag.js","variation":""});
// @pinf-bundle-module: {"file":"../browser-split/index.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"cde4c90688533bd61b9bb9422cae15887bb6380f-browser-split/index.js"}
require.memoize("cde4c90688533bd61b9bb9422cae15887bb6380f-browser-split/index.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../browser-split';
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();

return {
    module: (typeof module !== "undefined") ? module : null,
    split: (typeof split !== "undefined") ? split : null,
    String: (typeof String !== "undefined") ? String : null,
    Object: (typeof Object !== "undefined") ? Object : null,
    Array: (typeof Array !== "undefined") ? Array : null
};
}
, {"filename":"../browser-split/index.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/virtual-hyperscript/hooks';
'use strict';

module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};

return {
    module: (typeof module !== "undefined") ? module : null,
    SoftSetHook: (typeof SoftSetHook !== "undefined") ? SoftSetHook : null
};
}
, {"filename":"../virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js","variation":""});
// @pinf-bundle-module: {"file":"../virtual-dom/virtual-hyperscript/hooks/ev-hook.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/virtual-hyperscript/hooks/ev-hook.js"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/virtual-hyperscript/hooks/ev-hook.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../virtual-dom/virtual-hyperscript/hooks';
'use strict';

var EvStore = require('ev-store');

module.exports = EvHook;

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};

return {
    EvStore: (typeof EvStore !== "undefined") ? EvStore : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    EvHook: (typeof EvHook !== "undefined") ? EvHook : null
};
}
, {"filename":"../virtual-dom/virtual-hyperscript/hooks/ev-hook.js","variation":""});
// @pinf-bundle-module: {"file":"../observ/computed.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"763f9fee82cab36f35fe21dc7804803adeb52177-observ/computed.js"}
require.memoize("763f9fee82cab36f35fe21dc7804803adeb52177-observ/computed.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ';
var Observable = require("./index.js")

module.exports = computed

function computed(observables, lambda) {
    var values = observables.map(function (o) {
        return o()
    })
    var result = Observable(lambda.apply(null, values))

    observables.forEach(function (o, index) {
        o(function (newValue) {
            values[index] = newValue
            result.set(lambda.apply(null, values))
        })
    })

    return result
}

return {
    Observable: (typeof Observable !== "undefined") ? Observable : null,
    require: (typeof require !== "undefined") ? require : null,
    module: (typeof module !== "undefined") ? module : null,
    computed: (typeof computed !== "undefined") ? computed : null
};
}
, {"filename":"../observ/computed.js","variation":""});
// @pinf-bundle-module: {"file":"../observ/watch.js","mtime":0,"wrapper":"commonjs/leaky","format":"leaky","variation":"","id":"763f9fee82cab36f35fe21dc7804803adeb52177-observ/watch.js"}
require.memoize("763f9fee82cab36f35fe21dc7804803adeb52177-observ/watch.js", 
function(require, exports, module) {var __dirname = TEST_ROOT_PATH + '/' + '../observ';
module.exports = watch

function watch(observable, listener) {
    var remove = observable(listener)
    listener(observable())
    return remove
}

return {
    module: (typeof module !== "undefined") ? module : null,
    watch: (typeof watch !== "undefined") ? watch : null
};
}
, {"filename":"../observ/watch.js","variation":""});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"/package.json"}
require.memoize("/package.json", 
{
    "main": "/app.js",
    "mappings": {
        "mercury": "5aa290c24f24dacbba3d98464ee2496c359e2fa9-mercury"
    },
    "dirpath": "test/assets/packages/nodejs-npm3-flat"
}
, {"filename":"test/assets/packages/nodejs-npm3-flat/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"5aa290c24f24dacbba3d98464ee2496c359e2fa9-mercury/package.json"}
require.memoize("5aa290c24f24dacbba3d98464ee2496c359e2fa9-mercury/package.json", 
{
    "main": "5aa290c24f24dacbba3d98464ee2496c359e2fa9-mercury/index.js",
    "mappings": {
        "geval": "fe0e6550bbef2c036fb585219c557a4fe6179940-geval",
        "xtend": "1785d6964ca526223d5851a54ae43268bcd80878-xtend",
        "main-loop": "a1266e7ecc769cb741acd7f364709f047959edb8-main-loop",
        "value-event": "a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event",
        "dom-delegator": "188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator",
        "observ-array": "0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array",
        "observ-struct": "18225cba6f52ea4ccb31cf78cf073fe680ca694b-observ-struct",
        "observ-varhash": "3e8f5ffc0eec6592bd0d1b847bf253210576b5cd-observ-varhash",
        "observ": "763f9fee82cab36f35fe21dc7804803adeb52177-observ",
        "virtual-dom": "879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom",
        "vdom-thunk": "87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk"
    },
    "dirpath": "../mercury"
}
, {"filename":"../mercury/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"fe0e6550bbef2c036fb585219c557a4fe6179940-geval/package.json"}
require.memoize("fe0e6550bbef2c036fb585219c557a4fe6179940-geval/package.json", 
{
    "main": "fe0e6550bbef2c036fb585219c557a4fe6179940-geval/source.js",
    "dirpath": "../geval"
}
, {"filename":"../geval/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"1785d6964ca526223d5851a54ae43268bcd80878-xtend/package.json"}
require.memoize("1785d6964ca526223d5851a54ae43268bcd80878-xtend/package.json", 
{
    "main": "1785d6964ca526223d5851a54ae43268bcd80878-xtend/immutable.js",
    "dirpath": "../xtend"
}
, {"filename":"../xtend/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"a1266e7ecc769cb741acd7f364709f047959edb8-main-loop/package.json"}
require.memoize("a1266e7ecc769cb741acd7f364709f047959edb8-main-loop/package.json", 
{
    "main": "a1266e7ecc769cb741acd7f364709f047959edb8-main-loop/index.js",
    "mappings": {
        "raf": "776fdf2bd359c0842eabb6e35eb383938b1c8a13-raf",
        "error": "b9238a6795a9ff3c21edb77008fe66b19e571992-error"
    },
    "dirpath": "../main-loop"
}
, {"filename":"../main-loop/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"776fdf2bd359c0842eabb6e35eb383938b1c8a13-raf/package.json"}
require.memoize("776fdf2bd359c0842eabb6e35eb383938b1c8a13-raf/package.json", 
{
    "main": "776fdf2bd359c0842eabb6e35eb383938b1c8a13-raf/index.js",
    "mappings": {
        "performance-now": "747e45a55b2cfbbce6fc8c3da11ec4bc08bdbbf7-performance-now"
    },
    "dirpath": "../raf"
}
, {"filename":"../raf/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"747e45a55b2cfbbce6fc8c3da11ec4bc08bdbbf7-performance-now/package.json"}
require.memoize("747e45a55b2cfbbce6fc8c3da11ec4bc08bdbbf7-performance-now/package.json", 
{
    "main": "747e45a55b2cfbbce6fc8c3da11ec4bc08bdbbf7-performance-now/lib/performance-now.js",
    "dirpath": "../performance-now"
}
, {"filename":"../performance-now/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"b9238a6795a9ff3c21edb77008fe66b19e571992-error/package.json"}
require.memoize("b9238a6795a9ff3c21edb77008fe66b19e571992-error/package.json", 
{
    "main": "b9238a6795a9ff3c21edb77008fe66b19e571992-error/index",
    "mappings": {
        "camelize": "7a6afee7f88ad8b1ba389df4d83b4462b9997d16-camelize",
        "string-template": "e30cf416f3e94cb0ded210d62758303e4fde3abf-string-template",
        "xtend": "1785d6964ca526223d5851a54ae43268bcd80878-xtend"
    },
    "dirpath": "../error"
}
, {"filename":"../error/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"7a6afee7f88ad8b1ba389df4d83b4462b9997d16-camelize/package.json"}
require.memoize("7a6afee7f88ad8b1ba389df4d83b4462b9997d16-camelize/package.json", 
{
    "main": "7a6afee7f88ad8b1ba389df4d83b4462b9997d16-camelize/index.js",
    "dirpath": "../camelize"
}
, {"filename":"../camelize/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"e30cf416f3e94cb0ded210d62758303e4fde3abf-string-template/package.json"}
require.memoize("e30cf416f3e94cb0ded210d62758303e4fde3abf-string-template/package.json", 
{
    "main": "e30cf416f3e94cb0ded210d62758303e4fde3abf-string-template/index.js",
    "dirpath": "../string-template"
}
, {"filename":"../string-template/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/package.json"}
require.memoize("a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/package.json", 
{
    "main": "a29c2975bc4244c93fd3a9d37997f4dc9011e252-value-event/index",
    "mappings": {
        "dom-delegator": "188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator",
        "xtend": "822968178ae54008cf98ee66ff499fa2be684578-xtend",
        "form-data-set": "09e6f92cd04eda1fe09b6753906b14604f3493e5-form-data-set"
    },
    "dirpath": "../value-event"
}
, {"filename":"../value-event/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/package.json"}
require.memoize("188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/package.json", 
{
    "main": "188b74e9d529dac6b050b35ac15dff0a815cd2a7-dom-delegator/index.js",
    "mappings": {
        "individual": "bf72d7446c35cd68ebc718de4c886bae7574e077-individual",
        "cuid": "389ae956e18469d6376883cc8f4bfc8f983c9c13-cuid",
        "global": "13986d51e21380cfc0d85f20cf3b63da6e225b2e-global",
        "ev-store": "8e106d5677990df298bfc71bb4226fd7f310abfa-ev-store",
        "weakmap-shim": "d2dd073247e4f84cb840cd764bf6f2f953e4d71a-weakmap-shim",
        "inherits": "a42e50050a54413069e6526883e41b54232ecb51-inherits"
    },
    "dirpath": "../dom-delegator"
}
, {"filename":"../dom-delegator/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"bf72d7446c35cd68ebc718de4c886bae7574e077-individual/package.json"}
require.memoize("bf72d7446c35cd68ebc718de4c886bae7574e077-individual/package.json", 
{
    "main": "bf72d7446c35cd68ebc718de4c886bae7574e077-individual/index.js",
    "dirpath": "../individual"
}
, {"filename":"../individual/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"389ae956e18469d6376883cc8f4bfc8f983c9c13-cuid/package.json"}
require.memoize("389ae956e18469d6376883cc8f4bfc8f983c9c13-cuid/package.json", 
{
    "main": "389ae956e18469d6376883cc8f4bfc8f983c9c13-cuid/dist/node-cuid.js",
    "dirpath": "../cuid"
}
, {"filename":"../cuid/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"13986d51e21380cfc0d85f20cf3b63da6e225b2e-global/package.json"}
require.memoize("13986d51e21380cfc0d85f20cf3b63da6e225b2e-global/package.json", 
{
    "main": "13986d51e21380cfc0d85f20cf3b63da6e225b2e-global/window.js",
    "mappings": {
        "min-document": "0e6bec4cae623f8973c15bea63cc114d467281f9-min-document"
    },
    "dirpath": "../global"
}
, {"filename":"../global/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/package.json"}
require.memoize("0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/package.json", 
{
    "main": "0e6bec4cae623f8973c15bea63cc114d467281f9-min-document/index.js",
    "mappings": {
        "dom-walk": "bafb1bd85d795649867d457cd2647f73cf5cf5f0-dom-walk"
    },
    "dirpath": "../min-document"
}
, {"filename":"../min-document/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"bafb1bd85d795649867d457cd2647f73cf5cf5f0-dom-walk/package.json"}
require.memoize("bafb1bd85d795649867d457cd2647f73cf5cf5f0-dom-walk/package.json", 
{
    "main": "bafb1bd85d795649867d457cd2647f73cf5cf5f0-dom-walk/index.js",
    "dirpath": "../dom-walk"
}
, {"filename":"../dom-walk/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"8e106d5677990df298bfc71bb4226fd7f310abfa-ev-store/package.json"}
require.memoize("8e106d5677990df298bfc71bb4226fd7f310abfa-ev-store/package.json", 
{
    "main": "8e106d5677990df298bfc71bb4226fd7f310abfa-ev-store/index.js",
    "mappings": {
        "individual": "069cdb460b03a4609646e8111164c92d58ea0494-individual"
    },
    "dirpath": "../ev-store"
}
, {"filename":"../ev-store/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"069cdb460b03a4609646e8111164c92d58ea0494-individual/package.json"}
require.memoize("069cdb460b03a4609646e8111164c92d58ea0494-individual/package.json", 
{
    "main": "069cdb460b03a4609646e8111164c92d58ea0494-individual/index.js",
    "dirpath": "../ev-store/node_modules/individual"
}
, {"filename":"../ev-store/node_modules/individual/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"d2dd073247e4f84cb840cd764bf6f2f953e4d71a-weakmap-shim/package.json"}
require.memoize("d2dd073247e4f84cb840cd764bf6f2f953e4d71a-weakmap-shim/package.json", 
{
    "main": "d2dd073247e4f84cb840cd764bf6f2f953e4d71a-weakmap-shim/index.js",
    "dirpath": "../weakmap-shim"
}
, {"filename":"../weakmap-shim/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"a42e50050a54413069e6526883e41b54232ecb51-inherits/package.json"}
require.memoize("a42e50050a54413069e6526883e41b54232ecb51-inherits/package.json", 
{
    "main": "a42e50050a54413069e6526883e41b54232ecb51-inherits/inherits.js",
    "dirpath": "../inherits"
}
, {"filename":"../inherits/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"822968178ae54008cf98ee66ff499fa2be684578-xtend/package.json"}
require.memoize("822968178ae54008cf98ee66ff499fa2be684578-xtend/package.json", 
{
    "main": "822968178ae54008cf98ee66ff499fa2be684578-xtend/index.js",
    "dirpath": "../value-event/node_modules/xtend"
}
, {"filename":"../value-event/node_modules/xtend/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"09e6f92cd04eda1fe09b6753906b14604f3493e5-form-data-set/package.json"}
require.memoize("09e6f92cd04eda1fe09b6753906b14604f3493e5-form-data-set/package.json", 
{
    "main": "09e6f92cd04eda1fe09b6753906b14604f3493e5-form-data-set/index.js",
    "mappings": {
        "dom-walk": "bafb1bd85d795649867d457cd2647f73cf5cf5f0-dom-walk"
    },
    "dirpath": "../form-data-set"
}
, {"filename":"../form-data-set/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/package.json"}
require.memoize("0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/package.json", 
{
    "main": "0353cf734fd45ec0398d1e901c8e16516fa00da2-observ-array/index.js",
    "mappings": {
        "observ": "763f9fee82cab36f35fe21dc7804803adeb52177-observ",
        "adiff": "940ee15dbc47ffff9aab0426eb8d652731895883-adiff"
    },
    "dirpath": "../observ-array"
}
, {"filename":"../observ-array/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"763f9fee82cab36f35fe21dc7804803adeb52177-observ/package.json"}
require.memoize("763f9fee82cab36f35fe21dc7804803adeb52177-observ/package.json", 
{
    "main": "763f9fee82cab36f35fe21dc7804803adeb52177-observ/index.js",
    "dirpath": "../observ"
}
, {"filename":"../observ/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"940ee15dbc47ffff9aab0426eb8d652731895883-adiff/package.json"}
require.memoize("940ee15dbc47ffff9aab0426eb8d652731895883-adiff/package.json", 
{
    "main": "940ee15dbc47ffff9aab0426eb8d652731895883-adiff/index.js",
    "dirpath": "../adiff"
}
, {"filename":"../adiff/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"18225cba6f52ea4ccb31cf78cf073fe680ca694b-observ-struct/package.json"}
require.memoize("18225cba6f52ea4ccb31cf78cf073fe680ca694b-observ-struct/package.json", 
{
    "main": "18225cba6f52ea4ccb31cf78cf073fe680ca694b-observ-struct/index.js",
    "mappings": {
        "observ": "763f9fee82cab36f35fe21dc7804803adeb52177-observ",
        "xtend": "1d83ab096fb740c2fae8491c4cd4ad2e18f011f7-xtend"
    },
    "dirpath": "../observ-struct"
}
, {"filename":"../observ-struct/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"1d83ab096fb740c2fae8491c4cd4ad2e18f011f7-xtend/package.json"}
require.memoize("1d83ab096fb740c2fae8491c4cd4ad2e18f011f7-xtend/package.json", 
{
    "main": "1d83ab096fb740c2fae8491c4cd4ad2e18f011f7-xtend/index.js",
    "dirpath": "../observ-struct/node_modules/xtend"
}
, {"filename":"../observ-struct/node_modules/xtend/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"3e8f5ffc0eec6592bd0d1b847bf253210576b5cd-observ-varhash/package.json"}
require.memoize("3e8f5ffc0eec6592bd0d1b847bf253210576b5cd-observ-varhash/package.json", 
{
    "main": "3e8f5ffc0eec6592bd0d1b847bf253210576b5cd-observ-varhash/index.js",
    "mappings": {
        "observ": "763f9fee82cab36f35fe21dc7804803adeb52177-observ",
        "xtend": "0c321377f76ba4f1037f8b0fcd64cfc56c192488-xtend"
    },
    "dirpath": "../observ-varhash"
}
, {"filename":"../observ-varhash/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"0c321377f76ba4f1037f8b0fcd64cfc56c192488-xtend/package.json"}
require.memoize("0c321377f76ba4f1037f8b0fcd64cfc56c192488-xtend/package.json", 
{
    "main": "0c321377f76ba4f1037f8b0fcd64cfc56c192488-xtend/index.js",
    "dirpath": "../observ-varhash/node_modules/xtend"
}
, {"filename":"../observ-varhash/node_modules/xtend/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/package.json"}
require.memoize("879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/package.json", 
{
    "main": "879b7bc630ee95602566905ae6dfdedacc382f7f-virtual-dom/index.js",
    "mappings": {
        "x-is-array": "7e70e8113b08f862aa24c1f5e47959e7f8915019-x-is-array",
        "is-object": "612ea617e4c6ef171db6393340a654971edd1f12-is-object",
        "global": "13986d51e21380cfc0d85f20cf3b63da6e225b2e-global",
        "browser-split": "cde4c90688533bd61b9bb9422cae15887bb6380f-browser-split",
        "ev-store": "8e106d5677990df298bfc71bb4226fd7f310abfa-ev-store"
    },
    "dirpath": "../virtual-dom"
}
, {"filename":"../virtual-dom/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"7e70e8113b08f862aa24c1f5e47959e7f8915019-x-is-array/package.json"}
require.memoize("7e70e8113b08f862aa24c1f5e47959e7f8915019-x-is-array/package.json", 
{
    "main": "7e70e8113b08f862aa24c1f5e47959e7f8915019-x-is-array/index.js",
    "dirpath": "../x-is-array"
}
, {"filename":"../x-is-array/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"612ea617e4c6ef171db6393340a654971edd1f12-is-object/package.json"}
require.memoize("612ea617e4c6ef171db6393340a654971edd1f12-is-object/package.json", 
{
    "main": "612ea617e4c6ef171db6393340a654971edd1f12-is-object/index.js",
    "dirpath": "../is-object"
}
, {"filename":"../is-object/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk/package.json"}
require.memoize("87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk/package.json", 
{
    "main": "87e971dbd021e714b29c3b61710491805a981f18-vdom-thunk/index.js",
    "dirpath": "../vdom-thunk"
}
, {"filename":"../vdom-thunk/package.json"});
// @pinf-bundle-module: {"file":null,"mtime":0,"wrapper":"json","format":"json","id":"cde4c90688533bd61b9bb9422cae15887bb6380f-browser-split/package.json"}
require.memoize("cde4c90688533bd61b9bb9422cae15887bb6380f-browser-split/package.json", 
{
    "main": "cde4c90688533bd61b9bb9422cae15887bb6380f-browser-split/index.js",
    "dirpath": "../browser-split"
}
, {"filename":"../browser-split/package.json"});
// @pinf-bundle-ignore: 
});
// @pinf-bundle-report: {}