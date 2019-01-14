(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PodNotify"] = factory();
	else
		root["PodNotify"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(3);
var isBuffer = __webpack_require__(19);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(22);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(4);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(4);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(21)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(23);
var buildURL = __webpack_require__(25);
var parseHeaders = __webpack_require__(26);
var isURLSameOrigin = __webpack_require__(27);
var createError = __webpack_require__(5);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(28);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(29);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(24);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return generateUUID; });
/**
 * Generates Random String
 * @param   {int}     sectionCount
 * @return  {string}
 */
function generateUUID(sectionCount) {
  var d = new Date().getTime();
  var textData = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  if (sectionCount === 1) {
    textData = 'xxxxxxxx';
  }

  if (sectionCount === 2) {
    textData = 'xxxxxxxx-xxxx';
  }

  if (sectionCount === 3) {
    textData = 'xxxxxxxx-xxxx-4xxx';
  }

  if (sectionCount === 4) {
    textData = 'xxxxxxxx-xxxx-4xxx-yxxx';
  }

  var uuid = textData.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x7 | 0x8).toString(16);
  });
  return uuid;
}
;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  /*
   * Async module to handle async messaging
   * @module Async
   *
   * @param {Object} params
   */

  function Async(params) {

    /*******************************************************
     *          P R I V A T E   V A R I A B L E S          *
     *******************************************************/

    var PodSocketClass,
      PodUtility,
      http;

    if (true) {
      PodSocketClass = __webpack_require__(15);
      PodUtility = __webpack_require__(17);
    } else {}

    var Utility = new PodUtility();

    var appId = params.appId || "PodChat",
      deviceId = params.deviceId,
      eventCallbacks = {
        connect: {},
        disconnect: {},
        reconnect: {},
        message: {},
        asyncReady: {},
        stateChange: {},
        error: {}
      },
      ackCallback = {},
      socket,
      asyncMessageType = {
        PING: 0,
        SERVER_REGISTER: 1,
        DEVICE_REGISTER: 2,
        MESSAGE: 3,
        MESSAGE_ACK_NEEDED: 4,
        MESSAGE_SENDER_ACK_NEEDED: 5,
        ACK: 6,
        GET_REGISTERED_PEERS: 7,
        PEER_REMOVED: -3,
        REGISTER_QUEUE: -2,
        NOT_REGISTERED: -1,
        ERROR_MESSAGE: -99
      },
      socketStateType = {
        CONNECTING: 0, // The connection is not yet open.
        OPEN: 1, // The connection is open and ready to communicate.
        CLOSING: 2, // The connection is in the process of closing.
        CLOSED: 3 // The connection is closed or couldn't be opened.
      },
      isNode = Utility.isNode(),
      isSocketOpen = false,
      isDeviceRegister = false,
      isServerRegister = false,
      socketState = socketStateType.CONNECTING,
      asyncState = "",
      registerServerTimeoutId,
      registerDeviceTimeoutId,
      checkIfSocketHasOpennedTimeoutId,
      asyncReadyTimeoutId,
      pushSendDataQueue = [],
      oldPeerId,
      peerId = params.peerId,
      lastMessageId = 0,
      messageTtl = params.messageTtl || 86400,
      serverName = params.serverName || "oauth-wire",
      serverRegisteration = (typeof params.serverRegisteration === "boolean") ?
      params.serverRegisteration :
      true,
      connectionRetryInterval = params.connectionRetryInterval || 5000,
      socketReconnectRetryInterval,
      socketReconnectCheck,
      retryStep = 1,
      reconnectOnClose = (typeof params.reconnectOnClose === "boolean") ?
      params.reconnectOnClose :
      true,
      asyncLogging = (params.asyncLogging && typeof params.asyncLogging.onFunction === "boolean") ?
      params.asyncLogging.onFunction :
      false,
      onReceiveLogging = (params.asyncLogging && typeof params.asyncLogging.onMessageReceive === "boolean") ?
      params.asyncLogging.onMessageReceive :
      false,
      onSendLogging = (params.asyncLogging && typeof params.asyncLogging.onMessageSend === "boolean") ?
      params.asyncLogging.onMessageSend :
      false,
      workerId = (params.asyncLogging && typeof parseInt(params.asyncLogging.workerId) === "number") ?
      params.asyncLogging.workerId :
      0;

    /*******************************************************
     *            P R I V A T E   M E T H O D S            *
     *******************************************************/

    var init = function() {
        initSocket();
      },

      asyncLogger = function(type, msg) {
        Utility.asyncLogger({
          workerId: workerId,
          type: type,
          msg: msg,
          peerId: peerId,
          deviceId: deviceId,
          isSocketOpen: isSocketOpen,
          isDeviceRegister: isDeviceRegister,
          isServerRegister: isServerRegister,
          socketState: socketState,
          pushSendDataQueue: pushSendDataQueue
        });
      },

      initSocket = function() {

        socket = new PodSocketClass({
          socketAddress: params.socketAddress,
          wsConnectionWaitTime: params.wsConnectionWaitTime,
          connectionCheckTimeout: params.connectionCheckTimeout,
          connectionCheckTimeoutThreshold: params.connectionCheckTimeoutThreshold
        });

        checkIfSocketHasOpennedTimeoutId = setTimeout(function() {
          if (!isSocketOpen) {
            fireEvent("error", {
              errorCode: 4001,
              errorMessage: "Can not open Socket!"
            });
          }
        }, 65000);

        socket.on("open", function() {
          checkIfSocketHasOpennedTimeoutId && clearTimeout(checkIfSocketHasOpennedTimeoutId);
          socketReconnectRetryInterval && clearTimeout(socketReconnectRetryInterval);
          socketReconnectCheck && clearTimeout(socketReconnectCheck);

          isSocketOpen = true;
          retryStep = 1;

          socketState = socketStateType.OPEN;
          fireEvent("stateChange", {
            socketState: socketState,
            timeUntilReconnect: 0,
            deviceRegister: isDeviceRegister,
            serverRegister: isServerRegister,
            peerId: peerId
          });
        });

        socket.on("message", function(msg) {
          handleSocketMessage(msg);
          if (onReceiveLogging) {
            asyncLogger("Receive", msg);
          }
        });

        socket.on("close", function(event) {
          isSocketOpen = false;
          isDeviceRegister = false;
          oldPeerId = peerId;

          socketState = socketStateType.CLOSED;
          fireEvent("stateChange", {
            socketState: socketState,
            timeUntilReconnect: 0,
            deviceRegister: isDeviceRegister,
            serverRegister: isServerRegister,
            peerId: peerId
          });

          fireEvent("disconnect", event);

          if (reconnectOnClose) {
            if (asyncLogging) {
              if (workerId > 0) {
                Utility.asyncStepLogger(workerId + "\t Reconnecting after " + retryStep + "s");
              } else {
                Utility.asyncStepLogger("Reconnecting after " + retryStep + "s");
              }
            }

            socketState = socketStateType.CLOSED;
            fireEvent("stateChange", {
              socketState: socketState,
              timeUntilReconnect: 1000 * retryStep,
              deviceRegister: isDeviceRegister,
              serverRegister: isServerRegister,
              peerId: peerId
            });

            socketReconnectRetryInterval = setTimeout(function() {
              socket.connect();
            }, 1000 * retryStep);

            if (retryStep < 60)
              retryStep *= 2;

            socketReconnectCheck && clearTimeout(socketReconnectCheck);

            socketReconnectCheck = setTimeout(function() {
              if (!isSocketOpen) {
                fireEvent("error", {
                  errorCode: 4001,
                  errorMessage: "Can not open Socket!"
                });

                socketState = socketStateType.CLOSED;
                fireEvent("stateChange", {
                  socketState: socketState,
                  deviceRegister: isDeviceRegister,
                  serverRegister: isServerRegister,
                  peerId: peerId
                });
              }
            }, 65000);

          } else {
            socketReconnectRetryInterval && clearTimeout(socketReconnectRetryInterval);
            socketReconnectCheck && clearTimeout(socketReconnectCheck);
            fireEvent("error", {
              errorCode: 4005,
              errorMessage: "Socket Closed!"
            });

            socketState = socketStateType.CLOSED;
            fireEvent("stateChange", {
              socketState: socketState,
              timeUntilReconnect: 0,
              deviceRegister: isDeviceRegister,
              serverRegister: isServerRegister,
              peerId: peerId
            });
          }

        });

        socket.on("customError", function(error) {
          fireEvent("error", {
            errorCode: error.errorCode,
            errorMessage: error.errorMessage,
            errorEvent: error.errorEvent
          });
        });

        socket.on("error", function(error) {
          fireEvent("error", {
            errorCode: error.target._closeCode,
            errorMessage: error.message,
            errorEvent: error.error
          });
        });
      },

      handleSocketMessage = function(msg) {
        var ack;

        if (msg.type === asyncMessageType.MESSAGE_ACK_NEEDED || msg.type === asyncMessageType.MESSAGE_SENDER_ACK_NEEDED) {
          ack = function() {
            pushSendData({
              type: asyncMessageType.ACK,
              content: {
                messageId: msg.id
              }
            });
          }
        }

        switch (msg.type) {
          case asyncMessageType.PING:
            handlePingMessage(msg);
            break;

          case asyncMessageType.SERVER_REGISTER:
            handleServerRegisterMessage(msg);
            break;

          case asyncMessageType.DEVICE_REGISTER:
            handleDeviceRegisterMessage(msg.content);
            break;

          case asyncMessageType.MESSAGE:
            fireEvent("message", msg);
            break;

          case asyncMessageType.MESSAGE_ACK_NEEDED:
          case asyncMessageType.MESSAGE_SENDER_ACK_NEEDED:
            ack();
            fireEvent("message", msg);
            break;

          case asyncMessageType.ACK:
            fireEvent("message", msg);
            if (ackCallback[msg.senderMessageId] == "function") {
              ackCallback[msg.senderMessageId]();
              delete ackCallback[msg.senderMessageId];
            }
            break;

          case asyncMessageType.ERROR_MESSAGE:
            fireEvent("error", {
              errorCode: 4002,
              errorMessage: "Async Error!",
              errorEvent: msg
            });
            break;
        }
      },

      handlePingMessage = function(msg) {
        if (msg.content) {
          if (deviceId === undefined) {
            deviceId = msg.content;
            registerDevice();
          } else {
            registerDevice();
          }
        } else {
          if (onReceiveLogging) {
            if (workerId > 0) {
              Utility.asyncStepLogger(workerId + "\t Ping Response at (" + new Date() + ")");
            } else {
              Utility.asyncStepLogger("Ping Response at (" + new Date() + ")");
            }
          }
        }
      },

      registerDevice = function(isRetry) {
        if (asyncLogging) {
          if (workerId > 0) {
            Utility.asyncStepLogger(workerId + "\t Registering Device");
          } else {
            Utility.asyncStepLogger("Registering Device");
          }
        }

        var content = {
          appId: appId,
          deviceId: deviceId
        };

        if (peerId !== undefined) {
          content.refresh = true;
        } else {
          content.renew = true;
        }

        pushSendData({
          type: asyncMessageType.DEVICE_REGISTER,
          content: content
        });
      },

      handleDeviceRegisterMessage = function(recievedPeerId) {
        if (!isDeviceRegister) {
          if (registerDeviceTimeoutId) {
            clearTimeout(registerDeviceTimeoutId);
          }

          isDeviceRegister = true;
          peerId = recievedPeerId;
        }

        /**
         * If serverRegisteration == true we have to register
         * on server then make async status ready
         */
        if (serverRegisteration) {
          if (isServerRegister && peerId === oldPeerId) {
            fireEvent("asyncReady");
            isServerRegister = true;
            pushSendDataQueueHandler();

            socketState = socketStateType.OPEN;
            fireEvent("stateChange", {
              socketState: socketState,
              timeUntilReconnect: 0,
              deviceRegister: isDeviceRegister,
              serverRegister: isServerRegister,
              peerId: peerId
            });
          } else {
            socketState = socketStateType.OPEN;
            fireEvent("stateChange", {
              socketState: socketState,
              timeUntilReconnect: 0,
              deviceRegister: isDeviceRegister,
              serverRegister: isServerRegister,
              peerId: peerId
            });

            registerServer();
          }
        } else {
          fireEvent("asyncReady");
          isServerRegister = "Not Needed";
          pushSendDataQueueHandler();

          if (asyncLogging) {
            if (workerId > 0) {
              Utility.asyncStepLogger(workerId + "\t Async is Ready");
            } else {
              Utility.asyncStepLogger("Async is Ready");
            }
          }

          socketState = socketStateType.OPEN;
          fireEvent("stateChange", {
            socketState: socketState,
            timeUntilReconnect: 0,
            deviceRegister: isDeviceRegister,
            serverRegister: isServerRegister,
            peerId: peerId
          });
        }
      },

      registerServer = function() {

        if (asyncLogging) {
          if (workerId > 0) {
            Utility.asyncStepLogger(workerId + "\t Registering Server");
          } else {
            Utility.asyncStepLogger("Registering Server");
          }
        }

        var content = {
          name: serverName
        };

        pushSendData({
          type: asyncMessageType.SERVER_REGISTER,
          content: content
        });

        registerServerTimeoutId = setTimeout(function() {
          if (!isServerRegister) {
            registerServer();
          }
        }, connectionRetryInterval);
      },

      handleServerRegisterMessage = function(msg) {
        if (msg.senderName && msg.senderName === serverName) {
          isServerRegister = true;

          if (registerServerTimeoutId) {
            clearTimeout(registerServerTimeoutId);
          }

          socketState = socketStateType.OPEN;
          fireEvent("stateChange", {
            socketState: socketState,
            timeUntilReconnect: 0,
            deviceRegister: isDeviceRegister,
            serverRegister: isServerRegister,
            peerId: peerId
          });
          fireEvent("asyncReady");

          pushSendDataQueueHandler();

          if (asyncLogging) {
            if (workerId > 0) {
              Utility.asyncStepLogger(workerId + "\t Async is Ready");
            } else {
              Utility.asyncStepLogger("Async is Ready");
            }
          }

        } else {
          registerServer();
        }
      },

      pushSendData = function(msg) {
        if (onSendLogging)
          asyncLogger("Send", msg);

        if (socketState === socketStateType.OPEN) {
          socket.emit(msg);
        } else {
          pushSendDataQueue.push(msg);
        }
      },

      clearTimeouts = function() {
        registerDeviceTimeoutId && clearTimeout(registerDeviceTimeoutId);
        registerServerTimeoutId && clearTimeout(registerServerTimeoutId);
        checkIfSocketHasOpennedTimeoutId && clearTimeout(checkIfSocketHasOpennedTimeoutId);
        socketReconnectRetryInterval && clearTimeout(socketReconnectRetryInterval);
        socketReconnectCheck && clearTimeout(socketReconnectCheck);
      },

      pushSendDataQueueHandler = function() {
        while (pushSendDataQueue.length > 0 && socketState === socketStateType.OPEN) {
          var msg = pushSendDataQueue.splice(0, 1)[0];
          pushSendData(msg);
        }
      },

      fireEvent = function(eventName, param, ack) {
        try {
          if (ack) {
            for (var id in eventCallbacks[eventName])
              eventCallbacks[eventName][id](param, ack);
          } else {
            for (var id in eventCallbacks[eventName])
              eventCallbacks[eventName][id](param);
          }
        } catch (e) {
          fireEvent("error", {
            errorCode: 999,
            errorMessage: "Unknown ERROR!",
            errorEvent: e
          });
        }
      };

    /*******************************************************
     *             P U B L I C   M E T H O D S             *
     *******************************************************/

    this.on = function(eventName, callback) {
      if (eventCallbacks[eventName]) {
        var id = Utility.generateUUID();
        eventCallbacks[eventName][id] = callback;
        return id;
      }
      if (eventName === "connect" && socketState === socketStateType.OPEN) {
        callback(peerId);
      }
    }

    this.send = function(params, callback) {
      var messageType = (typeof params.type === "number") ?
        params.type :
        (callback) ?
        asyncMessageType.MESSAGE_SENDER_ACK_NEEDED :
        asyncMessageType.MESSAGE;

      var socketData = {
        type: messageType,
        content: params.content
      };

      lastMessageId += 1;
      var messageId = lastMessageId;

      if (messageType === asyncMessageType.MESSAGE_SENDER_ACK_NEEDED || messageType === asyncMessageType.MESSAGE_ACK_NEEDED) {
        ackCallback[messageId] = function() {
          callback && callback();
        }
      }

      socketData.content.messageId = messageId;
      socketData.content.ttl = messageTtl;

      pushSendData(socketData);
    }

    this.getAsyncState = function() {
      return socketState;
    }

    this.getSendQueue = function() {
      return pushSendDataQueue;
    }

    this.getPeerId = function() {
      return peerId;
    }

    this.getServerName = function() {
      return serverName;
    }

    this.setServerName = function(newServerName) {
      serverName = newServerName;
    }

    this.setDeviceId = function(newDeviceId) {
      deviceId = newDeviceId;
    }

    this.close = function() {
      isDeviceRegister = false;
      isSocketOpen = false;

      socketState = socketStateType.CLOSED;
      fireEvent("stateChange", {
        socketState: socketState,
        timeUntilReconnect: 0,
        deviceRegister: isDeviceRegister,
        serverRegister: isServerRegister,
        peerId: peerId
      });

      socket.close();
    }

    this.logout = function() {
      oldPeerId = peerId;
      peerId = undefined;
      isServerRegister = false;
      isDeviceRegister = false;
      isSocketOpen = false;
      deviceId = undefined;
      pushSendDataQueue = [];
      ackCallback = {};
      clearTimeouts();

      socketState = socketStateType.CLOSED;
      fireEvent("stateChange", {
        socketState: socketState,
        timeUntilReconnect: 0,
        deviceRegister: isDeviceRegister,
        serverRegister: isServerRegister,
        peerId: peerId
      });

      reconnectOnClose = false;

      socket.close();
    }

    this.reconnectSocket = function() {
      oldPeerId = peerId;
      isDeviceRegister = false;
      isSocketOpen = false;
      clearTimeouts();
      socket.connect();
    }

    init();
  }

  if ( true && typeof module.exports != "undefined") {
    module.exports = Async;
  } else {
    if (!window.POD) {
      window.POD = {};
    }
    window.POD.Async = Async;
  }
})();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *
 * @revision    $Id: index.js 2012-03-24 16:21:10 Aleksey $
 * @created     2016-09-24 16:21:10
 * @category    Express Helpers
 * @package     device-uuid
 * @version     1.0.2
 * @copyright   Copyright (c) 2016-2017 - All rights reserved.
 * @license     MIT License
 * @author      Alexey Gordeyev IK <aleksej@gordejev.lv>
 * @link        http://www.gordejev.lv
 *
 */
module.exports = __webpack_require__(37);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * UAParser.js v0.7.19
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 or MIT
 */

(function (window, undefined) {

    'use strict';

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '0.7.19',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major', // deprecated
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded';


    ///////////
    // Helper
    //////////


    var util = {
        extend : function (regexes, extensions) {
            var margedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    margedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    margedRegexes[i] = regexes[i];
                }
            }
            return margedRegexes;
        },
        has : function (str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize : function (str) {
            return str.toLowerCase();
        },
        major : function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
        },
        trim : function (str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
    };


    ///////////////
    // Map helper
    //////////////


    var mapper = {

        rgx : function (ua, arrays) {

            //var result = {},
            var i = 0, j, k, p, q, matches, match;//, args = arguments;

            /*// construct object barebones
            for (p = 0; p < args[1].length; p++) {
                q = args[1][p];
                result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
            }*/

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
            // console.log(this);
            //return this;
        },

        str : function (str, map) {

            for (var i in map) {
                // check if array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
        }
    };


    ///////////////
    // String map
    //////////////


    var maps = {

        browser : {
            oldsafari : {
                version : {
                    '1.0'   : '/8',
                    '1.2'   : '/1',
                    '1.3'   : '/3',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    '?'     : '/'
                }
            }
        },

        device : {
            amazon : {
                model : {
                    'Fire Phone' : ['SD', 'KF']
                }
            },
            sprint : {
                model : {
                    'Evo Shift 4G' : '7373KT'
                },
                vendor : {
                    'HTC'       : 'APA',
                    'Sprint'    : 'Sprint'
                }
            }
        },

        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    '8.1'       : 'NT 6.3',
                    '10'        : ['NT 6.4', 'NT 10.0'],
                    'RT'        : 'ARM'
                }
            }
        }
    };


    //////////////
    // Regex map
    /////////////


    var regexes = {

        browser : [[

            // Presto based
            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
            ], [NAME, VERSION], [

            /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
            ], [[NAME, 'Opera Mini'], VERSION], [

            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
            ], [[NAME, 'Opera'], VERSION], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer

            // Trident based
            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser/Baidu
            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)\/([\w\.]*)/i,                                             // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
            ], [NAME, VERSION], [

            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
            ], [[NAME, 'IE'], VERSION], [

            /(edge|edgios|edga)\/((\d+)?[\w\.]+)/i                              // Microsoft Edge
            ], [[NAME, 'Edge'], VERSION], [

            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
            ], [[NAME, 'Yandex'], VERSION], [

            /(puffin)\/([\w\.]+)/i                                              // Puffin
            ], [[NAME, 'Puffin'], VERSION], [

            /(focus)\/([\w\.]+)/i                                               // Firefox Focus
            ], [[NAME, 'Firefox Focus'], VERSION], [

            /(opt)\/([\w\.]+)/i                                                 // Opera Touch
            ], [[NAME, 'Opera Touch'], VERSION], [

            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i         // UCBrowser
            ], [[NAME, 'UCBrowser'], VERSION], [

            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [

            /(micromessenger)\/([\w\.]+)/i                                      // WeChat
            ], [[NAME, 'WeChat'], VERSION], [

            /(brave)\/([\w\.]+)/i                                              // Brave browser
            ], [[NAME, 'Brave'], VERSION], [

            /(qqbrowserlite)\/([\w\.]+)/i                                       // QQBrowserLite
            ], [NAME, VERSION], [

            /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
            ], [NAME, VERSION], [

            /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
            ], [NAME, VERSION], [

            /(BIDUBrowser)[\/\s]?([\w\.]+)/i                                    // Baidu Browser
            ], [NAME, VERSION], [

            /(2345Explorer)[\/\s]?([\w\.]+)/i                                   // 2345 Browser
            ], [NAME, VERSION], [

            /(MetaSr)[\/\s]?([\w\.]+)/i                                         // SouGouBrowser
            ], [NAME], [

            /(LBBROWSER)/i                                      // LieBao Browser
            ], [NAME], [

            /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
            ], [VERSION, [NAME, 'MIUI Browser']], [

            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
            ], [VERSION, [NAME, 'Facebook']], [

            /safari\s(line)\/([\w\.]+)/i,                                       // Line App for iOS
            /android.+(line)\/([\w\.]+)\/iab/i                                  // Line App for Android
            ], [NAME, VERSION], [

            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
            ], [VERSION, [NAME, 'Chrome Headless']], [

            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
            ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

            /((?:oculus|samsung)browser)\/([\w\.]+)/i
            ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
            ], [VERSION, [NAME, 'Android Browser']], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
            ], [[NAME, 'Dolphin'], VERSION], [

            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
            ], [[NAME, 'Chrome'], VERSION], [

            /(coast)\/([\w\.]+)/i                                               // Opera Coast
            ], [[NAME, 'Opera Coast'], VERSION], [

            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, 'Firefox']], [

            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [

            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
            ], [VERSION, NAME], [

            /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i  // Google Search Appliance on iOS
            ], [[NAME, 'GSA'], VERSION], [

            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

            /(konqueror)\/([\w\.]+)/i,                                          // Konqueror
            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
            /(links)\s\(([\w\.]+)/i,                                            // Links
            /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
            ], [NAME, VERSION]

            /* /////////////////////
            // Media players BEGIN
            ////////////////////////

            , [

            /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
            /(coremedia) v((\d+)[\w\._]+)/i
            ], [NAME, VERSION], [

            /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
            ], [NAME, VERSION], [

            /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
            ], [NAME, VERSION], [

            /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
                                                                                // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
                                                                                // NSPlayer/PSP-InternetRadioPlayer/Videos
            /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
            /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
            /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
            ], [NAME, VERSION], [
            /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
            ], [NAME, VERSION], [

            /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
            ], [[NAME, 'Flip Player'], VERSION], [

            /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
                                                                                // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
            ], [NAME], [

            /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
                                                                                // Gstreamer
            ], [NAME, VERSION], [

            /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
            /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
                                                                                // Java/urllib/requests/wget/cURL
            /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
            ], [NAME, VERSION], [

            /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
            ], [[NAME, /_/g, ' '], VERSION], [

            /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
                                                                                // MPlayer SVN
            ], [NAME, VERSION], [

            /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
            ], [NAME, VERSION], [

            /(mplayer)/i,                                                       // MPlayer (no other info)
            /(yourmuze)/i,                                                      // YourMuze
            /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
            ], [NAME], [

            /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
            ], [NAME, VERSION], [

            /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
            ], [NAME, VERSION], [

            /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
            ], [NAME, VERSION], [

            /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
            /(winamp)\s((\d+)[\w\.-]+)/i,
            /(winamp)mpeg\/((\d+)[\w\.-]+)/i
            ], [NAME, VERSION], [

            /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                                // inlight radio
            ], [NAME], [

            /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
                                                                                // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                                // SoundTap/Totem/Stagefright/Streamium
            ], [NAME, VERSION], [

            /(smp)((\d+)[\d\.]+)/i                                              // SMP
            ], [NAME, VERSION], [

            /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
            /(vlc)\/((\d+)[\w\.-]+)/i,
            /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
            /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
            /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
            ], [NAME, VERSION], [

            /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
            /(windows-media-player)\/((\d+)[\w\.-]+)/i
            ], [[NAME, /-/g, ' '], VERSION], [

            /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
                                                                                // Windows Media Server
            ], [VERSION, [NAME, 'Windows']], [

            /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
            ], [NAME, VERSION], [

            /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
            /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
            ], [[NAME, 'rad.io'], VERSION]

            //////////////////////
            // Media players END
            ////////////////////*/

        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, util.lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32
            ], [[ARCHITECTURE, 'ia32']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, util.lowerize]]
        ],

        device : [[

            /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i                         // iPad/PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [

            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

            /(apple\s{0,1}tv)/i                                                 // Apple TV
            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [

            /(archos)\s(gamepad2?)/i,                                           // Archos
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(hp).+(tablet)/i,                                                  // HP Tablet
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(kf[A-z]+)\sbuild\/.+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
            /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i                         // Fire Phone
            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [
            /android.+aft([bms])\sbuild/i                                       // Fire TV
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [

            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
                                                                                // Asus Tablets
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i
            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
            /(sony)?(?:sgp.+)\sbuild\//i
            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
            /android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /\s(ouya)\s/i,                                                      // Ouya
            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

            /android.+;\s(shield)\sbuild/i                                      // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

            /(playstation\s[34portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

            /(sprint\s(\w+))/i                                                  // Sprint Phones
            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

            /(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i                         // Lenovo tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
            /(zte)-(\w*)/i,                                                     // ZTE
            /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                                                                                // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            /(nexus\s9)/i                                                       // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

            /d\/huawei([\w\s-]+)[;\)]/i,
            /(nexus\s6p)/i                                                      // Huawei
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

            /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

                                                                                // Motorola
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w*)/i,
            /(XT\d{3,4}) build\//i,
            /(nexus\s6)/i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
            /((SM-T\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
            /smart-tv.+(samsung)/i
            ], [VENDOR, [TYPE, SMARTTV], MODEL], [
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
            /sec-((sgh\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

            /sie-(\w*)/i                                                        // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]*)/i
            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

            /android\s3\.[\s\w;-]{10}(a\d{3})/i                                 // Acer
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
            /(lg) netcast\.tv/i                                                 // LG SmartTV
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /(nexus\s[45])/i,                                                   // LG
            /lg[e;\s\/-]+(\w*)/i,
            /android.+lg(\-?[\d\w]+)\s+build/i
            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

            /linux;.+((jolla));/i                                               // Jolla
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google']], [

            /android.+;\s(glass)\s\d/i                                          // Google Glass
            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

            /android.+;\s(pixel c)[\s)]/i                                       // Google Pixel C
            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

            /android.+;\s(pixel( [23])?( xl)?)\s/i                              // Google Pixel
            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

            /android.+;\s(\w+)\s+build\/hm\1/i,                                 // Xiaomi Hongmi 'numeric' models
            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
            /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,    // Xiaomi Mi
            /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i       // Redmi Phones
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
            /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i            // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
            /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu Tablet
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, TABLET]], [
            /(mz)-([\w-]{2,})/i                                                 // Meizu Phone
            ], [[VENDOR, 'Meizu'], MODEL, [TYPE, MOBILE]], [

            /android.+a000(1)\s+build/i,                                        // OnePlus
            /android.+oneplus\s(a\d{4})\s+build/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

            /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i                      // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i     // Barnes & Noble Tablet
            ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

            /android.+;\s(k88)\sbuild/i                                         // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

            /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i        // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i                            // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i                    // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

            /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i                     // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

            /android.+;\s(PH-1)\s/i
            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [                // Essential PH-1

            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i          // Le Pan Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i                         // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

            /android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

            /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i                      // Gigaset Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
            ], [[TYPE, util.lowerize], VENDOR, MODEL], [

            /(android[\w\.\s\-]{0,9});.+build/i                                 // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]


        /*//////////////////////////
            // TODO: move to string map
            ////////////////////////////

            /(C6603)/i                                                          // Sony Xperia Z C6603
            ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
            /(C6903)/i                                                          // Sony Xperia Z 1
            ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
            ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
            ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
            ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G313HZ)/i                                                      // Samsung Galaxy V
            ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
            ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
            /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
            ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
            ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [

            /(T3C)/i                                                            // Advan Vandroid T3C
            ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
            ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
            ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [

            /(V972M)/i                                                          // ZTE V972M
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [

            /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
            ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
            /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
            ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [

            /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
            ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [

            /////////////
            // END TODO
            ///////////*/

        ],

        engine : [[

            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, 'EdgeHTML']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9}).+(gecko)/i                                       // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [[NAME, 'BlackBerry'], VERSION], [
            /(blackberry)\w*\/?([\w\.]*)/i,                                     // Blackberry
            /(tizen)[\/\s]([\w\.]+)/i,                                          // Tizen
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i,
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
            /linux;.+(sailfish);/i                                              // Sailfish OS
            ], [NAME, VERSION], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i                  // Symbian
            ], [[NAME, 'Symbian'], VERSION], [
            /\((series40);/i                                                    // Series 40
            ], [NAME], [
            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
            ], [[NAME, 'Firefox OS'], VERSION], [

            // Console
            /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w*)/i,                                            // Mint
            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
            /(gnu)\s?([\w\.]*)/i                                                // GNU
            ], [NAME, VERSION], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Solaris
            /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
            ], [[NAME, 'Solaris'], VERSION], [

            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i                    // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            ], [NAME, VERSION],[

            /(haiku)\s(\w+)/i                                                   // Haiku
            ], [NAME, VERSION],[

            /cfnetwork\/.+darwin/i,
            /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i             // iOS
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

            /(mac\sos\sx)\s?([\w\s\.]*)/i,
            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Other
            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
            /(unix)\s?([\w\.]*)/i                                               // UNIX
            ], [NAME, VERSION]
        ]
    };


    /////////////////
    // Constructor
    ////////////////
    /*
    var Browser = function (name, version) {
        this[NAME] = name;
        this[VERSION] = version;
    };
    var CPU = function (arch) {
        this[ARCHITECTURE] = arch;
    };
    var Device = function (vendor, model, type) {
        this[VENDOR] = vendor;
        this[MODEL] = model;
        this[TYPE] = type;
    };
    var Engine = Browser;
    var OS = Browser;
    */
    var UAParser = function (uastring, extensions) {

        if (typeof uastring === 'object') {
            extensions = uastring;
            uastring = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(uastring, extensions).getResult();
        }

        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
        //var browser = new Browser();
        //var cpu = new CPU();
        //var device = new Device();
        //var engine = new Engine();
        //var os = new OS();

        this.getBrowser = function () {
            var browser = { name: undefined, version: undefined };
            mapper.rgx.call(browser, ua, rgxmap.browser);
            browser.major = util.major(browser.version); // deprecated
            return browser;
        };
        this.getCPU = function () {
            var cpu = { architecture: undefined };
            mapper.rgx.call(cpu, ua, rgxmap.cpu);
            return cpu;
        };
        this.getDevice = function () {
            var device = { vendor: undefined, model: undefined, type: undefined };
            mapper.rgx.call(device, ua, rgxmap.device);
            return device;
        };
        this.getEngine = function () {
            var engine = { name: undefined, version: undefined };
            mapper.rgx.call(engine, ua, rgxmap.engine);
            return engine;
        };
        this.getOS = function () {
            var os = { name: undefined, version: undefined };
            mapper.rgx.call(os, ua, rgxmap.os);
            return os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return ua;
        };
        this.setUA = function (uastring) {
            ua = uastring;
            //browser = new Browser();
            //cpu = new CPU();
            //device = new Device();
            //engine = new Engine();
            //os = new OS();
            return this;
        };
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = {
        NAME    : NAME,
        MAJOR   : MAJOR, // deprecated
        VERSION : VERSION
    };
    UAParser.CPU = {
        ARCHITECTURE : ARCHITECTURE
    };
    UAParser.DEVICE = {
        MODEL   : MODEL,
        VENDOR  : VENDOR,
        TYPE    : TYPE,
        CONSOLE : CONSOLE,
        MOBILE  : MOBILE,
        SMARTTV : SMARTTV,
        TABLET  : TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED
    };
    UAParser.ENGINE = {
        NAME    : NAME,
        VERSION : VERSION
    };
    UAParser.OS = {
        NAME    : NAME,
        VERSION : VERSION
    };
    //UAParser.Utils = util;

    ///////////
    // Export
    //////////


    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }
        // TODO: test!!!!!!!!
        /*
        if (require && require.main === module && process) {
            // cli
            var jsonize = function (arr) {
                var res = [];
                for (var i in arr) {
                    res.push(new UAParser(arr[i]).getResult());
                }
                process.stdout.write(JSON.stringify(res, null, 2) + '\n');
            };
            if (process.stdin.isTTY) {
                // via args
                jsonize(process.argv.slice(2));
            } else {
                // via pipe
                var str = '';
                process.stdin.on('readable', function() {
                    var read = process.stdin.read();
                    if (read !== null) {
                        str += read;
                    }
                });
                process.stdin.on('end', function () {
                    jsonize(str.replace(/\n$/, '').split('\n'));
                });
            }
        }
        */
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if ("function" === FUNC_TYPE && __webpack_require__(38)) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
                return UAParser;
            }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else if (window) {
            // browser env
            window.UAParser = UAParser;
        }
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = window && (window.jQuery || window.Zepto);
    if (typeof $ !== UNDEF_TYPE && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (uastring) {
            parser.setUA(uastring);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : this);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/notify/Messages.ts
var errorPrefix = 'NotifyError:';
/* harmony default export */ var Messages = ({
  errors: {
    incompatible: "".concat(errorPrefix, " PodNotifyJs is incompatible with browser."),
    invalid_plugin: "".concat(errorPrefix, " plugin class missing from plugin manifest (invalid plugin). Please check the documentation."),
    invalid_title: "".concat(errorPrefix, " title of notification must be a string"),
    permission_denied: "".concat(errorPrefix, " permission request declined"),
    sw_notification_error: "".concat(errorPrefix, " could not show a ServiceWorker notification due to the following reason: "),
    sw_registration_error: "".concat(errorPrefix, " could not register the ServiceWorker due to the following reason: "),
    unknown_interface: "".concat(errorPrefix, " unable to create notification: unknown interface")
  }
});
// CONCATENATED MODULE: ./src/notify/Permission.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Permission =
/*#__PURE__*/
function () {
  // Private members
  // Public members
  function Permission(win) {
    _classCallCheck(this, Permission);

    _defineProperty(this, "_permissions", void 0);

    _defineProperty(this, "_win", void 0);

    _defineProperty(this, "GRANTED", void 0);

    _defineProperty(this, "DEFAULT", void 0);

    _defineProperty(this, "DENIED", void 0);

    this._win = win;
    this.GRANTED = 'granted';
    this.DEFAULT = 'default';
    this.DENIED = 'denied';
    this._permissions = [this.GRANTED, this.DEFAULT, this.DENIED];
  }
  /**
    * Requests permission for desktop notifications
    * @param {Function} onGranted - Function to execute once permission is granted
    * @param {Function} onDenied - Function to execute once permission is denied
    * @return {void, Promise}
    */


  _createClass(Permission, [{
    key: "request",
    value: function request(onGranted, onDenied) {
      return arguments.length > 0 // @ts-ignore
      ? this._requestWithCallback.apply(this, arguments) : this._requestAsPromise();
    }
    /**
      * Old permissions implementation deprecated in favor of a promise based one
      * @deprecated Since V1.0.4
      * @param {Function} onGranted - Function to execute once permission is granted
      * @param {Function} onDenied - Function to execute once permission is denied
      * @return {void}
      */

  }, {
    key: "_requestWithCallback",
    value: function _requestWithCallback(onGranted, onDenied) {
      var _this = this;

      var existing = this.get();
      var resolved = false;

      var resolve = function resolve() {
        var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._win.Notification.permission;
        if (resolved) return;
        resolved = true;
        if (typeof result === 'undefined' && _this._win.webkitNotifications) result = _this._win.webkitNotifications.checkPermission();

        if (result === _this.GRANTED || result === 0) {
          if (onGranted) onGranted();
        } else if (onDenied) onDenied();
      };

      var request;
      /* Permissions already set */

      if (existing !== this.DEFAULT) {
        resolve(existing);
      } else if (this._win.webkitNotifications && this._win.webkitNotifications.checkPermission) {
        /* Safari 6+, Legacy webkit browsers */
        this._win.webkitNotifications.requestPermission(resolve);
      } else if (this._win.Notification && this._win.Notification.requestPermission) {
        /* Safari 12+ */

        /* This resolve argument will only be used in Safari */

        /* CHrome, instead, returns a Promise */
        request = this._win.Notification.requestPermission(resolve);

        if (request && request.then) {
          /* Chrome 23+ */
          request.then(resolve).catch(function () {
            if (onDenied) onDenied();
          });
        }
      } else if (onGranted) {
        /* Let the user continue by default */
        onGranted();
      }
    }
    /**
      * Requests permission for desktop notifications in a promise based way
      * @return {Promise}
      */

  }, {
    key: "_requestAsPromise",
    value: function _requestAsPromise() {
      var _this2 = this;

      var existing = this.get();

      var isGranted = function isGranted(result) {
        return result === _this2.GRANTED || result === 0;
      };
      /* Permissions already set */


      var hasPermissions = existing !== this.DEFAULT;
      /* Safari 6+, Chrome 23+ */

      var isModernAPI = this._win.Notification && this._win.Notification.requestPermission;
      /* Legacy webkit browsers */

      var isWebkitAPI = this._win.webkitNotifications && this._win.webkitNotifications.checkPermission;
      return new Promise(function (resolvePromise, rejectPromise) {
        var resolved = false;

        var resolver = function resolver(result) {
          if (resolved) return;
          resolved = true;
          isGranted(result) ? resolvePromise() : rejectPromise();
        };

        var request;

        if (hasPermissions) {
          resolver(existing);
        } else if (isWebkitAPI) {
          _this2._win.webkitNotifications.requestPermission(function (result) {
            resolver(result);
          });
        } else if (isModernAPI) {
          /* Safari 12+ */

          /* This resolver argument will only be used in Safari */

          /* CHrome, instead, returns a Promise */
          request = _this2._win.Notification ? _this2._win.Notification.requestPermission(resolver) : undefined;

          if (request && request.then) {
            /* Chrome 23+ */
            request.then(resolver).catch(rejectPromise);
          }
        } else resolvePromise();
      });
    }
    /**
      * Returns whether Notify has been granted permission to run
      * @return {Boolean}
      */

  }, {
    key: "has",
    value: function has() {
      return this.get() === this.GRANTED;
    }
    /**
      * Gets the permission level
      * @return {Permission} The permission level
      */

  }, {
    key: "get",
    value: function get() {
      var permission;
      /* Safari 6+, Chrome 23+ */

      if (this._win.Notification && this._win.Notification.permission) permission = this._win.Notification.permission;else if (this._win.webkitNotifications && this._win.webkitNotifications.checkPermission)
        /* Legacy webkit browsers */
        permission = this._permissions[this._win.webkitNotifications.checkPermission()];else if (navigator.mozNotification)
        /* Firefox Mobile */
        permission = this.GRANTED;else if (this._win.external && this._win.external.msIsSiteMode)
        /* IE9+ */
        permission = this._win.external.msIsSiteMode() ? this.GRANTED : this.DEFAULT;else permission = this.GRANTED;
      return permission;
    }
  }]);

  return Permission;
}();


// CONCATENATED MODULE: ./src/notify/Util.ts
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Util_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Util_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Util_createClass(Constructor, protoProps, staticProps) { if (protoProps) Util_defineProperties(Constructor.prototype, protoProps); if (staticProps) Util_defineProperties(Constructor, staticProps); return Constructor; }

var Util =
/*#__PURE__*/
function () {
  function Util() {
    Util_classCallCheck(this, Util);
  }

  Util_createClass(Util, null, [{
    key: "isUndefined",
    value: function isUndefined(obj) {
      return obj === undefined;
    }
  }, {
    key: "isNull",
    value: function isNull(obj) {
      return obj === null;
    }
  }, {
    key: "isString",
    value: function isString(obj) {
      return typeof obj === 'string';
    }
  }, {
    key: "isFunction",
    value: function isFunction(obj) {
      return obj && {}.toString.call(obj) === '[object Function]';
    }
  }, {
    key: "isObject",
    value: function isObject(obj) {
      return _typeof(obj) === 'object';
    }
  }, {
    key: "objectMerge",
    value: function objectMerge(target, source) {
      for (var key in source) {
        if (target.hasOwnProperty(key) && this.isObject(target[key]) && this.isObject(source[key])) {
          this.objectMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
  }]);

  return Util;
}();


// CONCATENATED MODULE: ./src/agents/AbstractAgent.ts
function AbstractAgent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AbstractAgent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AbstractAgent = function AbstractAgent(win) {
  AbstractAgent_classCallCheck(this, AbstractAgent);

  AbstractAgent_defineProperty(this, "_win", void 0);

  this._win = win;
};


// CONCATENATED MODULE: ./src/agents/DesktopAgent.ts
function DesktopAgent_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { DesktopAgent_typeof = function _typeof(obj) { return typeof obj; }; } else { DesktopAgent_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return DesktopAgent_typeof(obj); }

function DesktopAgent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function DesktopAgent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function DesktopAgent_createClass(Constructor, protoProps, staticProps) { if (protoProps) DesktopAgent_defineProperties(Constructor.prototype, protoProps); if (staticProps) DesktopAgent_defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (DesktopAgent_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




/**
 * Notification agent for modern desktop browsers:
 * Safari 6+, Firefox 22+, Chrome 22+, Opera 25+
 */
var DesktopAgent_DesktopAgent =
/*#__PURE__*/
function (_AbstractAgent) {
  _inherits(DesktopAgent, _AbstractAgent);

  function DesktopAgent() {
    DesktopAgent_classCallCheck(this, DesktopAgent);

    return _possibleConstructorReturn(this, _getPrototypeOf(DesktopAgent).apply(this, arguments));
  }

  DesktopAgent_createClass(DesktopAgent, [{
    key: "isSupported",

    /**
     * Returns a boolean denoting support
     * @returns {Boolean} boolean denoting whether webkit notifications are supported
     */
    value: function isSupported() {
      return this._win.Notification !== undefined;
    }
    /**
     * Creates a new notification
     * @param title - notification title
     * @param options - notification options array
     * @returns {Notification}
     */

  }, {
    key: "create",
    value: function create(title, options) {
      return new this._win.Notification(title, {
        icon: Util.isString(options.icon) || Util.isUndefined(options.icon) || Util.isNull(options.icon) ? options.icon : options.icon.x32,
        body: options.body,
        tag: options.tag,
        requireInteraction: options.requireInteraction
      });
    }
    /**
     * Close a given notification
     * @param notification - notification to close
     */

  }, {
    key: "close",
    value: function close(notification) {
      notification.close();
    }
  }]);

  return DesktopAgent;
}(AbstractAgent);


// CONCATENATED MODULE: ./src/agents/MobileChromeAgent.ts
function MobileChromeAgent_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { MobileChromeAgent_typeof = function _typeof(obj) { return typeof obj; }; } else { MobileChromeAgent_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return MobileChromeAgent_typeof(obj); }

function MobileChromeAgent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MobileChromeAgent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MobileChromeAgent_createClass(Constructor, protoProps, staticProps) { if (protoProps) MobileChromeAgent_defineProperties(Constructor.prototype, protoProps); if (staticProps) MobileChromeAgent_defineProperties(Constructor, staticProps); return Constructor; }

function MobileChromeAgent_possibleConstructorReturn(self, call) { if (call && (MobileChromeAgent_typeof(call) === "object" || typeof call === "function")) { return call; } return MobileChromeAgent_assertThisInitialized(self); }

function MobileChromeAgent_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function MobileChromeAgent_getPrototypeOf(o) { MobileChromeAgent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return MobileChromeAgent_getPrototypeOf(o); }

function MobileChromeAgent_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) MobileChromeAgent_setPrototypeOf(subClass, superClass); }

function MobileChromeAgent_setPrototypeOf(o, p) { MobileChromeAgent_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return MobileChromeAgent_setPrototypeOf(o, p); }





/**
 * Notification agent for modern desktop browsers:
 * Safari 6+, Firefox 22+, Chrome 22+, Opera 25+
 */
var MobileChromeAgent_MobileChromeAgent =
/*#__PURE__*/
function (_AbstractAgent) {
  MobileChromeAgent_inherits(MobileChromeAgent, _AbstractAgent);

  function MobileChromeAgent() {
    MobileChromeAgent_classCallCheck(this, MobileChromeAgent);

    return MobileChromeAgent_possibleConstructorReturn(this, MobileChromeAgent_getPrototypeOf(MobileChromeAgent).apply(this, arguments));
  }

  MobileChromeAgent_createClass(MobileChromeAgent, [{
    key: "isSupported",

    /**
     * Returns a boolean denoting support
     * @returns {Boolean} boolean denoting whether webkit notifications are supported
     */
    value: function isSupported() {
      return this._win.navigator !== undefined && this._win.navigator.serviceWorker !== undefined;
    }
    /**
     * Returns the function body as a string
     * @param func
     */

  }, {
    key: "getFunctionBody",
    value: function getFunctionBody(func) {
      var str = func.toString().match(/function[^{]+{([\s\S]*)}$/);
      return typeof str !== 'undefined' && str !== null && str.length > 1 ? str[1] : null;
    }
    /**
     * Creates a new notification
     * @param id				ID of notification
     * @param title			 Title of notification
     * @param options		   Options object
     * @param serviceWorker	 ServiceWorker path
     * @param callback		  Callback function
     */

  }, {
    key: "create",
    value: function create(id, title, options, serviceWorker, callback) {
      var _this = this;

      /* Register ServiceWorker */
      this._win.navigator && this._win.navigator.serviceWorker.register(serviceWorker);
      this._win.navigator && this._win.navigator.serviceWorker.ready.then(function (registration) {
        /* Local data the service worker will use */
        var localData = {
          id: id,
          link: options.link,
          origin: document.location.href,
          onClick: Util.isFunction(options.onClick) ? _this.getFunctionBody(options.onClick) : '',
          onClose: Util.isFunction(options.onClose) ? _this.getFunctionBody(options.onClose) : ''
        };
        /* Merge the local data with user-provided data */

        if (options.data !== undefined && options.data !== null) localData = Object.assign(localData, options.data);
        /* Show the notification */

        registration.showNotification(title, {
          icon: options.icon,
          body: options.body,
          vibrate: options.vibrate,
          tag: options.tag,
          data: localData,
          requireInteraction: options.requireInteraction,
          silent: options.silent
        }).then(function () {
          registration.getNotifications().then(function (notifications) {
            /* Send an empty message so the ServiceWorker knows who the client is */
            registration.active && registration.active.postMessage('');
            /* Trigger callback */

            callback(notifications);
          });
        }).catch(function (error) {
          throw new Error(Messages.errors.sw_notification_error + error.message);
        });
      }).catch(function (error) {
        throw new Error(Messages.errors.sw_registration_error + error.message);
      });
    }
    /**
     * Close all notification
     */

  }, {
    key: "close",
    value: function close() {// Can't do this with service workers
    }
  }]);

  return MobileChromeAgent;
}(AbstractAgent);


// CONCATENATED MODULE: ./src/agents/MobileFirefoxAgent.ts
function MobileFirefoxAgent_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { MobileFirefoxAgent_typeof = function _typeof(obj) { return typeof obj; }; } else { MobileFirefoxAgent_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return MobileFirefoxAgent_typeof(obj); }

function MobileFirefoxAgent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MobileFirefoxAgent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MobileFirefoxAgent_createClass(Constructor, protoProps, staticProps) { if (protoProps) MobileFirefoxAgent_defineProperties(Constructor.prototype, protoProps); if (staticProps) MobileFirefoxAgent_defineProperties(Constructor, staticProps); return Constructor; }

function MobileFirefoxAgent_possibleConstructorReturn(self, call) { if (call && (MobileFirefoxAgent_typeof(call) === "object" || typeof call === "function")) { return call; } return MobileFirefoxAgent_assertThisInitialized(self); }

function MobileFirefoxAgent_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function MobileFirefoxAgent_getPrototypeOf(o) { MobileFirefoxAgent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return MobileFirefoxAgent_getPrototypeOf(o); }

function MobileFirefoxAgent_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) MobileFirefoxAgent_setPrototypeOf(subClass, superClass); }

function MobileFirefoxAgent_setPrototypeOf(o, p) { MobileFirefoxAgent_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return MobileFirefoxAgent_setPrototypeOf(o, p); }



/**
 * Notification agent for modern desktop browsers:
 * Safari 6+, Firefox 22+, Chrome 22+, Opera 25+
 */
var MobileFirefoxAgent =
/*#__PURE__*/
function (_AbstractAgent) {
  MobileFirefoxAgent_inherits(MobileFirefoxAgent, _AbstractAgent);

  function MobileFirefoxAgent() {
    MobileFirefoxAgent_classCallCheck(this, MobileFirefoxAgent);

    return MobileFirefoxAgent_possibleConstructorReturn(this, MobileFirefoxAgent_getPrototypeOf(MobileFirefoxAgent).apply(this, arguments));
  }

  MobileFirefoxAgent_createClass(MobileFirefoxAgent, [{
    key: "isSupported",

    /**
     * Returns a boolean denoting support
     * @returns {Boolean} boolean denoting whether webkit notifications are supported
     */
    value: function isSupported() {
      return this._win.navigator && this._win.navigator.mozNotification !== undefined;
    }
    /**
     * Creates a new notification
     * @param title - notification title
     * @param options - notification options array
     * @returns {Notification}
     */

  }, {
    key: "create",
    value: function create(title, options) {
      var notification = this._win.navigator && this._win.navigator.mozNotification.createNotification(title, options.body, options.icon);

      notification.show();
      return notification;
    }
  }]);

  return MobileFirefoxAgent;
}(AbstractAgent);


// CONCATENATED MODULE: ./src/agents/MSAgent.ts
function MSAgent_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { MSAgent_typeof = function _typeof(obj) { return typeof obj; }; } else { MSAgent_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return MSAgent_typeof(obj); }

function MSAgent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MSAgent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MSAgent_createClass(Constructor, protoProps, staticProps) { if (protoProps) MSAgent_defineProperties(Constructor.prototype, protoProps); if (staticProps) MSAgent_defineProperties(Constructor, staticProps); return Constructor; }

function MSAgent_possibleConstructorReturn(self, call) { if (call && (MSAgent_typeof(call) === "object" || typeof call === "function")) { return call; } return MSAgent_assertThisInitialized(self); }

function MSAgent_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function MSAgent_getPrototypeOf(o) { MSAgent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return MSAgent_getPrototypeOf(o); }

function MSAgent_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) MSAgent_setPrototypeOf(subClass, superClass); }

function MSAgent_setPrototypeOf(o, p) { MSAgent_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return MSAgent_setPrototypeOf(o, p); }




/**
 * Notification agent for IE9
 */
var MSAgent_MSAgent =
/*#__PURE__*/
function (_AbstractAgent) {
  MSAgent_inherits(MSAgent, _AbstractAgent);

  function MSAgent() {
    MSAgent_classCallCheck(this, MSAgent);

    return MSAgent_possibleConstructorReturn(this, MSAgent_getPrototypeOf(MSAgent).apply(this, arguments));
  }

  MSAgent_createClass(MSAgent, [{
    key: "isSupported",

    /**
     * Returns a boolean denoting support
     * @returns {Boolean} boolean denoting whether webkit notifications are supported
     */
    value: function isSupported() {
      return this._win.external !== undefined && this._win.external.msIsSiteMode !== undefined;
    }
    /**
     * Creates a new notification
     * @param title - notification title
     * @param options - notification options array
     * @returns {Notification}
     */

  }, {
    key: "create",
    value: function create(title, options) {
      /* Clear any previous notifications */
      this._win.external.msSiteModeClearIconOverlay();

      this._win.external.msSiteModeSetIconOverlay(Util.isString(options.icon) || Util.isUndefined(options.icon) ? options.icon : options.icon.x16, title);

      this._win.external.msSiteModeActivate();

      return null;
    }
    /**
     * Close a given notification
     * @param notification - notification to close
     */

  }, {
    key: "close",
    value: function close() {
      this._win.external.msSiteModeClearIconOverlay();
    }
  }]);

  return MSAgent;
}(AbstractAgent);


// CONCATENATED MODULE: ./src/agents/WebKitAgent.ts
function WebKitAgent_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { WebKitAgent_typeof = function _typeof(obj) { return typeof obj; }; } else { WebKitAgent_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return WebKitAgent_typeof(obj); }

function WebKitAgent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function WebKitAgent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function WebKitAgent_createClass(Constructor, protoProps, staticProps) { if (protoProps) WebKitAgent_defineProperties(Constructor.prototype, protoProps); if (staticProps) WebKitAgent_defineProperties(Constructor, staticProps); return Constructor; }

function WebKitAgent_possibleConstructorReturn(self, call) { if (call && (WebKitAgent_typeof(call) === "object" || typeof call === "function")) { return call; } return WebKitAgent_assertThisInitialized(self); }

function WebKitAgent_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function WebKitAgent_getPrototypeOf(o) { WebKitAgent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return WebKitAgent_getPrototypeOf(o); }

function WebKitAgent_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) WebKitAgent_setPrototypeOf(subClass, superClass); }

function WebKitAgent_setPrototypeOf(o, p) { WebKitAgent_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return WebKitAgent_setPrototypeOf(o, p); }



/**
 * Notification agent for old Chrome versions (and some) Firefox
 */
var WebKitAgent =
/*#__PURE__*/
function (_AbstractAgent) {
  WebKitAgent_inherits(WebKitAgent, _AbstractAgent);

  function WebKitAgent() {
    WebKitAgent_classCallCheck(this, WebKitAgent);

    return WebKitAgent_possibleConstructorReturn(this, WebKitAgent_getPrototypeOf(WebKitAgent).apply(this, arguments));
  }

  WebKitAgent_createClass(WebKitAgent, [{
    key: "isSupported",

    /**
     * Returns a boolean denoting support
     * @returns {Boolean} boolean denoting whether webkit notifications are supported
     */
    value: function isSupported() {
      return this._win.webkitNotifications !== undefined;
    }
    /**
     * Creates a new notification
     * @param title - notification title
     * @param options - notification options array
     * @returns {Notification}
     */

  }, {
    key: "create",
    value: function create(title, options) {
      var notification = this._win.webkitNotifications.createNotification(options.icon, title, options.body);

      notification.show();
      return notification;
    }
    /**
     * Close a given notification
     * @param notification - notification to close
     */

  }, {
    key: "close",
    value: function close(notification) {
      notification.cancel();
    }
  }]);

  return WebKitAgent;
}(AbstractAgent);


// CONCATENATED MODULE: ./src/agents/index.ts







// CONCATENATED MODULE: ./src/notify/Notify.ts
function Notify_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Notify_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Notify_createClass(Constructor, protoProps, staticProps) { if (protoProps) Notify_defineProperties(Constructor.prototype, protoProps); if (staticProps) Notify_defineProperties(Constructor, staticProps); return Constructor; }

function Notify_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* Import notification agents */





var Notify_Notify =
/*#__PURE__*/
function () {
  // Private members
  // Public members
  function Notify(win) {
    Notify_classCallCheck(this, Notify);

    Notify_defineProperty(this, "_agents", void 0);

    Notify_defineProperty(this, "_configuration", void 0);

    Notify_defineProperty(this, "_currentId", void 0);

    Notify_defineProperty(this, "_notifications", void 0);

    Notify_defineProperty(this, "_win", void 0);

    Notify_defineProperty(this, "Permission", void 0);

    /* Private variables */

    /* ID to use for new notifications */
    this._currentId = 0;
    /* Map of open notifications */

    this._notifications = {};
    /* Window object */

    this._win = win;
    /* Public variables */

    this.Permission = new Permission(win);
    /* Agents */

    this._agents = {
      desktop: new DesktopAgent_DesktopAgent(win),
      chrome: new MobileChromeAgent_MobileChromeAgent(win),
      firefox: new MobileFirefoxAgent(win),
      ms: new MSAgent_MSAgent(win),
      webkit: new WebKitAgent(win)
    };
    this._configuration = {
      serviceWorker: '/serviceWorker.min.js',
      fallback: function fallback(_) {}
    };
  }
  /**
   * Closes a notification
   * @param id			ID of notification
   * @returns {boolean}   denotes whether the operation was successful
   * @private
   */


  Notify_createClass(Notify, [{
    key: "_closeNotification",
    value: function _closeNotification(id) {
      var success = true;
      var notification = this._notifications[id];

      if (notification !== undefined) {
        success = this._removeNotification(id);
        /* Safari 6+, Firefox 22+, Chrome 22+, Opera 25+ */

        if (this._agents.desktop.isSupported()) this._agents.desktop.close(notification);else if (this._agents.webkit.isSupported())
          /* Legacy WebKit browsers */
          this._agents.webkit.close(notification);else if (this._agents.ms.isSupported())
          /* IE9 */
          this._agents.ms.close();else {
          success = false;
          throw new Error(Messages.errors.unknown_interface);
        }
        return success;
      }

      return false;
    }
    /**
      * Adds a notification to the global dictionary of notifications
      * @param {Notification} notification
      * @return {Integer} Dictionary key of the notification
      * @private
      */

  }, {
    key: "_addNotification",
    value: function _addNotification(notification) {
      var id = this._currentId;
      this._notifications[id] = notification;
      this._currentId++;
      return id;
    }
    /**
      * Removes a notification with the given ID
      * @param  {Integer} id - Dictionary key/ID of the notification to remove
      * @return {Boolean} boolean denoting success
      * @private
      */

  }, {
    key: "_removeNotification",
    value: function _removeNotification(id) {
      var success = false;

      if (this._notifications.hasOwnProperty(id)) {
        /* We're successful if we omit the given ID from the new array */
        delete this._notifications[id];
        success = true;
      }

      return success;
    }
    /**
      * Creates the wrapper for a given notification
      *
      * @param {Integer} id - Dictionary key/ID of the notification
      * @param {Map} options - Options used to create the notification
      * @returns {Map} wrapper hashmap object
      * @private
      */

  }, {
    key: "_prepareNotification",
    value: function _prepareNotification(id, options) {
      var _this = this;

      var wrapper;
      /* Wrapper used to get/close notification later on */

      wrapper = {
        get: function get() {
          return _this._notifications[id];
        },
        close: function close() {
          _this._closeNotification(id);
        }
      };
      /* Autoclose timeout */

      if (options.timeout) {
        setTimeout(function () {
          wrapper.close();
        }, options.timeout);
      }

      return wrapper;
    }
    /**
      * Find the most recent notification from a ServiceWorker and add it to the global array
      * @param notifications
      * @private
      */

  }, {
    key: "_serviceWorkerCallback",
    value: function _serviceWorkerCallback(notifications, options, resolve) {
      var _this2 = this;

      var id = this._addNotification(notifications[notifications.length - 1]);
      /* Listen for close requests from the ServiceWorker */


      if (navigator && navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener('message', function (event) {
          var data = JSON.parse(event.data);
          if (data.action === 'close' && Number.isInteger(data.id)) _this2._removeNotification(data.id);
        });
        resolve(this._prepareNotification(id, options));
      }

      resolve(null);
    }
    /**
      * Callback function for the 'create' method
      * @return {void}
      * @private
      */

  }, {
    key: "_createCallback",
    value: function _createCallback(title, options, resolve) {
      var _this3 = this;

      var notification = null;
      var onClose;
      /* Set empty settings if none are specified */

      options = options || {};
      /* onClose event handler */

      onClose = function onClose(id, _) {
        /* A bit redundant, but covers the cases when close() isn't explicitly called */
        _this3._removeNotification(id);

        if (Util.isFunction(options.onClose)) {
          options.onClose.call(_this3, notification);
        }
      };
      /* Safari 6+, Firefox 22+, Chrome 22+, Opera 25+ */


      if (this._agents.desktop.isSupported()) {
        try {
          /* Create a notification using the API if possible */
          notification = this._agents.desktop.create(title, options);
        } catch (e) {
          var id = this._currentId;
          var sw = this.config().serviceWorker;

          var cb = function cb(notifications) {
            return _this3._serviceWorkerCallback(notifications, options, resolve);
          };
          /* Create a Chrome ServiceWorker notification if it isn't supported */


          if (this._agents.chrome.isSupported()) {
            this._agents.chrome.create(id, title, options, sw, cb);
          }
        }
        /* Legacy WebKit browsers */

      } else if (this._agents.webkit.isSupported()) notification = this._agents.webkit.create(title, options);else if (this._agents.firefox.isSupported())
        /* Firefox Mobile */
        this._agents.firefox.create(title, options);else if (this._agents.ms.isSupported())
        /* IE9 */
        notification = this._agents.ms.create(title, options);else {
        /* Default fallback */
        options.title = title;
        this.config().fallback(options);
      }

      if (notification !== null) {
        var _id = this._addNotification(notification);

        var wrapper = this._prepareNotification(_id, options);
        /* Notification callbacks */


        if (Util.isFunction(options.onShow)) notification.addEventListener('show', options.onShow);
        if (Util.isFunction(options.onError)) notification.addEventListener('error', options.onError);
        if (Util.isFunction(options.onClick)) notification.addEventListener('click', options.onClick);
        notification.addEventListener('close', function () {
          onClose(_id);
        });
        notification.addEventListener('cancel', function () {
          onClose(_id);
        });
        /* Return the wrapper so the user can call close() */

        resolve(wrapper);
      }
      /* By default, pass an empty wrapper */


      resolve(null);
    }
    /**
      * Creates and displays a new notification
      * @param {Array} options
      * @return {Promise}
      */

  }, {
    key: "create",
    value: function create(title, options) {
      var _this4 = this;

      var promiseCallback;
      /* Fail if no or an invalid title is provided */

      if (!Util.isString(title)) {
        throw new Error(Messages.errors.invalid_title);
      }
      /* Request permission if it isn't granted */


      if (!this.Permission.has()) {
        promiseCallback = function promiseCallback(resolve, reject) {
          var promise = _this4.Permission.request();

          if (promise) {
            promise.then(function () {
              _this4._createCallback(title, options, resolve);
            }).catch(function () {
              reject(Messages.errors.permission_denied);
            });
          }
        };
      } else {
        promiseCallback = function promiseCallback(resolve, reject) {
          try {
            _this4._createCallback(title, options, resolve);
          } catch (e) {
            reject(e);
          }
        };
      }

      return new Promise(promiseCallback);
    }
    /**
      * Returns the notification count
      * @return {Integer} The notification count
      */

  }, {
    key: "count",
    value: function count() {
      var count = 0;
      var key;

      for (key in this._notifications) {
        if (this._notifications.hasOwnProperty(key)) count++;
      }

      return count;
    }
    /**
      * Closes a notification with the given tag
      * @param {String} tag - Tag of the notification to close
      * @return {Boolean} boolean denoting success
      */

  }, {
    key: "close",
    value: function close(tag) {
      var key, notification;

      for (key in this._notifications) {
        if (this._notifications.hasOwnProperty(key)) {
          notification = this._notifications[key];
          /* Run only if the tags match */

          if (notification.tag === tag) {
            /* Call the notification's close() method */
            return this._closeNotification(key);
          }
        }
      }
    }
    /**
      * Clears all notifications
      * @return {Boolean} boolean denoting whether the clear was successful in closing all notifications
      */

  }, {
    key: "clear",
    value: function clear() {
      var key,
          success = true;

      for (key in this._notifications) {
        if (this._notifications.hasOwnProperty(key)) success = success && this._closeNotification(key);
      }

      return success;
    }
    /**
      * Denotes whether Notify is supported in the current browser
      * @returns {boolean}
      */

  }, {
    key: "supported",
    value: function supported() {
      var supported = false;

      for (var agent in this._agents) {
        if (this._agents.hasOwnProperty(agent)) supported = supported || this._agents[agent].isSupported();
      }

      return supported;
    }
    /**
      * Modifies settings or returns all settings if no parameter passed
      * @param settings
      */

  }, {
    key: "config",
    value: function config(settings) {
      if (typeof settings !== 'undefined' || settings !== null && Util.isObject(settings)) Util.objectMerge(this._configuration, settings);
      return this._configuration;
    }
    /**
      * Copies the functions from a plugin to the main library
      * @param plugin
      */

  }, {
    key: "extend",
    value: function extend(manifest) {
      var plugin,
          Plugin,
          hasProp = {}.hasOwnProperty;

      if (!hasProp.call(manifest, 'plugin')) {
        throw new Error(Messages.errors.invalid_plugin);
      } else {
        if (hasProp.call(manifest, 'config') && Util.isObject(manifest.config) && manifest.config !== null) {
          this.config(manifest.config);
        }

        Plugin = manifest.plugin; //@ts-ignore

        plugin = new Plugin(this.config());

        for (var member in plugin) {
          if (hasProp.call(plugin, member) && Util.isFunction(plugin[member])) //@ts-ignore
            this[member] = plugin[member];
        }
      }
    }
  }]);

  return Notify;
}();


// CONCATENATED MODULE: ./src/notify/index.ts
/* unused concated harmony import Messages */
/* unused concated harmony import Permission */
/* unused concated harmony import Util */
/* concated harmony reexport Notify */__webpack_require__.d(__webpack_exports__, "a", function() { return Notify_Notify; });






/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PodNotify; });
/* harmony import */ var _notify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _utility_GenerateUUID__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var podasync__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var podasync__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(podasync__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var device_uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var device_uuid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(device_uuid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ua_parser_js__WEBPACK_IMPORTED_MODULE_5__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // @ts-ignore


 // @ts-ignore



var PodEventTypes = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  RECONNECT: "reconnect",
  MESSAGE: "message",
  ASYNC_READY: "asyncReady",
  STATE_CHANGE: "stateChange",
  ERROR: "error"
};

var PodNotify = function PodNotify(config) {
  var _this = this;

  _classCallCheck(this, PodNotify);

  _defineProperty(this, "Notify", void 0);

  _defineProperty(this, "Config", void 0);

  _defineProperty(this, "ClientUniques", void 0);

  _defineProperty(this, "ServiceWorkerSubscription", void 0);

  _defineProperty(this, "_eventCallbacks", {
    connect: {},
    disconnect: {},
    reconnect: {},
    message: {},
    asyncReady: {},
    stateChange: {},
    error: {}
  });

  _defineProperty(this, "_async", void 0);

  _defineProperty(this, "_appId", void 0);

  _defineProperty(this, "_deviceFingerPrint", void 0);

  _defineProperty(this, "_peerId", void 0);

  _defineProperty(this, "_connected", false);

  _defineProperty(this, "_uniqueInfo", void 0);

  _defineProperty(this, "_uniqueInfoString", void 0);

  _defineProperty(this, "_notificationStack", []);

  _defineProperty(this, "_asyncInitialize", function () {
    _this._async = new podasync__WEBPACK_IMPORTED_MODULE_2___default.a(_objectSpread({}, _this.Config, {
      appId: _this._appId,
      deviceId: _this._deviceFingerPrint
    }));

    _this._async.on(PodEventTypes.CONNECT, function (peerId) {
      _this._peerId = peerId;
      _this._connected = true;

      _this._fireEvent(PodEventTypes.CONNECT, _this._peerId);
    });

    _this._async.on(PodEventTypes.DISCONNECT, function (param, ack) {
      _this._peerId = undefined;
      _this._connected = false;

      _this._fireEvent(PodEventTypes.DISCONNECT, param, ack);
    });

    _this._async.on(PodEventTypes.ERROR, function (param, ack) {
      _this._fireEvent(PodEventTypes.ERROR, param, ack);
    });

    _this._async.on(PodEventTypes.ASYNC_READY, function (param, ack) {
      _this._peerId = _this._peerId || _this._async.getPeerId();

      _this._async.send({
        type: 4,
        content: {
          peerName: _this.Config.serverName,
          content: JSON.stringify({
            serviceName: "SetStatusPush",
            messageType: 547,
            content: JSON.stringify({
              type: 10,
              messageId: null,
              senderId: null,
              receiverId: _this._peerId,
              appId: _this._appId,
              deviceId: _this.ClientUniques.deviceId,
              token: _this.Config.token,
              sdkType: 'WEB',
              info: _this._uniqueInfoString
            })
          })
        }
      });

      _this._fireEvent(PodEventTypes.ASYNC_READY, param, ack);
    });

    _this._async.on(PodEventTypes.MESSAGE, function (param, ack) {
      try {
        var content = JSON.parse(param.content);

        if (content.messageType === 545) {
          var contentChild = JSON.parse(content.content);

          if (contentChild.messageId && contentChild.senderId) {
            if (_this.Config.handlePushNotification) {
              _this._sendNotif({
                text: contentChild.text,
                title: contentChild.title,
                onClose: function onClose() {
                  _this._async.send({
                    type: 4,
                    content: {
                      peerName: "mnot",
                      content: JSON.stringify({
                        serviceName: "SetStatusPush",
                        messageType: 547,
                        content: JSON.stringify({
                          type: 13,
                          messageId: contentChild.messageId,
                          senderId: contentChild.senderId,
                          receiverId: _this._peerId,
                          appId: _this._appId,
                          deviceId: _this.ClientUniques.deviceId,
                          token: _this.Config.token,
                          sdkType: 'WEB',
                          info: _this._uniqueInfoString
                        })
                      })
                    }
                  });
                },

                /*
                onError: () => {
                this._async.send({
                type: 4,
                content: {
                	peerName: "mnot",
                	content: JSON.stringify({
                		serviceName: "SetStatusPush",
                		messageType: 547,
                		content: JSON.stringify({
                			type: 13,
                			messageId: contentChild.messageId,
                			senderId: contentChild.senderId,
                			receiverId: this._peerId,
                			appId: this._appId,
                			deviceId: this.ClientUniques.deviceId,
                			token: this.Config.token,
                			sdkType: 'WEB',
                			info: this._uniqueInfoString
                		})
                	})
                }
                });
                },*/
                onShow: function onShow() {
                  _this._async.send({
                    type: 4,
                    content: {
                      peerName: "mnot",
                      content: JSON.stringify({
                        serviceName: "SetStatusPush",
                        messageType: 547,
                        content: JSON.stringify({
                          type: 11,
                          messageId: contentChild.messageId,
                          senderId: contentChild.senderId,
                          receiverId: _this._peerId,
                          appId: _this._appId,
                          deviceId: _this.ClientUniques.deviceId,
                          token: _this.Config.token,
                          sdkType: 'WEB',
                          info: _this._uniqueInfoString
                        })
                      })
                    }
                  });
                },
                onClick: function onClick() {
                  _this._async.send({
                    type: 4,
                    content: {
                      peerName: "mnot",
                      content: JSON.stringify({
                        serviceName: "SetStatusPush",
                        messageType: 547,
                        content: JSON.stringify({
                          type: 12,
                          messageId: contentChild.messageId,
                          senderId: contentChild.senderId,
                          receiverId: _this._peerId,
                          appId: _this._appId,
                          deviceId: _this.ClientUniques.deviceId,
                          token: _this.Config.token,
                          sdkType: 'WEB',
                          info: _this._uniqueInfoString
                        })
                      })
                    }
                  });
                }
              });
            }
          }
        }
      } catch (_) {}

      _this._fireEvent(PodEventTypes.MESSAGE, param, ack);
    });

    _this._async.on(PodEventTypes.STATE_CHANGE, function (param, ack) {
      _this._fireEvent(PodEventTypes.STATE_CHANGE, param, ack);
    });
  });

  _defineProperty(this, "_getLatLng", function () {
    axios__WEBPACK_IMPORTED_MODULE_3___default.a.get('https://geoip-db.com/json/').then(function (res) {
      _this._uniqueInfo.lat = res.data.latitude || null;
      _this._uniqueInfo.lng = res.data.longitude || null;
      _this._uniqueInfoString = JSON.stringify(_this._uniqueInfo);
    }).catch(function () {
      _this._getLatLng;
    });
  });

  _defineProperty(this, "_fireEvent", function (eventName, param, ack) {
    try {
      if (ack) {
        for (var id in _this._eventCallbacks[eventName]) {
          _this._eventCallbacks[eventName][id](param, ack);
        }
      } else {
        for (var _id in _this._eventCallbacks[eventName]) {
          _this._eventCallbacks[eventName][_id](param);
        }
      }
    } catch (e) {
      _this._fireEvent(PodEventTypes.ERROR, {
        errorCode: 999,
        errorMessage: "Unknown ERROR!",
        errorEvent: e
      });
    }
  });

  _defineProperty(this, "_sendNotif", function (notif) {
    if (notif) {
      _this._notificationStack.push(notif);
    }

    if (_this.Notify.Permission.has()) {
      _this._notificationStack.forEach(function (item) {
        _this.Notify.create(item.title || '', {
          body: item.text || '',
          title: item.title || '',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now()
          },
          requireInteraction: true,
          onClick: item.onClick,
          onClose: item.onClose,
          onError: item.onError,
          onShow: item.onShow
        });
      });

      _this._notificationStack = [];
    } else {
      _this.Notify.Permission.request(function () {
        _this._sendNotif();
      }, function () {});
    }
  });

  _defineProperty(this, "on", function (eventName, callback) {
    if (_this._eventCallbacks[eventName]) {
      var id = Object(_utility_GenerateUUID__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])();
      _this._eventCallbacks[eventName][id] = callback;
      return id;
    }

    if (eventName === PodEventTypes.CONNECT && _this._connected) {
      callback(_this._peerId);
    }
  });

  this._getLatLng(); // @ts-ignore


  this.Notify = new _notify__WEBPACK_IMPORTED_MODULE_0__[/* Notify */ "a"](typeof window !== 'undefined' ? window : global);
  this.Config = config || {
    socketAddress: 'ws://172.16.110.235:8003/ws',
    token: '2233',
    serverName: 'mnot'
  };
  this._appId = this.Config.appId || localStorage.getItem('appId') || new Date().getTime().toString();
  localStorage.setItem('appId', this._appId);
  var deviceUUID = new device_uuid__WEBPACK_IMPORTED_MODULE_4__["DeviceUUID"]();
  var uuid = deviceUUID.get();
  var parsedDevice = deviceUUID.parse();
  var parser = new ua_parser_js__WEBPACK_IMPORTED_MODULE_5___default.a();
  var browser = parser.getBrowser();
  var device = parser.getDevice();
  var os = parser.getOS();
  this._deviceFingerPrint = localStorage.getItem('deviceId') || uuid;
  localStorage.setItem('deviceId', this._deviceFingerPrint);
  this.ClientUniques = {
    browser: browser.name || '',
    browserMajorVersion: browser.major || '',
    browserVersion: browser.version || '',
    currentResolution: (parsedDevice.resolution || []).join('x'),
    deviceId: this._deviceFingerPrint,
    deviceName: device.model || '',
    deviceType: device.type || '',
    deviceVendor: device.vendor || '',
    os: os.name || '',
    osVersion: os.version || ''
  };
  this._uniqueInfo = {
    lat: null,
    lng: null,
    OS: this.ClientUniques.os || '',
    Brand: this.ClientUniques.deviceVendor || '',
    Version: this.ClientUniques.osVersion || '',
    model: this.ClientUniques.deviceName || ''
  };
  this._uniqueInfoString = JSON.stringify(this._uniqueInfo);

  if (this.Config.serviceWorker) {
    this.Notify.config({
      serviceWorker: this.Config.serviceWorker,
      fallback: function fallback() {} // TODO: Change this fallback to support push on low end browsers

    });
  }

  this._asyncInitialize();
};


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  /*
   * Socket Module to connect and handle Socket functionalities
   * @module Socket
   *
   * @param {Object} params
   */

  function Socket(params) {

    var WebSocket = __webpack_require__(16);

    /*******************************************************
     *          P R I V A T E   V A R I A B L E S          *
     *******************************************************/

    var address = params.socketAddress,
      wsConnectionWaitTime = params.wsConnectionWaitTime || 500,
      connectionCheckTimeout = params.connectionCheckTimeout || 10000,
      eventCallback = {},
      socket = {},
      waitForSocketToConnectTimeoutId,
      lastReceivedMessageTime,
      lastReceivedMessageTimeoutId,
      lastSentMessageTime,
      lastSentMessageTimeoutId,
      forceCloseSocket = false,
      forceCloseSocketTimeout,
      JSTimeLatency = 10,
      socketRealTimeStatusInterval;

    /*******************************************************
     *            P R I V A T E   M E T H O D S            *
     *******************************************************/

    var init = function() {
        connect();
      },

      connect = function() {
        try {
          socket.id = new Date().getTime();
          socket.socket = new WebSocket(address, []);

          socketRealTimeStatusInterval && clearInterval(socketRealTimeStatusInterval);
          socketRealTimeStatusInterval = setInterval(function() {
            switch (socket.socket.readyState) {
              case 2:
                onCloseHandler(null);
                break;
            }
          }, 5000);

          socket.socket.onopen = function(event) {
            waitForSocketToConnect(function() {
              eventCallback["open"]();
            });
          }

          socket.socket.onmessage = function(event) {
            /**
             * To avoid manually closing socket's connection
             */
            forceCloseSocket = false;

            var messageData = JSON.parse(event.data);
            eventCallback["message"](messageData);

            lastReceivedMessageTimeoutId && clearTimeout(lastReceivedMessageTimeoutId);
            forceCloseSocketTimeout && clearTimeout(forceCloseSocketTimeout);

            lastReceivedMessageTime = new Date();

            lastReceivedMessageTimeoutId = setTimeout(function() {
              var currentDate = new Date();
              if (currentDate - lastReceivedMessageTime >= connectionCheckTimeout - JSTimeLatency) {
                /**
                 * If message's type is not 5, socket won't get any acknowledge packet,therefore
                 * you may think that connection has been closed and you would force socket
                 * to close, but before that you should make sure that connection is actually closed!
                 * for that, you must send a ping message and if that message don't get any
                 * responses too, you are allowed to manually kill socket connection.
                 */
                ping();

                /**
                 * We set forceCloseSocket as true so that if your ping's response don't make it
                 * you close your socket
                 */
                forceCloseSocket = true;

                /**
                 * If type of messages are not 5, you won't get ant ACK packets
                 * for that being said, we send a ping message to be sure of
                 * socket connection's state. The ping message should have an
                 * ACK, if not, you're allowed to close your socket after
                 * 4 * [connectionCheckTimeout] seconds
                 */
                forceCloseSocketTimeout = setTimeout(function() {
                  if (forceCloseSocket) {
                    socket.socket.close();
                  }
                }, 4 * connectionCheckTimeout);
              }
            }, connectionCheckTimeout);
          }

          socket.socket.onclose = function(event) {
            onCloseHandler(event);
          }

          socket.socket.onerror = function(event) {
            eventCallback["error"](event);
          }
        } catch (error) {
          eventCallback["customError"]({
            errorCode: 4000,
            errorMessage: "ERROR in WEBSOCKET!",
            errorEvent: error
          });
        }
      },

      onCloseHandler = function(event) {
        lastReceivedMessageTimeoutId && clearTimeout(lastReceivedMessageTimeoutId);
        lastSentMessageTimeoutId && clearTimeout(lastSentMessageTimeoutId);
        eventCallback["close"](event);
      },

      ping = function() {
        sendData({
          type: 0
        });
      },

      waitForSocketToConnect = function(callback) {
        waitForSocketToConnectTimeoutId && clearTimeout(waitForSocketToConnectTimeoutId);

        if (socket.socket.readyState === 1) {
          callback();
        } else {
          waitForSocketToConnectTimeoutId = setTimeout(function() {
            if (socket.socket.readyState === 1) {
              callback();
            } else {
              waitForSocketToConnect(callback);
            }
          }, wsConnectionWaitTime);
        }
      },

      sendData = function(params) {
        var data = {
          type: params.type
        };

        if (params.trackerId) {
          data.trackerId = params.trackerId;
        }

        lastSentMessageTimeoutId && clearTimeout(lastSentMessageTimeoutId);

        lastSentMessageTime = new Date();

        lastSentMessageTimeoutId = setTimeout(function() {
          var currentDate = new Date();
          if (currentDate - lastSentMessageTime >= connectionCheckTimeout - JSTimeLatency) {
            ping();
          }
        }, connectionCheckTimeout);

        try {
          if (params.content) {
            data.content = JSON.stringify(params.content);
          }

          if (socket.socket.readyState === 1) {
            socket.socket.send(JSON.stringify(data));
          }
        } catch (error) {
          eventCallback["customError"]({
            errorCode: 4004,
            errorMessage: "Error in Socket sendData!",
            errorEvent: error
          });
        }
      };

    /*******************************************************
     *             P U B L I C   M E T H O D S             *
     *******************************************************/

    this.on = function(messageName, callback) {
      eventCallback[messageName] = callback;
    }

    this.emit = sendData;

    this.connect = function() {
      connect();
    }

    this.close = function() {
      lastReceivedMessageTimeoutId && clearTimeout(lastReceivedMessageTimeoutId);
      lastSentMessageTimeoutId && clearTimeout(lastSentMessageTimeoutId);
      socket.socket.close();
    }

    init();
  }

  if ( true && typeof module.exports != "undefined") {
    module.exports = Socket;
  } else {
    if (!window.POD) {
      window.POD = {};
    }
    window.POD.Socket = Socket;
  }

})();


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// https://github.com/maxogden/websocket-stream/blob/48dc3ddf943e5ada668c31ccd94e9186f02fafbd/ws-fallback.js

var ws = null

if (typeof WebSocket !== 'undefined') {
  ws = WebSocket
} else if (typeof MozWebSocket !== 'undefined') {
  ws = MozWebSocket
} else if (typeof global !== 'undefined') {
  ws = global.WebSocket || global.MozWebSocket
} else if (typeof window !== 'undefined') {
  ws = window.WebSocket || window.MozWebSocket
} else if (typeof self !== 'undefined') {
  ws = self.WebSocket || self.MozWebSocket
}

module.exports = ws

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function() {
  /**
   * General Utilities
   */
  function Utility() {
    /**
     * Checks if Client is using NodeJS or not
     * @return {boolean}
     */
    this.isNode = function() {
      // return (typeof module !== 'undefined' && typeof module.exports != "undefined");
      return (typeof global !== "undefined" && ({}).toString.call(global) === '[object global]');
    }

    /**
     * Generates Random String
     * @param   {int}     sectionCount
     * @return  {string}
     */
    this.generateUUID = function(sectionCount) {
      var d = new Date().getTime();
      var textData = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

      if (sectionCount == 1) {
        textData = 'xxxxxxxx';
      }

      if (sectionCount == 2) {
        textData = 'xxxxxxxx-xxxx';
      }

      if (sectionCount == 3) {
        textData = 'xxxxxxxx-xxxx-4xxx';
      }

      if (sectionCount == 4) {
        textData = 'xxxxxxxx-xxxx-4xxx-yxxx';
      }

      var uuid = textData.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);

        return (
          c == 'x' ?
          r :
          (r & 0x7 | 0x8)).toString(16);
      });
      return uuid;
    };

    /**
     * Prints Socket Status on Both Browser and Linux Terminal
     * @param {object} params Socket status + current msg + send queue
     * @return
     */
    this.asyncLogger = function(params) {
      var type = params.type,
        msg = params.msg,
        peerId = params.peerId,
        deviceId = params.deviceId,
        isSocketOpen = params.isSocketOpen,
        isDeviceRegister = params.isDeviceRegister,
        isServerRegister = params.isServerRegister,
        socketState = params.socketState,
        pushSendDataQueue = params.pushSendDataQueue,
        workerId = params.workerId,
        BgColor;

      switch (type) {
        case "Send":
          BgColor = 44;
          FgColor = 34;
          ColorCSS = "#4c8aff";
          break;

        case "Receive":
          BgColor = 45;
          FgColor = 35;
          ColorCSS = "#aa386d";
          break;

        case "Error":
          BgColor = 41;
          FgColor = 31;
          ColorCSS = "#ff0043";
          break;

        default:
          BgColor = 45;
          ColorCSS = "#212121";
          break;
      }

      if (typeof global !== "undefined" && ({}).toString.call(global) === '[object global]') {
        console.log("\n");
        console.log("\x1b[" + BgColor + "m\x1b[8m%s\x1b[0m", "################################################################");
        console.log("\x1b[" + BgColor + "m\x1b[8m##################\x1b[0m\x1b[37m\x1b[" + BgColor + "m S O C K E T    S T A T U S \x1b[0m\x1b[" + BgColor + "m\x1b[8m##################\x1b[0m");
        console.log("\x1b[" + BgColor + "m\x1b[8m%s\x1b[0m", "################################################################");
        console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \t\t\t\t\t\t\t      \x1b[" + BgColor + "m\x1b[8m##\x1b[0m");
        console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \x1b[2m%s\x1b[0m \x1b[1m%s\x1b[0m", " PEER ID\t\t", peerId);
        if (workerId > 0) {
          console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \x1b[2m%s\x1b[0m \x1b[1m%s\x1b[0m", " WORKER ID\t\t", workerId);
        }
        console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \x1b[2m%s\x1b[0m \x1b[1m%s\x1b[0m", " DEVICE ID\t\t", deviceId);
        console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \x1b[2m%s\x1b[0m \x1b[1m%s\x1b[0m", " IS SOCKET OPEN\t", isSocketOpen);
        console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \x1b[2m%s\x1b[0m \x1b[1m%s\x1b[0m", " DEVICE REGISTER\t", isDeviceRegister);
        console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \x1b[2m%s\x1b[0m \x1b[1m%s\x1b[0m", " SERVER REGISTER\t", isServerRegister);
        console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \x1b[2m%s\x1b[0m \x1b[1m%s\x1b[0m", " SOCKET STATE\t", socketState);
        console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \x1b[2m%s\x1b[0m \x1b[" + FgColor + "m%s\x1b[0m ", " CURRENT MESSAGE\t", type);
        console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m");

        Object.keys(msg).forEach(function(key) {
          if (typeof msg[key] === 'object') {
            console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \t \x1b[1m-\x1b[0m \x1b[35m%s\x1b[0m", key);
            Object.keys(msg[key]).forEach(function(k) {
              console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \t   \x1b[1m•\x1b[0m \x1b[35m%s\x1b[0m : \x1b[33m%s\x1b[0m", k, msg[key][k]);
            });
          } else {
            console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \t \x1b[1m•\x1b[0m \x1b[35m%s\x1b[0m : \x1b[33m%s\x1b[0m", key, msg[key]);
          }
        });

        console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m");

        if (pushSendDataQueue.length > 0) {
          console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \x1b[2m%s\x1b[0m", " SEND QUEUE");
          console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m");
          Object.keys(pushSendDataQueue).forEach(function(key) {
            if (typeof pushSendDataQueue[key] === 'object') {
              console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \t \x1b[1m-\x1b[0m \x1b[35m%s\x1b[0m", key);
              Object.keys(pushSendDataQueue[key]).forEach(function(k) {
                console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \t   \x1b[1m•\x1b[0m \x1b[35m%s\x1b[0m : \x1b[36m%s\x1b[0m", k, JSON.stringify(pushSendDataQueue[key][k]));
              });
            } else {
              console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \t \x1b[1m•\x1b[0m \x1b[35m%s\x1b[0m : \x1b[33m%s\x1b[0m", key, pushSendDataQueue[key]);
            }
          });

        } else {
          console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \x1b[2m%s\x1b[0m \x1b[1m%s\x1b[0m ", " SEND QUEUE\t\t", "Empty");
        }

        console.log("\x1b[" + BgColor + "m\x1b[8m##\x1b[0m \t\t\t\t\t\t\t      \x1b[" + BgColor + "m\x1b[8m##\x1b[0m");
        console.log("\x1b[" + BgColor + "m\x1b[8m%s\x1b[0m", "################################################################");
        console.log("\n");
      } else {
        console.log("\n");
        console.log("%cS O C K E T    S T A T U S", 'background: ' + ColorCSS + '; padding: 10px 142px; font-weight: bold; font-size: 18px; color: #fff;');
        console.log("\n");
        console.log("%c   PEER ID\t\t %c" + peerId, 'color: #444', 'color: #ffac28; font-weight: bold');
        console.log("%c   DEVICE ID\t\t %c" + deviceId, 'color: #444', 'color: #ffac28; font-weight: bold');
        console.log("%c   IS SOCKET OPEN\t %c" + isSocketOpen, 'color: #444', 'color: #ffac28; font-weight: bold');
        console.log("%c   DEVICE REGISTER\t %c" + isDeviceRegister, 'color: #444', 'color: #ffac28; font-weight: bold');
        console.log("%c   SERVER REGISTER\t %c" + isServerRegister, 'color: #444', 'color: #ffac28; font-weight: bold');
        console.log("%c   SOCKET STATE\t\t %c" + socketState, 'color: #444', 'color: #ffac28; font-weight: bold');
        console.log("%c   CURRENT MESSAGE\t %c" + type, 'color: #444', 'color: #aa386d; font-weight: bold');
        console.log("\n");

        Object.keys(msg).forEach(function(key) {
          if (typeof msg[key] === 'object') {
            console.log("%c \t-" + key, 'color: #777');
            Object.keys(msg[key]).forEach(function(k) {
              console.log("%c \t  •" + k + " : %c" + msg[key][k], 'color: #777', 'color: #f23; font-weight: bold');
            });
          } else {
            console.log("%c \t•" + key + " : %c" + msg[key], 'color: #777', 'color: #f23; font-weight: bold');
          }
        });

        console.log("\n");

        if (pushSendDataQueue.length > 0) {
          console.log("%c   SEND QUEUE", 'color: #444');
          console.log("\n");
          Object.keys(pushSendDataQueue).forEach(function(key) {
            if (typeof pushSendDataQueue[key] === 'object') {
              console.log("%c \t-" + key, 'color: #777');
              Object.keys(pushSendDataQueue[key]).forEach(function(k) {
                console.log("%c \t  •" + k + " : %c" + JSON.stringify(pushSendDataQueue[key][k]), 'color: #777', 'color: #999; font-weight: bold');
              });
            } else {
              console.log("%c \t•" + key + " : %c" + pushSendDataQueue[key], 'color: #777', 'color: #999; font-weight: bold');
            }
          });

        } else {
          console.log("%c   SEND QUEUE\t\t %cEmpty", 'color: #444', 'color: #000; font-weight: bold');
        }

        console.log("\n");
        console.log("%c ", 'font-weight: bold; font-size: 3px; border-left: solid 540px ' + ColorCSS + ';');
        console.log("\n");
      }
    }

    /**
     * Prints Custom Message in console
     * @param {string} message Message to be logged in terminal
     * @return
     */
    this.asyncStepLogger = function(message) {
      if (typeof navigator == "undefined") {
        console.log("\x1b[90m    ☰ \x1b[0m\x1b[90m%s\x1b[0m", message);
      } else {
        console.log("%c   " + message, 'border-left: solid #666 10px; color: #666;');
      }
    }
  }

  if ( true && typeof module.exports != "undefined") {
    module.exports = Utility;
  } else {
    if (!window.POD) {
      window.POD = {};
    }
    window.POD.Utility = Utility;
  }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(3);
var Axios = __webpack_require__(20);
var defaults = __webpack_require__(2);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(7);
axios.CancelToken = __webpack_require__(35);
axios.isCancel = __webpack_require__(6);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(36);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(2);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(30);
var dispatchRequest = __webpack_require__(31);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(5);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(32);
var isCancel = __webpack_require__(6);
var defaults = __webpack_require__(2);
var isAbsoluteURL = __webpack_require__(33);
var combineURLs = __webpack_require__(34);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(7);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/*!
 * device-uuid.js v1.0.4 (https://github.com/biggora/device-uuid/)
 * Copyright 2016-2017 Alexey Gordeyev
 * Licensed under MIT (https://github.com/biggora/device-uuid/blob/master/LICENSE)
 */
/*global
 screen, window, navigator
 */
(function (exports) {
    'use strict';

    var BOTS = [
        '\\+https:\\/\\/developers.google.com\\/\\+\\/web\\/snippet\\/',
        'googlebot',
        'baiduspider',
        'gurujibot',
        'yandexbot',
        'slurp',
        'msnbot',
        'bingbot',
        'facebookexternalhit',
        'linkedinbot',
        'twitterbot',
        'slackbot',
        'telegrambot',
        'applebot',
        'pingdom',
        'tumblr ',
        'Embedly',
        'spbot'
    ];
    var IS_BOT_REGEXP = new RegExp('^.*(' + BOTS.join('|') + ').*$');

    var DeviceUUID = function (options) {
        options = options ? options : {};
        var defOptions = {
            version: false,
            language: false,
            platform: true,
            os: true,
            pixelDepth: true,
            colorDepth: true,
            resolution: false,
            isAuthoritative: true,
            silkAccelerated: true,
            isKindleFire: true,
            isDesktop: true,
            isMobile: true,
            isTablet: true,
            isWindows: true,
            isLinux: true,
            isLinux64: true,
            isChromeOS: true,
            isMac: true,
            isiPad: true,
            isiPhone: true,
            isiPod: true,
            isAndroid: true,
            isSamsung: true,
            isSmartTV: true,
            isRaspberry: true,
            isBlackberry: true,
            isTouchScreen: true,
            isOpera: false,
            isIE: false,
            isEdge: false,
            isIECompatibilityMode: false,
            isSafari: false,
            isFirefox: false,
            isWebkit: false,
            isChrome: false,
            isKonqueror: false,
            isOmniWeb: false,
            isSeaMonkey: false,
            isFlock: false,
            isAmaya: false,
            isPhantomJS: false,
            isEpiphany: false,
            source: false,
            cpuCores: false
        };
        for (var key in options) {
            if (options.hasOwnProperty(key) && typeof defOptions[key] !== 'undefined') {
                defOptions[key] = options[key];
            }
        }
        this.options = defOptions;
        this.version = '1.0.0';
        this._Versions = {
            Edge: /Edge\/([\d\w\.\-]+)/i,
            Firefox: /firefox\/([\d\w\.\-]+)/i,
            IE: /msie\s([\d\.]+[\d])|trident\/\d+\.\d+;.*[rv:]+(\d+\.\d)/i,
            Chrome: /chrome\/([\d\w\.\-]+)/i,
            Chromium: /(?:chromium|crios)\/([\d\w\.\-]+)/i,
            Safari: /version\/([\d\w\.\-]+)/i,
            Opera: /version\/([\d\w\.\-]+)|OPR\/([\d\w\.\-]+)/i,
            Ps3: /([\d\w\.\-]+)\)\s*$/i,
            Psp: /([\d\w\.\-]+)\)?\s*$/i,
            Amaya: /amaya\/([\d\w\.\-]+)/i,
            SeaMonkey: /seamonkey\/([\d\w\.\-]+)/i,
            OmniWeb: /omniweb\/v([\d\w\.\-]+)/i,
            Flock: /flock\/([\d\w\.\-]+)/i,
            Epiphany: /epiphany\/([\d\w\.\-]+)/i,
            WinJs: /msapphost\/([\d\w\.\-]+)/i,
            PhantomJS: /phantomjs\/([\d\w\.\-]+)/i,
            UC: /UCBrowser\/([\d\w\.]+)/i
        };
        this._Browsers = {
            Edge: /edge/i,
            Amaya: /amaya/i,
            Konqueror: /konqueror/i,
            Epiphany: /epiphany/i,
            SeaMonkey: /seamonkey/i,
            Flock: /flock/i,
            OmniWeb: /omniweb/i,
            Chromium: /chromium|crios/i,
            Chrome: /chrome/i,
            Safari: /safari/i,
            IE: /msie|trident/i,
            Opera: /opera|OPR/i,
            PS3: /playstation 3/i,
            PSP: /playstation portable/i,
            Firefox: /firefox/i,
            WinJs: /msapphost/i,
            PhantomJS: /phantomjs/i,
            UC: /UCBrowser/i
        };
        this._OS = {
            Windows10: /windows nt 10\.0/i,
            Windows81: /windows nt 6\.3/i,
            Windows8: /windows nt 6\.2/i,
            Windows7: /windows nt 6\.1/i,
            UnknownWindows: /windows nt 6\.\d+/i,
            WindowsVista: /windows nt 6\.0/i,
            Windows2003: /windows nt 5\.2/i,
            WindowsXP: /windows nt 5\.1/i,
            Windows2000: /windows nt 5\.0/i,
            WindowsPhone8: /windows phone 8\./,
            OSXCheetah: /os x 10[._]0/i,
            OSXPuma: /os x 10[._]1(\D|$)/i,
            OSXJaguar: /os x 10[._]2/i,
            OSXPanther: /os x 10[._]3/i,
            OSXTiger: /os x 10[._]4/i,
            OSXLeopard: /os x 10[._]5/i,
            OSXSnowLeopard: /os x 10[._]6/i,
            OSXLion: /os x 10[._]7/i,
            OSXMountainLion: /os x 10[._]8/i,
            OSXMavericks: /os x 10[._]9/i,
            OSXYosemite: /os x 10[._]10/i,
            OSXElCapitan: /os x 10[._]11/i,
            OSXSierra: /os x 10[._]12/i,
            Mac: /os x/i,
            Linux: /linux/i,
            Linux64: /linux x86_64/i,
            ChromeOS: /cros/i,
            Wii: /wii/i,
            PS3: /playstation 3/i,
            PSP: /playstation portable/i,
            iPad: /\(iPad.*os (\d+)[._](\d+)/i,
            iPhone: /\(iPhone.*os (\d+)[._](\d+)/i,
            Bada: /Bada\/(\d+)\.(\d+)/i,
            Curl: /curl\/(\d+)\.(\d+)\.(\d+)/i
        };
        this._Platform = {
            Windows: /windows nt/i,
            WindowsPhone: /windows phone/i,
            Mac: /macintosh/i,
            Linux: /linux/i,
            Wii: /wii/i,
            Playstation: /playstation/i,
            iPad: /ipad/i,
            iPod: /ipod/i,
            iPhone: /iphone/i,
            Android: /android/i,
            Blackberry: /blackberry/i,
            Samsung: /samsung/i,
            Curl: /curl/i
        };

        this.DefaultAgent = {
            isAuthoritative: true,
            isMobile: false,
            isTablet: false,
            isiPad: false,
            isiPod: false,
            isiPhone: false,
            isAndroid: false,
            isBlackberry: false,
            isOpera: false,
            isIE: false,
            isEdge: false,
            isIECompatibilityMode: false,
            isSafari: false,
            isFirefox: false,
            isWebkit: false,
            isChrome: false,
            isKonqueror: false,
            isOmniWeb: false,
            isSeaMonkey: false,
            isFlock: false,
            isAmaya: false,
            isPhantomJS: false,
            isEpiphany: false,
            isDesktop: false,
            isWindows: false,
            isLinux: false,
            isLinux64: false,
            isMac: false,
            isChromeOS: false,
            isBada: false,
            isSamsung: false,
            isRaspberry: false,
            isBot: false,
            isCurl: false,
            isAndroidTablet: false,
            isWinJs: false,
            isKindleFire: false,
            isSilk: false,
            isCaptive: false,
            isSmartTV: false,
            isUC: false,
            isTouchScreen: false,
            silkAccelerated: false,
            colorDepth: -1,
            pixelDepth: -1,
            resolution: [],
            cpuCores: -1,
            language: 'unknown',
            browser: 'unknown',
            version: 'unknown',
            os: 'unknown',
            platform: 'unknown',
            geoIp: {},
            source: '',
            hashInt: function (string) {
                var hash = 0, i, chr, len;
                if (string.length === 0) { return hash; }
                for (i = 0, len = string.length; i < len; i++) {
                    chr = string.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0;
                }
                return hash;
            },
            hashMD5: function (string) {
                function rotateLeft(lValue, iShiftBits) {
                    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
                }

                function addUnsigned(lX, lY) {
                    var lX4, lY4, lX8, lY8, lResult;
                    lX8 = (lX & 0x80000000);
                    lY8 = (lY & 0x80000000);
                    lX4 = (lX & 0x40000000);
                    lY4 = (lY & 0x40000000);
                    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);

                    if (lX4 & lY4) {
                        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                    }
                    if (lX4 | lY4) {
                        if (lResult & 0x40000000) {
                            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                        } else {
                            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                        }
                    } else {
                        return (lResult ^ lX8 ^ lY8);
                    }
                }

                function gF(x, y, z) {
                    return (x & y) | ((~x) & z);
                }

                function gG(x, y, z) {
                    return (x & z) | (y & (~z));
                }

                function gH(x, y, z) {
                    return (x ^ y ^ z);
                }

                function gI(x, y, z) {
                    return (y ^ (x | (~z)));
                }

                function gFF(a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(gF(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                }

                function gGG(a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(gG(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                }

                function gHH(a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(gH(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                }

                function gII(a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(gI(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                }

                function convertToWordArray(string) {
                    var lWordCount;
                    var lMessageLength = string.length;
                    var lNumberOfWordsTemp1 = lMessageLength + 8;
                    var lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64;
                    var lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16;
                    var lWordArray = new Array(lNumberOfWords - 1);
                    var lBytePosition = 0;
                    var lByteCount = 0;

                    while (lByteCount < lMessageLength) {
                        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                        lBytePosition = (lByteCount % 4) * 8;
                        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                        lByteCount++;
                    }

                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                    return lWordArray;
                }

                function wordToHex(lValue) {
                    var wordToHexValue = '', wordToHexValueTemp = '', lByte, lCount;
                    for (lCount = 0; lCount <= 3; lCount++) {
                        lByte = (lValue >>> (lCount * 8)) & 255;
                        wordToHexValueTemp = '0' + lByte.toString(16);
                        wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
                    }
                    return wordToHexValue;
                }

                function utf8Encode(string) {
                    string = string.replace(/\r\n/g, '\n');
                    var utftext = '';

                    for (var n = 0; n < string.length; n++) {
                        var c = string.charCodeAt(n);
                        if (c < 128) {
                            utftext += String.fromCharCode(c);
                        } else if ((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                        } else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                    }
                    return utftext;
                }

                var x = [];
                var k, AA, BB, CC, DD, a, b, c, d;
                var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
                var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
                var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
                var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
                string = utf8Encode(string);
                x = convertToWordArray(string);
                a = 0x67452301;
                b = 0xEFCDAB89;
                c = 0x98BADCFE;
                d = 0x10325476;

                for (k = 0; k < x.length; k += 16) {
                    AA = a;
                    BB = b;
                    CC = c;
                    DD = d;
                    a = gFF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                    d = gFF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                    c = gFF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                    b = gFF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                    a = gFF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                    d = gFF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                    c = gFF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                    b = gFF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                    a = gFF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                    d = gFF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                    c = gFF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                    b = gFF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                    a = gFF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                    d = gFF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                    c = gFF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                    b = gFF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                    a = gGG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                    d = gGG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                    c = gGG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                    b = gGG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                    a = gGG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                    d = gGG(d, a, b, c, x[k + 10], S22, 0x2441453);
                    c = gGG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                    b = gGG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                    a = gGG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                    d = gGG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                    c = gGG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                    b = gGG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                    a = gGG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                    d = gGG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                    c = gGG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                    b = gGG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                    a = gHH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                    d = gHH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                    c = gHH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                    b = gHH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                    a = gHH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                    d = gHH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                    c = gHH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                    b = gHH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                    a = gHH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                    d = gHH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                    c = gHH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                    b = gHH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                    a = gHH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                    d = gHH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                    c = gHH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                    b = gHH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                    a = gII(a, b, c, d, x[k + 0], S41, 0xF4292244);
                    d = gII(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                    c = gII(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                    b = gII(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                    a = gII(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                    d = gII(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                    c = gII(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                    b = gII(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                    a = gII(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                    d = gII(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                    c = gII(c, d, a, b, x[k + 6], S43, 0xA3014314);
                    b = gII(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                    a = gII(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                    d = gII(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                    c = gII(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                    b = gII(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                    a = addUnsigned(a, AA);
                    b = addUnsigned(b, BB);
                    c = addUnsigned(c, CC);
                    d = addUnsigned(d, DD);
                }
                var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
                return temp.toLowerCase();
            }
        };

        this.Agent = {};

        this.getBrowser = function (string) {
            switch (true) {
                case this._Browsers.Edge.test(string):
                    this.Agent.isEdge = true;
                    return 'Edge';
                case this._Browsers.PhantomJS.test(string):
                    this.Agent.isPhantomJS = true;
                    return 'PhantomJS';
                case this._Browsers.Konqueror.test(string):
                    this.Agent.isKonqueror = true;
                    return 'Konqueror';
                case this._Browsers.Amaya.test(string):
                    this.Agent.isAmaya = true;
                    return 'Amaya';
                case this._Browsers.Epiphany.test(string):
                    this.Agent.isEpiphany = true;
                    return 'Epiphany';
                case this._Browsers.SeaMonkey.test(string):
                    this.Agent.isSeaMonkey = true;
                    return 'SeaMonkey';
                case this._Browsers.Flock.test(string):
                    this.Agent.isFlock = true;
                    return 'Flock';
                case this._Browsers.OmniWeb.test(string):
                    this.Agent.isOmniWeb = true;
                    return 'OmniWeb';
                case this._Browsers.Opera.test(string):
                    this.Agent.isOpera = true;
                    return 'Opera';
                case this._Browsers.Chromium.test(string):
                    this.Agent.isChrome = true;
                    return 'Chromium';
                case this._Browsers.Chrome.test(string):
                    this.Agent.isChrome = true;
                    return 'Chrome';
                case this._Browsers.Safari.test(string):
                    this.Agent.isSafari = true;
                    return 'Safari';
                case this._Browsers.WinJs.test(string):
                    this.Agent.isWinJs = true;
                    return 'WinJs';
                case this._Browsers.IE.test(string):
                    this.Agent.isIE = true;
                    return 'IE';
                case this._Browsers.PS3.test(string):
                    return 'ps3';
                case this._Browsers.PSP.test(string):
                    return 'psp';
                case this._Browsers.Firefox.test(string):
                    this.Agent.isFirefox = true;
                    return 'Firefox';
                case this._Browsers.UC.test(string):
                    this.Agent.isUC = true;
                    return 'UCBrowser';
                default:
                    // If the UA does not start with Mozilla guess the user agent.
                    if (string.indexOf('Mozilla') !== 0 && /^([\d\w\-\.]+)\/[\d\w\.\-]+/i.test(string)) {
                        this.Agent.isAuthoritative = false;
                        return RegExp.$1;
                    }
                    return 'unknown';
            }
        };

        this.getBrowserVersion = function (string) {
            var regex;
            switch (this.Agent.browser) {
                case 'Edge':
                    if (this._Versions.Edge.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'PhantomJS':
                    if (this._Versions.PhantomJS.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'Chrome':
                    if (this._Versions.Chrome.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'Chromium':
                    if (this._Versions.Chromium.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'Safari':
                    if (this._Versions.Safari.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'Opera':
                    if (this._Versions.Opera.test(string)) {
                        return RegExp.$1 ? RegExp.$1 : RegExp.$2;
                    }
                    break;
                case 'Firefox':
                    if (this._Versions.Firefox.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'WinJs':
                    if (this._Versions.WinJs.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'IE':
                    if (this._Versions.IE.test(string)) {
                        return RegExp.$2 ? RegExp.$2 : RegExp.$1;
                    }
                    break;
                case 'ps3':
                    if (this._Versions.Ps3.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'psp':
                    if (this._Versions.Psp.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'Amaya':
                    if (this._Versions.Amaya.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'Epiphany':
                    if (this._Versions.Epiphany.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'SeaMonkey':
                    if (this._Versions.SeaMonkey.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'Flock':
                    if (this._Versions.Flock.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'OmniWeb':
                    if (this._Versions.OmniWeb.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                case 'UCBrowser':
                    if (this._Versions.UC.test(string)) {
                        return RegExp.$1;
                    }
                    break;
                default:
                    if (this.Agent.browser !== 'unknown') {
                        regex = new RegExp(this.Agent.browser + '[\\/ ]([\\d\\w\\.\\-]+)', 'i');
                        if (regex.test(string)) {
                            return RegExp.$1;
                        }
                    }
            }
        };

        this.getOS = function (string) {
            switch (true) {
                case this._OS.WindowsVista.test(string):
                    this.Agent.isWindows = true;
                    return 'Windows Vista';
                case this._OS.Windows7.test(string):
                    this.Agent.isWindows = true;
                    return 'Windows 7';
                case this._OS.Windows8.test(string):
                    this.Agent.isWindows = true;
                    return 'Windows 8';
                case this._OS.Windows81.test(string):
                    this.Agent.isWindows = true;
                    return 'Windows 8.1';
                case this._OS.Windows10.test(string):
                    this.Agent.isWindows = true;
                    return 'Windows 10.0';
                case this._OS.Windows2003.test(string):
                    this.Agent.isWindows = true;
                    return 'Windows 2003';
                case this._OS.WindowsXP.test(string):
                    this.Agent.isWindows = true;
                    return 'Windows XP';
                case this._OS.Windows2000.test(string):
                    this.Agent.isWindows = true;
                    return 'Windows 2000';
                case this._OS.WindowsPhone8.test(string):
                    return 'Windows Phone 8';
                case this._OS.Linux64.test(string):
                    this.Agent.isLinux = true;
                    this.Agent.isLinux64 = true;
                    return 'Linux 64';
                case this._OS.Linux.test(string):
                    this.Agent.isLinux = true;
                    return 'Linux';
                case this._OS.ChromeOS.test(string):
                    this.Agent.isChromeOS = true;
                    return 'Chrome OS';
                case this._OS.Wii.test(string):
                    return 'Wii';
                case this._OS.PS3.test(string):
                    return 'Playstation';
                case this._OS.PSP.test(string):
                    return 'Playstation';
                case this._OS.OSXCheetah.test(string):
                    this.Agent.isMac = true;
                    return 'OS X Cheetah';
                case this._OS.OSXPuma.test(string):
                    this.Agent.isMac = true;
                    return 'OS X Puma';
                case this._OS.OSXJaguar.test(string):
                    this.Agent.isMac = true;
                    return 'OS X Jaguar';
                case this._OS.OSXPanther.test(string):
                    this.Agent.isMac = true;
                    return 'OS X Panther';
                case this._OS.OSXTiger.test(string):
                    this.Agent.isMac = true;
                    return 'OS X Tiger';
                case this._OS.OSXLeopard.test(string):
                    this.Agent.isMac = true;
                    return 'OS X Leopard';
                case this._OS.OSXSnowLeopard.test(string):
                    this.Agent.isMac = true;
                    return 'OS X Snow Leopard';
                case this._OS.OSXLion.test(string):
                    this.Agent.isMac = true;
                    return 'OS X Lion';
                case this._OS.OSXMountainLion.test(string):
                    this.Agent.isMac = true;
                    return 'OS X Mountain Lion';
                case this._OS.OSXMavericks.test(string):
                    this.Agent.isMac = true;
                    return 'OS X Mavericks';
                case this._OS.OSXYosemite.test(string):
                    this.Agent.isMac = true;
                    return 'OS X Yosemite';
                case this._OS.OSXElCapitan.test(string):
                    this.Agent.isMac = true;
                    return 'OS X El Capitan';
                case this._OS.OSXSierra.test(string):
                    this.Agent.isMac = true;
                    return 'macOS Sierra';
                case this._OS.Mac.test(string):
                    this.Agent.isMac = true;
                    return 'OS X';
                case this._OS.iPad.test(string):
                    this.Agent.isiPad = true;
                    return string.match(this._OS.iPad)[0].replace('_', '.');
                case this._OS.iPhone.test(string):
                    this.Agent.isiPhone = true;
                    return string.match(this._OS.iPhone)[0].replace('_', '.');
                case this._OS.Bada.test(string):
                    this.Agent.isBada = true;
                    return 'Bada';
                case this._OS.Curl.test(string):
                    this.Agent.isCurl = true;
                    return 'Curl';
                default:
                    return 'unknown';
            }
        };

        this.getPlatform = function (string) {
            switch (true) {
                case this._Platform.Windows.test(string):
                    return 'Microsoft Windows';
                case this._Platform.WindowsPhone.test(string):
                    this.Agent.isWindowsPhone = true;
                    return 'Microsoft Windows Phone';
                case this._Platform.Mac.test(string):
                    return 'Apple Mac';
                case this._Platform.Curl.test(string):
                    return 'Curl';
                case this._Platform.Android.test(string):
                    this.Agent.isAndroid = true;
                    return 'Android';
                case this._Platform.Blackberry.test(string):
                    this.Agent.isBlackberry = true;
                    return 'Blackberry';
                case this._Platform.Linux.test(string):
                    return 'Linux';
                case this._Platform.Wii.test(string):
                    return 'Wii';
                case this._Platform.Playstation.test(string):
                    return 'Playstation';
                case this._Platform.iPad.test(string):
                    this.Agent.isiPad = true;
                    return 'iPad';
                case this._Platform.iPod.test(string):
                    this.Agent.isiPod = true;
                    return 'iPod';
                case this._Platform.iPhone.test(string):
                    this.Agent.isiPhone = true;
                    return 'iPhone';
                case this._Platform.Samsung.test(string):
                    this.Agent.isiSamsung = true;
                    return 'Samsung';
                default:
                    return 'unknown';
            }
        };

        this.testCompatibilityMode = function () {
            var ua = this;
            if (this.Agent.isIE) {
                if (/Trident\/(\d)\.0/i.test(ua.Agent.source)) {
                    var tridentVersion = parseInt(RegExp.$1, 10);
                    var version = parseInt(ua.Agent.version, 10);
                    if (version === 7 && tridentVersion === 7) {
                        ua.Agent.isIECompatibilityMode = true;
                        ua.Agent.version = 11.0;
                    }

                    if (version === 7 && tridentVersion === 6) {
                        ua.Agent.isIECompatibilityMode = true;
                        ua.Agent.version = 10.0;
                    }

                    if (version === 7 && tridentVersion === 5) {
                        ua.Agent.isIECompatibilityMode = true;
                        ua.Agent.version = 9.0;
                    }

                    if (version === 7 && tridentVersion === 4) {
                        ua.Agent.isIECompatibilityMode = true;
                        ua.Agent.version = 8.0;
                    }
                }
            }
        };

        this.testSilk = function () {
            var ua = this;
            switch (true) {
                case new RegExp('silk', 'gi').test(ua.Agent.source):
                    this.Agent.isSilk = true;
                    break;
                default:
            }

            if (/Silk-Accelerated=true/gi.test(ua.Agent.source)) {
                this.Agent.SilkAccelerated = true;
            }
            return this.Agent.isSilk ? 'Silk' : false;
        };

        this.testKindleFire = function () {
            var ua = this;
            switch (true) {
                case /KFOT/gi.test(ua.Agent.source):
                    this.Agent.isKindleFire = true;
                    return 'Kindle Fire';
                case /KFTT/gi.test(ua.Agent.source):
                    this.Agent.isKindleFire = true;
                    return 'Kindle Fire HD';
                case /KFJWI/gi.test(ua.Agent.source):
                    this.Agent.isKindleFire = true;
                    return 'Kindle Fire HD 8.9';
                case /KFJWA/gi.test(ua.Agent.source):
                    this.Agent.isKindleFire = true;
                    return 'Kindle Fire HD 8.9 4G';
                case /KFSOWI/gi.test(ua.Agent.source):
                    this.Agent.isKindleFire = true;
                    return 'Kindle Fire HD 7';
                case /KFTHWI/gi.test(ua.Agent.source):
                    this.Agent.isKindleFire = true;
                    return 'Kindle Fire HDX 7';
                case /KFTHWA/gi.test(ua.Agent.source):
                    this.Agent.isKindleFire = true;
                    return 'Kindle Fire HDX 7 4G';
                case /KFAPWI/gi.test(ua.Agent.source):
                    this.Agent.isKindleFire = true;
                    return 'Kindle Fire HDX 8.9';
                case /KFAPWA/gi.test(ua.Agent.source):
                    this.Agent.isKindleFire = true;
                    return 'Kindle Fire HDX 8.9 4G';
                default:
                    return false;
            }
        };

        this.testCaptiveNetwork = function () {
            var ua = this;
            switch (true) {
                case /CaptiveNetwork/gi.test(ua.Agent.source):
                    ua.Agent.isCaptive = true;
                    ua.Agent.isMac = true;
                    ua.Agent.platform = 'Apple Mac';
                    return 'CaptiveNetwork';
                default:
                    return false;
            }
        };

        this.testMobile = function testMobile() {
            var ua = this;
            switch (true) {
                case ua.Agent.isWindows:
                case ua.Agent.isLinux:
                case ua.Agent.isMac:
                case ua.Agent.isChromeOS:
                    ua.Agent.isDesktop = true;
                    break;
                case ua.Agent.isAndroid:
                case ua.Agent.isSamsung:
                    ua.Agent.isMobile = true;
                    ua.Agent.isDesktop = false;
                    break;
                default:
            }
            switch (true) {
                case ua.Agent.isiPad:
                case ua.Agent.isiPod:
                case ua.Agent.isiPhone:
                case ua.Agent.isBada:
                case ua.Agent.isBlackberry:
                case ua.Agent.isAndroid:
                case ua.Agent.isWindowsPhone:
                    ua.Agent.isMobile = true;
                    ua.Agent.isDesktop = false;
                    break;
                default:
            }
            if (/mobile/i.test(ua.Agent.source)) {
                ua.Agent.isMobile = true;
                ua.Agent.isDesktop = false;
            }
        };

        this.testTablet = function testTablet() {
            var ua = this;
            switch (true) {
                case ua.Agent.isiPad:
                case ua.Agent.isAndroidTablet:
                case ua.Agent.isKindleFire:
                    ua.Agent.isTablet = true;
                    break;
            }
            if (/tablet/i.test(ua.Agent.source)) {
                ua.Agent.isTablet = true;
            }
        };

        this.testNginxGeoIP = function testNginxGeoIP(headers) {
            var ua = this;
            Object.keys(headers).forEach(function (key) {
                if (/^GEOIP/i.test(key)) {
                    ua.Agent.geoIp[key] = headers[key];
                }
            });
        };

        this.testBot = function testBot() {
            var ua = this;
            var isBot = IS_BOT_REGEXP.exec(ua.Agent.source.toLowerCase());
            if (isBot) {
                ua.Agent.isBot = isBot[1];
            } else if (!ua.Agent.isAuthoritative) {
                // Test unauthoritative parse for `bot` in UA to flag for bot
                ua.Agent.isBot = /bot/i.test(ua.Agent.source);
            }
        };

        this.testSmartTV = function testBot() {
            var ua = this;
            var isSmartTV = new RegExp('smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv', 'gi').exec(ua.Agent.source.toLowerCase());
            if (isSmartTV) {
                ua.Agent.isSmartTV = isSmartTV[1];
            }
        };

        this.testAndroidTablet = function testAndroidTablet() {
            var ua = this;
            if (ua.Agent.isAndroid && !/mobile/i.test(ua.Agent.source)) {
                ua.Agent.isAndroidTablet = true;
            }
        };

        this.testTouchSupport = function () {
            var ua = this;
            ua.Agent.isTouchScreen = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
        };

        this.getLaguage = function () {
            var ua = this;
            ua.Agent.language = (navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || '').toLowerCase();
        };

        this.getColorDepth = function () {
            var ua = this;
            ua.Agent.colorDepth = screen.colorDepth || -1;
        };

        this.getScreenResolution = function () {
            var ua = this;
            ua.Agent.resolution = [screen.availWidth, screen.availHeight];
        };

        this.getPixelDepth = function () {
            var ua = this;
            ua.Agent.pixelDepth = screen.pixelDepth || -1;
        };

        this.getCPU = function () {
            var ua = this;
            ua.Agent.cpuCores = navigator.hardwareConcurrency || -1;
        };

        this.reset = function reset() {
            var ua = this;
            for (var key in ua.DefaultAgent) {
                if (ua.DefaultAgent.hasOwnProperty(key)) {
                    ua.Agent[key] = ua.DefaultAgent[key];
                }
            }
            return ua;
        };

        this.parse = function get(source) {
            source = source || navigator.userAgent;
            var ua = new DeviceUUID();
            ua.Agent.source = source.replace(/^\s*/, '').replace(/\s*$/, '');
            ua.Agent.os = ua.getOS(ua.Agent.source);
            ua.Agent.platform = ua.getPlatform(ua.Agent.source);
            ua.Agent.browser = ua.getBrowser(ua.Agent.source);
            ua.Agent.version = ua.getBrowserVersion(ua.Agent.source);
            ua.testBot();
            ua.testSmartTV();
            ua.testMobile();
            ua.testAndroidTablet();
            ua.testTablet();
            ua.testCompatibilityMode();
            ua.testSilk();
            ua.testKindleFire();
            ua.testCaptiveNetwork();
            ua.testTouchSupport();
            ua.getLaguage();
            ua.getColorDepth();
            ua.getPixelDepth();
            ua.getScreenResolution();
            ua.getCPU();
            return ua.Agent;
        };

        this.get = function (customData) {
            var pref = 'a', du = this.parse();
            var dua = [];
            for (var key in this.options) {
                if (this.options.hasOwnProperty(key) && this.options[key] === true) {
                    dua.push(du[key]);
                }
            }
            if (customData) {
                dua.push(customData);
            }
            if (!this.options.resolution && du.isMobile) {
                dua.push(du.resolution);
            }
            // 8, 9, a, b
            pref = 'b';
            var tmpUuid = du.hashMD5(dua.join(':'));
            var uuid = [
                tmpUuid.slice(0,8),
                tmpUuid.slice(8,12),
                '4' + tmpUuid.slice(12,15),
                pref + tmpUuid.slice(15,18),
                tmpUuid.slice(20)
            ];
            return uuid.join('-');
        };

        this.Agent = this.DefaultAgent;
        return this;
    };

    exports.DeviceUUID = DeviceUUID;
    return new DeviceUUID(navigator.userAgent);

})(this);


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=pod-notify.js.map