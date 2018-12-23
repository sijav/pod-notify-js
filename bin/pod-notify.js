/**
 * Pod Notify JS v0.0.1
 * =========
 * A compact, cross-browser solution for the Javascript Notifications API using Fanap's POD Async service (DIRANA)
 *
 * License
 * -------
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Tyler Nickerson
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.PodNotify = factory());
}(this, function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var errorPrefix = 'NotifyError:';
    var Messages = {
        errors: {
            incompatible: errorPrefix + " PodNotifyJs is incompatible with browser.",
            invalid_plugin: errorPrefix + " plugin class missing from plugin manifest (invalid plugin). Please check the documentation.",
            invalid_title: errorPrefix + " title of notification must be a string",
            permission_denied: errorPrefix + " permission request declined",
            sw_notification_error: errorPrefix + " could not show a ServiceWorker notification due to the following reason: ",
            sw_registration_error: errorPrefix + " could not register the ServiceWorker due to the following reason: ",
            unknown_interface: errorPrefix + " unable to create notification: unknown interface"
        }
    };

    var Permission = /** @class */ (function () {
        function Permission(win) {
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
        Permission.prototype.request = function (onGranted, onDenied) {
            return arguments.length > 0
                // @ts-ignore
                ? this._requestWithCallback.apply(this, arguments) : this._requestAsPromise();
        };
        /**
       * Old permissions implementation deprecated in favor of a promise based one
       * @deprecated Since V1.0.4
       * @param {Function} onGranted - Function to execute once permission is granted
       * @param {Function} onDenied - Function to execute once permission is denied
       * @return {void}
       */
        Permission.prototype._requestWithCallback = function (onGranted, onDenied) {
            var _this = this;
            var existing = this.get();
            var resolved = false;
            var resolve = function (result) {
                if (result === void 0) { result = _this._win.Notification.permission; }
                if (resolved)
                    return;
                resolved = true;
                if (typeof result === 'undefined' && _this._win.webkitNotifications)
                    result = _this._win.webkitNotifications.checkPermission();
                if (result === _this.GRANTED || result === 0) {
                    if (onGranted)
                        onGranted();
                }
                else if (onDenied)
                    onDenied();
            };
            var request;
            /* Permissions already set */
            if (existing !== this.DEFAULT) {
                resolve(existing);
            }
            else if (this._win.webkitNotifications &&
                this._win.webkitNotifications.checkPermission) {
                /* Safari 6+, Legacy webkit browsers */
                this._win.webkitNotifications.requestPermission(resolve);
            }
            else if (this._win.Notification &&
                this._win.Notification.requestPermission) {
                /* Safari 12+ */
                /* This resolve argument will only be used in Safari */
                /* CHrome, instead, returns a Promise */
                request = this._win.Notification.requestPermission(resolve);
                if (request && request.then) {
                    /* Chrome 23+ */
                    request.then(resolve).catch(function () {
                        if (onDenied)
                            onDenied();
                    });
                }
            }
            else if (onGranted) {
                /* Let the user continue by default */
                onGranted();
            }
        };
        /**
       * Requests permission for desktop notifications in a promise based way
       * @return {Promise}
       */
        Permission.prototype._requestAsPromise = function () {
            var _this = this;
            var existing = this.get();
            var isGranted = function (result) { return result === _this.GRANTED || result === 0; };
            /* Permissions already set */
            var hasPermissions = existing !== this.DEFAULT;
            /* Safari 6+, Chrome 23+ */
            var isModernAPI = this._win.Notification && this._win.Notification.requestPermission;
            /* Legacy webkit browsers */
            var isWebkitAPI = this._win.webkitNotifications &&
                this._win.webkitNotifications.checkPermission;
            return new Promise(function (resolvePromise, rejectPromise) {
                var resolved = false;
                var resolver = function (result) {
                    if (resolved)
                        return;
                    resolved = true;
                    isGranted(result) ? resolvePromise() : rejectPromise();
                };
                var request;
                if (hasPermissions) {
                    resolver(existing);
                }
                else if (isWebkitAPI) {
                    _this._win.webkitNotifications.requestPermission(function (result) {
                        resolver(result);
                    });
                }
                else if (isModernAPI) {
                    /* Safari 12+ */
                    /* This resolver argument will only be used in Safari */
                    /* CHrome, instead, returns a Promise */
                    request = _this._win.Notification ? _this._win.Notification.requestPermission(resolver) : undefined;
                    if (request && request.then) {
                        /* Chrome 23+ */
                        request.then(resolver).catch(rejectPromise);
                    }
                }
                else
                    resolvePromise();
            });
        };
        /**
       * Returns whether Notify has been granted permission to run
       * @return {Boolean}
       */
        Permission.prototype.has = function () {
            return this.get() === this.GRANTED;
        };
        /**
       * Gets the permission level
       * @return {Permission} The permission level
       */
        Permission.prototype.get = function () {
            var permission;
            /* Safari 6+, Chrome 23+ */
            if (this._win.Notification && this._win.Notification.permission)
                permission = this._win.Notification.permission;
            else if (this._win.webkitNotifications &&
                this._win.webkitNotifications.checkPermission)
                /* Legacy webkit browsers */
                permission = this._permissions[this._win.webkitNotifications.checkPermission()];
            else if (navigator.mozNotification)
                /* Firefox Mobile */
                permission = this.GRANTED;
            else if (this._win.external && this._win.external.msIsSiteMode)
                /* IE9+ */
                permission = this._win.external.msIsSiteMode()
                    ? this.GRANTED
                    : this.DEFAULT;
            else
                permission = this.GRANTED;
            return permission;
        };
        return Permission;
    }());

    var Util = /** @class */ (function () {
        function Util() {
        }
        Util.isUndefined = function (obj) {
            return obj === undefined;
        };
        Util.isNull = function (obj) {
            return obj === null;
        };
        Util.isString = function (obj) {
            return typeof obj === 'string';
        };
        Util.isFunction = function (obj) {
            return obj && {}.toString.call(obj) === '[object Function]';
        };
        Util.isObject = function (obj) {
            return typeof obj === 'object';
        };
        Util.objectMerge = function (target, source) {
            for (var key in source) {
                if (target.hasOwnProperty(key) &&
                    this.isObject(target[key]) &&
                    this.isObject(source[key])) {
                    this.objectMerge(target[key], source[key]);
                }
                else {
                    target[key] = source[key];
                }
            }
        };
        return Util;
    }());

    var AbstractAgent = /** @class */ (function () {
        function AbstractAgent(win) {
            this._win = win;
        }
        return AbstractAgent;
    }());

    /**
     * Notification agent for modern desktop browsers:
     * Safari 6+, Firefox 22+, Chrome 22+, Opera 25+
     */
    var DesktopAgent = /** @class */ (function (_super) {
        __extends(DesktopAgent, _super);
        function DesktopAgent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns a boolean denoting support
         * @returns {Boolean} boolean denoting whether webkit notifications are supported
         */
        DesktopAgent.prototype.isSupported = function () {
            return this._win.Notification !== undefined;
        };
        /**
         * Creates a new notification
         * @param title - notification title
         * @param options - notification options array
         * @returns {Notification}
         */
        DesktopAgent.prototype.create = function (title, options) {
            return new this._win.Notification(title, {
                icon: Util.isString(options.icon) ||
                    Util.isUndefined(options.icon) ||
                    Util.isNull(options.icon)
                    ? options.icon
                    : options.icon.x32,
                body: options.body,
                tag: options.tag,
                requireInteraction: options.requireInteraction
            });
        };
        /**
         * Close a given notification
         * @param notification - notification to close
         */
        DesktopAgent.prototype.close = function (notification) {
            notification.close();
        };
        return DesktopAgent;
    }(AbstractAgent));

    /**
     * Notification agent for modern desktop browsers:
     * Safari 6+, Firefox 22+, Chrome 22+, Opera 25+
     */
    var MobileChromeAgent = /** @class */ (function (_super) {
        __extends(MobileChromeAgent, _super);
        function MobileChromeAgent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns a boolean denoting support
         * @returns {Boolean} boolean denoting whether webkit notifications are supported
         */
        MobileChromeAgent.prototype.isSupported = function () {
            return (this._win.navigator !== undefined &&
                this._win.navigator.serviceWorker !== undefined);
        };
        /**
         * Returns the function body as a string
         * @param func
         */
        MobileChromeAgent.prototype.getFunctionBody = function (func) {
            var str = func.toString().match(/function[^{]+{([\s\S]*)}$/);
            return typeof str !== 'undefined' && str !== null && str.length > 1
                ? str[1]
                : null;
        };
        /**
         * Creates a new notification
         * @param id				ID of notification
         * @param title			 Title of notification
         * @param options		   Options object
         * @param serviceWorker	 ServiceWorker path
         * @param callback		  Callback function
         */
        MobileChromeAgent.prototype.create = function (id, title, options, serviceWorker, callback) {
            var _this = this;
            /* Register ServiceWorker */
            this._win.navigator && this._win.navigator.serviceWorker.register(serviceWorker);
            this._win.navigator && this._win.navigator.serviceWorker.ready
                .then(function (registration) {
                /* Local data the service worker will use */
                var localData = {
                    id: id,
                    link: options.link,
                    origin: document.location.href,
                    onClick: Util.isFunction(options.onClick)
                        ? _this.getFunctionBody(options.onClick)
                        : '',
                    onClose: Util.isFunction(options.onClose)
                        ? _this.getFunctionBody(options.onClose)
                        : ''
                };
                /* Merge the local data with user-provided data */
                if (options.data !== undefined && options.data !== null)
                    localData = Object.assign(localData, options.data);
                /* Show the notification */
                registration
                    .showNotification(title, {
                    icon: options.icon,
                    body: options.body,
                    vibrate: options.vibrate,
                    tag: options.tag,
                    data: localData,
                    requireInteraction: options.requireInteraction,
                    silent: options.silent
                })
                    .then(function () {
                    registration.getNotifications().then(function (notifications) {
                        /* Send an empty message so the ServiceWorker knows who the client is */
                        registration.active && registration.active.postMessage('');
                        /* Trigger callback */
                        callback(notifications);
                    });
                })
                    .catch(function (error) {
                    throw new Error(Messages.errors.sw_notification_error +
                        error.message);
                });
            })
                .catch(function (error) {
                throw new Error(Messages.errors.sw_registration_error + error.message);
            });
        };
        /**
         * Close all notification
         */
        MobileChromeAgent.prototype.close = function () {
            // Can't do this with service workers
        };
        return MobileChromeAgent;
    }(AbstractAgent));

    /**
     * Notification agent for modern desktop browsers:
     * Safari 6+, Firefox 22+, Chrome 22+, Opera 25+
     */
    var MobileFirefoxAgent = /** @class */ (function (_super) {
        __extends(MobileFirefoxAgent, _super);
        function MobileFirefoxAgent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns a boolean denoting support
         * @returns {Boolean} boolean denoting whether webkit notifications are supported
         */
        MobileFirefoxAgent.prototype.isSupported = function () {
            return this._win.navigator && this._win.navigator.mozNotification !== undefined;
        };
        /**
         * Creates a new notification
         * @param title - notification title
         * @param options - notification options array
         * @returns {Notification}
         */
        MobileFirefoxAgent.prototype.create = function (title, options) {
            var notification = this._win.navigator && this._win.navigator.mozNotification.createNotification(title, options.body, options.icon);
            notification.show();
            return notification;
        };
        return MobileFirefoxAgent;
    }(AbstractAgent));

    /**
     * Notification agent for IE9
     */
    var MSAgent = /** @class */ (function (_super) {
        __extends(MSAgent, _super);
        function MSAgent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns a boolean denoting support
         * @returns {Boolean} boolean denoting whether webkit notifications are supported
         */
        MSAgent.prototype.isSupported = function () {
            return (this._win.external !== undefined &&
                this._win.external.msIsSiteMode !== undefined);
        };
        /**
         * Creates a new notification
         * @param title - notification title
         * @param options - notification options array
         * @returns {Notification}
         */
        MSAgent.prototype.create = function (title, options) {
            /* Clear any previous notifications */
            this._win.external.msSiteModeClearIconOverlay();
            this._win.external.msSiteModeSetIconOverlay(Util.isString(options.icon) || Util.isUndefined(options.icon)
                ? options.icon
                : options.icon.x16, title);
            this._win.external.msSiteModeActivate();
            return null;
        };
        /**
         * Close a given notification
         * @param notification - notification to close
         */
        MSAgent.prototype.close = function () {
            this._win.external.msSiteModeClearIconOverlay();
        };
        return MSAgent;
    }(AbstractAgent));

    /**
     * Notification agent for old Chrome versions (and some) Firefox
     */
    var WebKitAgent = /** @class */ (function (_super) {
        __extends(WebKitAgent, _super);
        function WebKitAgent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns a boolean denoting support
         * @returns {Boolean} boolean denoting whether webkit notifications are supported
         */
        WebKitAgent.prototype.isSupported = function () {
            return this._win.webkitNotifications !== undefined;
        };
        /**
         * Creates a new notification
         * @param title - notification title
         * @param options - notification options array
         * @returns {Notification}
         */
        WebKitAgent.prototype.create = function (title, options) {
            var notification = this._win.webkitNotifications.createNotification(options.icon, title, options.body);
            notification.show();
            return notification;
        };
        /**
         * Close a given notification
         * @param notification - notification to close
         */
        WebKitAgent.prototype.close = function (notification) {
            notification.cancel();
        };
        return WebKitAgent;
    }(AbstractAgent));

    /* Import notification agents */
    var Notify = /** @class */ (function () {
        function Notify(win) {
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
                desktop: new DesktopAgent(win),
                chrome: new MobileChromeAgent(win),
                firefox: new MobileFirefoxAgent(win),
                ms: new MSAgent(win),
                webkit: new WebKitAgent(win)
            };
            this._configuration = {
                serviceWorker: '/serviceWorker.min.js',
                fallback: function (_) { }
            };
        }
        /**
         * Closes a notification
         * @param id			ID of notification
         * @returns {boolean}   denotes whether the operation was successful
         * @private
         */
        Notify.prototype._closeNotification = function (id) {
            var success = true;
            var notification = this._notifications[id];
            if (notification !== undefined) {
                success = this._removeNotification(id);
                /* Safari 6+, Firefox 22+, Chrome 22+, Opera 25+ */
                if (this._agents.desktop.isSupported())
                    this._agents.desktop.close(notification);
                else if (this._agents.webkit.isSupported())
                    /* Legacy WebKit browsers */
                    this._agents.webkit.close(notification);
                else if (this._agents.ms.isSupported())
                    /* IE9 */
                    this._agents.ms.close();
                else {
                    success = false;
                    throw new Error(Messages.errors.unknown_interface);
                }
                return success;
            }
            return false;
        };
        /**
       * Adds a notification to the global dictionary of notifications
       * @param {Notification} notification
       * @return {Integer} Dictionary key of the notification
       * @private
       */
        Notify.prototype._addNotification = function (notification) {
            var id = this._currentId;
            this._notifications[id] = notification;
            this._currentId++;
            return id;
        };
        /**
       * Removes a notification with the given ID
       * @param  {Integer} id - Dictionary key/ID of the notification to remove
       * @return {Boolean} boolean denoting success
       * @private
       */
        Notify.prototype._removeNotification = function (id) {
            var success = false;
            if (this._notifications.hasOwnProperty(id)) {
                /* We're successful if we omit the given ID from the new array */
                delete this._notifications[id];
                success = true;
            }
            return success;
        };
        /**
       * Creates the wrapper for a given notification
       *
       * @param {Integer} id - Dictionary key/ID of the notification
       * @param {Map} options - Options used to create the notification
       * @returns {Map} wrapper hashmap object
       * @private
       */
        Notify.prototype._prepareNotification = function (id, options) {
            var _this = this;
            var wrapper;
            /* Wrapper used to get/close notification later on */
            wrapper = {
                get: function () {
                    return _this._notifications[id];
                },
                close: function () {
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
        };
        /**
       * Find the most recent notification from a ServiceWorker and add it to the global array
       * @param notifications
       * @private
       */
        Notify.prototype._serviceWorkerCallback = function (notifications, options, resolve) {
            var _this = this;
            var id = this._addNotification(notifications[notifications.length - 1]);
            /* Listen for close requests from the ServiceWorker */
            if (navigator && navigator.serviceWorker) {
                navigator.serviceWorker.addEventListener('message', function (event) {
                    var data = JSON.parse(event.data);
                    if (data.action === 'close' && Number.isInteger(data.id))
                        _this._removeNotification(data.id);
                });
                resolve(this._prepareNotification(id, options));
            }
            resolve(null);
        };
        /**
       * Callback function for the 'create' method
       * @return {void}
       * @private
       */
        Notify.prototype._createCallback = function (title, options, resolve) {
            var _this = this;
            var notification = null;
            var onClose;
            /* Set empty settings if none are specified */
            options = options || {};
            /* onClose event handler */
            onClose = function (id, _) {
                /* A bit redundant, but covers the cases when close() isn't explicitly called */
                _this._removeNotification(id);
                if (Util.isFunction(options.onClose)) {
                    options.onClose.call(_this, notification);
                }
            };
            /* Safari 6+, Firefox 22+, Chrome 22+, Opera 25+ */
            if (this._agents.desktop.isSupported()) {
                try {
                    /* Create a notification using the API if possible */
                    notification = this._agents.desktop.create(title, options);
                }
                catch (e) {
                    var id = this._currentId;
                    var sw = this.config().serviceWorker;
                    var cb = function (notifications) {
                        return _this._serviceWorkerCallback(notifications, options, resolve);
                    };
                    /* Create a Chrome ServiceWorker notification if it isn't supported */
                    if (this._agents.chrome.isSupported()) {
                        this._agents.chrome.create(id, title, options, sw, cb);
                    }
                }
                /* Legacy WebKit browsers */
            }
            else if (this._agents.webkit.isSupported())
                notification = this._agents.webkit.create(title, options);
            else if (this._agents.firefox.isSupported())
                /* Firefox Mobile */
                this._agents.firefox.create(title, options);
            else if (this._agents.ms.isSupported())
                /* IE9 */
                notification = this._agents.ms.create(title, options);
            else {
                /* Default fallback */
                options.title = title;
                this.config().fallback(options);
            }
            if (notification !== null) {
                var id_1 = this._addNotification(notification);
                var wrapper = this._prepareNotification(id_1, options);
                /* Notification callbacks */
                if (Util.isFunction(options.onShow))
                    notification.addEventListener('show', options.onShow);
                if (Util.isFunction(options.onError))
                    notification.addEventListener('error', options.onError);
                if (Util.isFunction(options.onClick))
                    notification.addEventListener('click', options.onClick);
                notification.addEventListener('close', function () {
                    onClose(id_1);
                });
                notification.addEventListener('cancel', function () {
                    onClose(id_1);
                });
                /* Return the wrapper so the user can call close() */
                resolve(wrapper);
            }
            /* By default, pass an empty wrapper */
            resolve(null);
        };
        /**
       * Creates and displays a new notification
       * @param {Array} options
       * @return {Promise}
       */
        Notify.prototype.create = function (title, options) {
            var _this = this;
            var promiseCallback;
            /* Fail if no or an invalid title is provided */
            if (!Util.isString(title)) {
                throw new Error(Messages.errors.invalid_title);
            }
            /* Request permission if it isn't granted */
            if (!this.Permission.has()) {
                promiseCallback = function (resolve, reject) {
                    var promise = _this.Permission.request();
                    if (promise) {
                        promise.then(function () {
                            _this._createCallback(title, options, resolve);
                        }).catch(function () {
                            reject(Messages.errors.permission_denied);
                        });
                    }
                };
            }
            else {
                promiseCallback = function (resolve, reject) {
                    try {
                        _this._createCallback(title, options, resolve);
                    }
                    catch (e) {
                        reject(e);
                    }
                };
            }
            return new Promise(promiseCallback);
        };
        /**
       * Returns the notification count
       * @return {Integer} The notification count
       */
        Notify.prototype.count = function () {
            var count = 0;
            var key;
            for (key in this._notifications)
                if (this._notifications.hasOwnProperty(key))
                    count++;
            return count;
        };
        /**
       * Closes a notification with the given tag
       * @param {String} tag - Tag of the notification to close
       * @return {Boolean} boolean denoting success
       */
        Notify.prototype.close = function (tag) {
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
        };
        /**
       * Clears all notifications
       * @return {Boolean} boolean denoting whether the clear was successful in closing all notifications
       */
        Notify.prototype.clear = function () {
            var key, success = true;
            for (key in this._notifications)
                if (this._notifications.hasOwnProperty(key))
                    success = success && this._closeNotification(key);
            return success;
        };
        /**
       * Denotes whether Notify is supported in the current browser
       * @returns {boolean}
       */
        Notify.prototype.supported = function () {
            var supported = false;
            for (var agent in this._agents)
                if (this._agents.hasOwnProperty(agent))
                    supported = supported || this._agents[agent].isSupported();
            return supported;
        };
        /**
       * Modifies settings or returns all settings if no parameter passed
       * @param settings
       */
        Notify.prototype.config = function (settings) {
            if (typeof settings !== 'undefined' ||
                (settings !== null && Util.isObject(settings)))
                Util.objectMerge(this._configuration, settings);
            return this._configuration;
        };
        /**
       * Copies the functions from a plugin to the main library
       * @param plugin
       */
        Notify.prototype.extend = function (manifest) {
            var plugin, Plugin, hasProp = {}.hasOwnProperty;
            if (!hasProp.call(manifest, 'plugin')) {
                throw new Error(Messages.errors.invalid_plugin);
            }
            else {
                if (hasProp.call(manifest, 'config') &&
                    Util.isObject(manifest.config) &&
                    manifest.config !== null) {
                    this.config(manifest.config);
                }
                Plugin = manifest.plugin;
                //@ts-ignore
                plugin = new Plugin(this.config());
                for (var member in plugin) {
                    if (hasProp.call(plugin, member) &&
                        Util.isFunction(plugin[member]))
                        //@ts-ignore
                        this[member] = plugin[member];
                }
            }
        };
        return Notify;
    }());

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var client_min = createCommonjsModule(function (module, exports) {
    (function(f){var d,e,p=function(){d=(new (window.UAParser||exports.UAParser)).getResult();e=new Detector;return this};p.prototype={getSoftwareVersion:function(){return "0.1.11"},getBrowserData:function(){return d},getFingerprint:function(){var b=d.ua,c=this.getScreenPrint(),a=this.getPlugins(),g=this.getFonts(),n=this.isLocalStorage(),f=this.isSessionStorage(),h=this.getTimeZone(),u=this.getLanguage(),m=this.getSystemLanguage(),e=this.isCookie(),C=this.getCanvasPrint();return murmurhash3_32_gc(b+"|"+
    c+"|"+a+"|"+g+"|"+n+"|"+f+"|"+h+"|"+u+"|"+m+"|"+e+"|"+C,256)},getCustomFingerprint:function(){for(var b="",c=0;c<arguments.length;c++)b+=arguments[c]+"|";return murmurhash3_32_gc(b,256)},getUserAgent:function(){return d.ua},getUserAgentLowerCase:function(){return d.ua.toLowerCase()},getBrowser:function(){return d.browser.name},getBrowserVersion:function(){return d.browser.version},getBrowserMajorVersion:function(){return d.browser.major},isIE:function(){return /IE/i.test(d.browser.name)},isChrome:function(){return /Chrome/i.test(d.browser.name)},
    isFirefox:function(){return /Firefox/i.test(d.browser.name)},isSafari:function(){return /Safari/i.test(d.browser.name)},isMobileSafari:function(){return /Mobile\sSafari/i.test(d.browser.name)},isOpera:function(){return /Opera/i.test(d.browser.name)},getEngine:function(){return d.engine.name},getEngineVersion:function(){return d.engine.version},getOS:function(){return d.os.name},getOSVersion:function(){return d.os.version},isWindows:function(){return /Windows/i.test(d.os.name)},isMac:function(){return /Mac/i.test(d.os.name)},
    isLinux:function(){return /Linux/i.test(d.os.name)},isUbuntu:function(){return /Ubuntu/i.test(d.os.name)},isSolaris:function(){return /Solaris/i.test(d.os.name)},getDevice:function(){return d.device.model},getDeviceType:function(){return d.device.type},getDeviceVendor:function(){return d.device.vendor},getCPU:function(){return d.cpu.architecture},isMobile:function(){var b=d.ua||navigator.vendor||window.opera;return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b)||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,
    4))},isMobileMajor:function(){return this.isMobileAndroid()||this.isMobileBlackBerry()||this.isMobileIOS()||this.isMobileOpera()||this.isMobileWindows()},isMobileAndroid:function(){return d.ua.match(/Android/i)?!0:!1},isMobileOpera:function(){return d.ua.match(/Opera Mini/i)?!0:!1},isMobileWindows:function(){return d.ua.match(/IEMobile/i)?!0:!1},isMobileBlackBerry:function(){return d.ua.match(/BlackBerry/i)?!0:!1},isMobileIOS:function(){return d.ua.match(/iPhone|iPad|iPod/i)?!0:!1},isIphone:function(){return d.ua.match(/iPhone/i)?
    !0:!1},isIpad:function(){return d.ua.match(/iPad/i)?!0:!1},isIpod:function(){return d.ua.match(/iPod/i)?!0:!1},getScreenPrint:function(){return "Current Resolution: "+this.getCurrentResolution()+", Available Resolution: "+this.getAvailableResolution()+", Color Depth: "+this.getColorDepth()+", Device XDPI: "+this.getDeviceXDPI()+", Device YDPI: "+this.getDeviceYDPI()},getColorDepth:function(){return screen.colorDepth},getCurrentResolution:function(){return screen.width+"x"+screen.height},getAvailableResolution:function(){return screen.availWidth+
    "x"+screen.availHeight},getDeviceXDPI:function(){return screen.deviceXDPI},getDeviceYDPI:function(){return screen.deviceYDPI},getPlugins:function(){for(var b="",c=0;c<navigator.plugins.length;c++)b=c==navigator.plugins.length-1?b+navigator.plugins[c].name:b+(navigator.plugins[c].name+", ");return b},isJava:function(){return navigator.javaEnabled()},getJavaVersion:function(){return deployJava.getJREs().toString()},isFlash:function(){return navigator.plugins["Shockwave Flash"]?!0:!1},getFlashVersion:function(){return this.isFlash()?
    (objPlayerVersion=swfobject.getFlashPlayerVersion(),objPlayerVersion.major+"."+objPlayerVersion.minor+"."+objPlayerVersion.release):""},isSilverlight:function(){return navigator.plugins["Silverlight Plug-In"]?!0:!1},getSilverlightVersion:function(){return this.isSilverlight()?navigator.plugins["Silverlight Plug-In"].description:""},isMimeTypes:function(){return navigator.mimeTypes.length?!0:!1},getMimeTypes:function(){for(var b="",c=0;c<navigator.mimeTypes.length;c++)b=c==navigator.mimeTypes.length-
    1?b+navigator.mimeTypes[c].description:b+(navigator.mimeTypes[c].description+", ");return b},isFont:function(b){return e.detect(b)},getFonts:function(){for(var b="Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Aharoni;Andalus;Angsana New;AngsanaUPC;Aparajita;Arab;Arabic Transparent;Arabic Typesetting;Arial Baltic;Arial Black;Arial CE;Arial CYR;Arial Greek;Arial TUR;Arial;Batang;BatangChe;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Browallia New;BrowalliaUPC;Calibri Light;Calibri;Californian FB;Cambria Math;Cambria;Candara;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Comic Sans MS;Consolas;Constantia;Copperplate Gothic Light;Corbel;Cordia New;CordiaUPC;Courier New Baltic;Courier New CE;Courier New CYR;Courier New Greek;Courier New TUR;Courier New;DFKai-SB;DaunPenh;David;DejaVu LGC Sans Mono;Desdemona;DilleniaUPC;DokChampa;Dotum;DotumChe;Ebrima;Engravers MT;Eras Bold ITC;Estrangelo Edessa;EucrosiaUPC;Euphemia;Eurostile;FangSong;Forte;FrankRuehl;Franklin Gothic Heavy;Franklin Gothic Medium;FreesiaUPC;French Script MT;Gabriola;Gautami;Georgia;Gigi;Gisha;Goudy Old Style;Gulim;GulimChe;GungSeo;Gungsuh;GungsuhChe;Haettenschweiler;Harrington;Hei S;HeiT;Heisei Kaku Gothic;Hiragino Sans GB;Impact;Informal Roman;IrisUPC;Iskoola Pota;JasmineUPC;KacstOne;KaiTi;Kalinga;Kartika;Khmer UI;Kino MT;KodchiangUPC;Kokila;Kozuka Gothic Pr6N;Lao UI;Latha;Leelawadee;Levenim MT;LilyUPC;Lohit Gujarati;Loma;Lucida Bright;Lucida Console;Lucida Fax;Lucida Sans Unicode;MS Gothic;MS Mincho;MS PGothic;MS PMincho;MS Reference Sans Serif;MS UI Gothic;MV Boli;Magneto;Malgun Gothic;Mangal;Marlett;Matura MT Script Capitals;Meiryo UI;Meiryo;Menlo;Microsoft Himalaya;Microsoft JhengHei;Microsoft New Tai Lue;Microsoft PhagsPa;Microsoft Sans Serif;Microsoft Tai Le;Microsoft Uighur;Microsoft YaHei;Microsoft Yi Baiti;MingLiU;MingLiU-ExtB;MingLiU_HKSCS;MingLiU_HKSCS-ExtB;Miriam Fixed;Miriam;Mongolian Baiti;MoolBoran;NSimSun;Narkisim;News Gothic MT;Niagara Solid;Nyala;PMingLiU;PMingLiU-ExtB;Palace Script MT;Palatino Linotype;Papyrus;Perpetua;Plantagenet Cherokee;Playbill;Prelude Bold;Prelude Condensed Bold;Prelude Condensed Medium;Prelude Medium;PreludeCompressedWGL Black;PreludeCompressedWGL Bold;PreludeCompressedWGL Light;PreludeCompressedWGL Medium;PreludeCondensedWGL Black;PreludeCondensedWGL Bold;PreludeCondensedWGL Light;PreludeCondensedWGL Medium;PreludeWGL Black;PreludeWGL Bold;PreludeWGL Light;PreludeWGL Medium;Raavi;Rachana;Rockwell;Rod;Sakkal Majalla;Sawasdee;Script MT Bold;Segoe Print;Segoe Script;Segoe UI Light;Segoe UI Semibold;Segoe UI Symbol;Segoe UI;Shonar Bangla;Showcard Gothic;Shruti;SimHei;SimSun;SimSun-ExtB;Simplified Arabic Fixed;Simplified Arabic;Snap ITC;Sylfaen;Symbol;Tahoma;Times New Roman Baltic;Times New Roman CE;Times New Roman CYR;Times New Roman Greek;Times New Roman TUR;Times New Roman;TlwgMono;Traditional Arabic;Trebuchet MS;Tunga;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Utsaah;Vani;Verdana;Vijaya;Vladimir Script;Vrinda;Webdings;Wide Latin;Wingdings".split(";"),
    c="",a=0;a<b.length;a++)e.detect(b[a])&&(c=a==b.length-1?c+b[a]:c+(b[a]+", "));return c},isLocalStorage:function(){try{return !!f.localStorage}catch(b){return !0}},isSessionStorage:function(){try{return !!f.sessionStorage}catch(b){return !0}},isCookie:function(){return navigator.cookieEnabled},getTimeZone:function(){return String(String(new Date).split("(")[1]).split(")")[0]},getLanguage:function(){return navigator.language},getSystemLanguage:function(){return navigator.systemLanguage},isCanvas:function(){var b=
    document.createElement("canvas");try{return !(!b.getContext||!b.getContext("2d"))}catch(c){return !1}},getCanvasPrint:function(){var b=document.createElement("canvas"),c;try{c=b.getContext("2d");}catch(a){return ""}c.textBaseline="top";c.font="14px 'Arial'";c.textBaseline="alphabetic";c.fillStyle="#f60";c.fillRect(125,1,62,20);c.fillStyle="#069";c.fillText("ClientJS,org <canvas> 1.0",2,15);c.fillStyle="rgba(102, 204, 0, 0.7)";c.fillText("ClientJS,org <canvas> 1.0",4,17);return b.toDataURL()}};module.exports=p;f.ClientJS=p;})(window);var deployJava=function(){function f(a){}function d(a){if(null==a||0==a.length)return "http://java.com/dt-redirect";"&"==a.charAt(0)&&(a=a.substring(1,a.length));return "http://java.com/dt-redirect?"+a}var e=["id","class","title","style"];var p="codebase code name archive object width height alt align hspace vspace".split(" ").concat(e),b;try{b=-1!=document.location.protocol.indexOf("http")?"//java.com/js/webstart.png":"http://java.com/js/webstart.png";}catch(a){b="http://java.com/js/webstart.png";}var c={debug:null,version:"20120801",firefoxJavaVersion:null,myInterval:null,preInstallJREList:null,returnPage:null,brand:null,locale:null,installType:null,EAInstallEnabled:!1,EarlyAccessURL:null,oldMimeType:"application/npruntime-scriptable-plugin;DeploymentToolkit",
    mimeType:"application/java-deployment-toolkit",launchButtonPNG:b,browserName:null,browserName2:null,getJREs:function(){var a=[];if(this.isPluginInstalled())for(var g=this.getPlugin().jvms,b=0;b<g.getLength();b++)a[b]=g.get(b).version;else g=this.getBrowser(),"MSIE"==g?this.testUsingActiveX("1.7.0")?a[0]="1.7.0":this.testUsingActiveX("1.6.0")?a[0]="1.6.0":this.testUsingActiveX("1.5.0")?a[0]="1.5.0":this.testUsingActiveX("1.4.2")?a[0]="1.4.2":this.testForMSVM()&&(a[0]="1.1"):"Netscape Family"==g&&(this.getJPIVersionUsingMimeType(),
    null!=this.firefoxJavaVersion?a[0]=this.firefoxJavaVersion:this.testUsingMimeTypes("1.7")?a[0]="1.7.0":this.testUsingMimeTypes("1.6")?a[0]="1.6.0":this.testUsingMimeTypes("1.5")?a[0]="1.5.0":this.testUsingMimeTypes("1.4.2")?a[0]="1.4.2":"Safari"==this.browserName2&&(this.testUsingPluginsArray("1.7.0")?a[0]="1.7.0":this.testUsingPluginsArray("1.6")?a[0]="1.6.0":this.testUsingPluginsArray("1.5")?a[0]="1.5.0":this.testUsingPluginsArray("1.4.2")&&(a[0]="1.4.2")));if(this.debug)for(b=0;b<a.length;++b)f("[getJREs()] We claim to have detected Java SE "+
    a[b]);return a},installJRE:function(a,g){if(this.isPluginInstalled()&&this.isAutoInstallEnabled(a)){var b=!1;if(b=this.isCallbackSupported()?this.getPlugin().installJRE(a,g):this.getPlugin().installJRE(a))this.refresh(),null!=this.returnPage&&(document.location=this.returnPage);return b}return this.installLatestJRE()},isAutoInstallEnabled:function(a){if(!this.isPluginInstalled())return !1;"undefined"==typeof a&&(a=null);if("MSIE"!=deployJava.browserName||deployJava.compareVersionToPattern(deployJava.getPlugin().version,
    ["10","0","0"],!1,!0))a=!0;else if(null==a)a=!1;else{var g="1.6.0_33+";if(null==g||0==g.length)a=!0;else{var b=g.charAt(g.length-1);"+"!=b&&"*"!=b&&-1!=g.indexOf("_")&&"_"!=b&&(g+="*",b="*");g=g.substring(0,g.length-1);if(0<g.length){var c=g.charAt(g.length-1);if("."==c||"_"==c)g=g.substring(0,g.length-1);}a="*"==b?0==a.indexOf(g):"+"==b?g<=a:!1;}a=!a;}return a},isCallbackSupported:function(){return this.isPluginInstalled()&&this.compareVersionToPattern(this.getPlugin().version,["10","2","0"],!1,!0)},
    installLatestJRE:function(a){if(this.isPluginInstalled()&&this.isAutoInstallEnabled()){var g=!1;if(g=this.isCallbackSupported()?this.getPlugin().installLatestJRE(a):this.getPlugin().installLatestJRE())this.refresh(),null!=this.returnPage&&(document.location=this.returnPage);return g}a=this.getBrowser();g=navigator.platform.toLowerCase();if("true"==this.EAInstallEnabled&&-1!=g.indexOf("win")&&null!=this.EarlyAccessURL)this.preInstallJREList=this.getJREs(),null!=this.returnPage&&(this.myInterval=setInterval("deployJava.poll()",
    3E3)),location.href=this.EarlyAccessURL;else{if("MSIE"==a)return this.IEInstall();if("Netscape Family"==a&&-1!=g.indexOf("win32"))return this.FFInstall();location.href=d((null!=this.returnPage?"&returnPage="+this.returnPage:"")+(null!=this.locale?"&locale="+this.locale:"")+(null!=this.brand?"&brand="+this.brand:""));}return !1},runApplet:function(a,g,b){if("undefined"==b||null==b)b="1.1";var c=b.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$");null==this.returnPage&&(this.returnPage=document.location);
    null!=c?"?"!=this.getBrowser()?this.versionCheck(b+"+")?this.writeAppletTag(a,g):this.installJRE(b+"+")&&(this.refresh(),location.href=document.location,this.writeAppletTag(a,g)):this.writeAppletTag(a,g):f("[runApplet()] Invalid minimumVersion argument to runApplet():"+b);},writeAppletTag:function(a,g){var b="<applet ",c="",h=!0;if(null==g||"object"!=typeof g)g={};for(var d in a){var m;a:{m=d.toLowerCase();for(var f=p.length,e=0;e<f;e++)if(p[e]===m){m=!0;break a}m=!1;}m?(b+=" "+d+'="'+a[d]+'"',"code"==
    d&&(h=!1)):g[d]=a[d];}d=!1;for(var q in g){"codebase_lookup"==q&&(d=!0);if("object"==q||"java_object"==q||"java_code"==q)h=!1;c+='<param name="'+q+'" value="'+g[q]+'"/>';}d||(c+='<param name="codebase_lookup" value="false"/>');h&&(b+=' code="dummy"');document.write(b+">\n"+c+"\n</applet>");},versionCheck:function(a){var g=0,b=a.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?(\\*|\\+)?$");if(null!=b){for(var c=a=!1,h=[],d=1;d<b.length;++d)"string"==typeof b[d]&&""!=b[d]&&(h[g]=b[d],g++);"+"==h[h.length-
    1]?(c=!0,a=!1,h.length--):"*"==h[h.length-1]?(c=!1,a=!0,h.length--):4>h.length&&(c=!1,a=!0);g=this.getJREs();for(d=0;d<g.length;++d)if(this.compareVersionToPattern(g[d],h,a,c))return !0}else g="Invalid versionPattern passed to versionCheck: "+a,alert(g);return !1},isWebStartInstalled:function(a){if("?"==this.getBrowser())return !0;if("undefined"==a||null==a)a="1.4.2";var b=!1;null!=a.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$")?b=this.versionCheck(a+"+"):(b=this.versionCheck("1.4.2+"));return b},getJPIVersionUsingMimeType:function(){for(var a=0;a<navigator.mimeTypes.length;++a){var b=navigator.mimeTypes[a].type.match(/^application\/x-java-applet;jpi-version=(.*)$/);if(null!=b&&(this.firefoxJavaVersion=b[1],"Opera"!=this.browserName2))break}},launchWebStartApplication:function(a){navigator.userAgent.toLowerCase();this.getJPIVersionUsingMimeType();if(0==this.isWebStartInstalled("1.7.0")&&(0==this.installJRE("1.7.0+")||0==this.isWebStartInstalled("1.7.0")))return !1;
    var b=null;document.documentURI&&(b=document.documentURI);null==b&&(b=document.URL);var c=this.getBrowser(),d;"MSIE"==c?d='<object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" width="0" height="0"><PARAM name="launchjnlp" value="'+a+'"><PARAM name="docbase" value="'+b+'"></object>':"Netscape Family"==c&&(d='<embed type="application/x-java-applet;jpi-version='+this.firefoxJavaVersion+'" width="0" height="0" launchjnlp="'+a+'"docbase="'+b+'" />');"undefined"==document.body||null==document.body?
    (document.write(d),document.location=b):(a=document.createElement("div"),a.id="div1",a.style.position="relative",a.style.left="-10000px",a.style.margin="0px auto",a.className="dynamicDiv",a.innerHTML=d,document.body.appendChild(a));},createWebStartLaunchButtonEx:function(a,b){null==this.returnPage&&(this.returnPage=a);document.write('<a href="'+("javascript:deployJava.launchWebStartApplication('"+a+"');")+'" onMouseOver="window.status=\'\'; return true;"><img src="'+this.launchButtonPNG+'" border="0" /></a>');},
    createWebStartLaunchButton:function(a,b){null==this.returnPage&&(this.returnPage=a);document.write('<a href="'+("javascript:if (!deployJava.isWebStartInstalled(&quot;"+b+"&quot;)) {if (deployJava.installLatestJRE()) {if (deployJava.launch(&quot;"+a+"&quot;)) {}}} else {if (deployJava.launch(&quot;"+a+"&quot;)) {}}")+'" onMouseOver="window.status=\'\'; return true;"><img src="'+this.launchButtonPNG+'" border="0" /></a>');},launch:function(a){document.location=a;return !0},isPluginInstalled:function(){var a=
    this.getPlugin();return a&&a.jvms?!0:!1},isAutoUpdateEnabled:function(){return this.isPluginInstalled()?this.getPlugin().isAutoUpdateEnabled():!1},setAutoUpdateEnabled:function(){return this.isPluginInstalled()?this.getPlugin().setAutoUpdateEnabled():!1},setInstallerType:function(a){this.installType=a;return this.isPluginInstalled()?this.getPlugin().setInstallerType(a):!1},setAdditionalPackages:function(a){return this.isPluginInstalled()?this.getPlugin().setAdditionalPackages(a):!1},setEarlyAccess:function(a){this.EAInstallEnabled=
    a;},isPlugin2:function(){if(this.isPluginInstalled()&&this.versionCheck("1.6.0_10+"))try{return this.getPlugin().isPlugin2()}catch(a){}return !1},allowPlugin:function(){this.getBrowser();return "Safari"!=this.browserName2&&"Opera"!=this.browserName2},getPlugin:function(){this.refresh();var a=null;this.allowPlugin()&&(a=document.getElementById("deployJavaPlugin"));return a},compareVersionToPattern:function(a,b,c,d){if(void 0==a||void 0==b)return !1;var h=a.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$");
    if(null!=h){var f=0;a=[];for(var m=1;m<h.length;++m)"string"==typeof h[m]&&""!=h[m]&&(a[f]=h[m],f++);h=Math.min(a.length,b.length);if(d){for(m=0;m<h;++m){if(a[m]<b[m])return !1;if(a[m]>b[m])break}return !0}for(m=0;m<h;++m)if(a[m]!=b[m])return !1;return c?!0:a.length==b.length}return !1},getBrowser:function(){if(null==this.browserName){var a=navigator.userAgent.toLowerCase();-1!=a.indexOf("msie")&&-1==a.indexOf("opera")?this.browserName2=this.browserName=
    "MSIE":-1!=a.indexOf("iphone")?(this.browserName="Netscape Family",this.browserName2="iPhone"):-1!=a.indexOf("firefox")&&-1==a.indexOf("opera")?(this.browserName="Netscape Family",this.browserName2="Firefox"):-1!=a.indexOf("chrome")?(this.browserName="Netscape Family",this.browserName2="Chrome"):-1!=a.indexOf("safari")?(this.browserName="Netscape Family",this.browserName2="Safari"):-1!=a.indexOf("mozilla")&&-1==a.indexOf("opera")?(this.browserName="Netscape Family",this.browserName2="Other"):-1!=
    a.indexOf("opera")?(this.browserName="Netscape Family",this.browserName2="Opera"):(this.browserName="?",this.browserName2="unknown");f("[getBrowser()] Detected browser name:"+this.browserName+", "+this.browserName2);}return this.browserName},testUsingActiveX:function(a){a="JavaWebStart.isInstalled."+a+".0";if("undefined"==typeof ActiveXObject||!ActiveXObject)return !1;try{return null!=new ActiveXObject(a)}catch(b){return !1}},
    testForMSVM:function(){if("undefined"!=typeof oClientCaps){var a=oClientCaps.getComponentVersion("{08B0E5C0-4FCB-11CF-AAA5-00401C608500}","ComponentID");return ""==a||"5,0,5000,0"==a?!1:!0}return !1},testUsingMimeTypes:function(a){if(!navigator.mimeTypes)return !1;for(var b=0;b<navigator.mimeTypes.length;++b){s=navigator.mimeTypes[b].type;var c=s.match(/^application\/x-java-applet\x3Bversion=(1\.8|1\.7|1\.6|1\.5|1\.4\.2)$/);
    if(null!=c&&this.compareVersions(c[1],a))return !0}return !1},testUsingPluginsArray:function(a){if(!navigator.plugins||!navigator.plugins.length)return !1;for(var b=navigator.platform.toLowerCase(),c=0;c<navigator.plugins.length;++c)if(s=navigator.plugins[c].description,-1!=s.search(/^Java Switchable Plug-in (Cocoa)/)){if(this.compareVersions("1.5.0",a))return !0}else if(-1!=s.search(/^Java/)&&-1!=b.indexOf("win")&&(this.compareVersions("1.5.0",a)||this.compareVersions("1.6.0",a)))return !0;return this.compareVersions("1.5.0",
    a)?!0:!1},IEInstall:function(){location.href=d((null!=this.returnPage?"&returnPage="+this.returnPage:"")+(null!=this.locale?"&locale="+this.locale:"")+(null!=this.brand?"&brand="+this.brand:""));return !1},done:function(a,b){},FFInstall:function(){location.href=d((null!=this.returnPage?"&returnPage="+this.returnPage:"")+(null!=this.locale?"&locale="+this.locale:"")+(null!=this.brand?"&brand="+this.brand:"")+(null!=this.installType?"&type="+this.installType:""));return !1},compareVersions:function(a,
    b){for(var c=a.split("."),d=b.split("."),h=0;h<c.length;++h)c[h]=Number(c[h]);for(h=0;h<d.length;++h)d[h]=Number(d[h]);2==c.length&&(c[2]=0);return c[0]>d[0]?!0:c[0]<d[0]?!1:c[1]>d[1]?!0:c[1]<d[1]?!1:c[2]>d[2]?!0:c[2]<d[2]?!1:!0},enableAlerts:function(){this.browserName=null;this.debug=!0;},poll:function(){this.refresh();var a=this.getJREs();0==this.preInstallJREList.length&&0!=a.length&&(clearInterval(this.myInterval),null!=this.returnPage&&(location.href=this.returnPage));0!=this.preInstallJREList.length&&
    0!=a.length&&this.preInstallJREList[0]!=a[0]&&(clearInterval(this.myInterval),null!=this.returnPage&&(location.href=this.returnPage));},writePluginTag:function(){var a=this.getBrowser();"MSIE"==a?document.write('<object classid="clsid:CAFEEFAC-DEC7-0000-0001-ABCDEFFEDCBA" id="deployJavaPlugin" width="0" height="0"></object>'):"Netscape Family"==a&&this.allowPlugin()&&this.writeEmbedTag();},refresh:function(){navigator.plugins.refresh(!1);"Netscape Family"==this.getBrowser()&&this.allowPlugin()&&null==
    document.getElementById("deployJavaPlugin")&&this.writeEmbedTag();},writeEmbedTag:function(){var a=!1;if(null!=navigator.mimeTypes){for(var b=0;b<navigator.mimeTypes.length;b++)navigator.mimeTypes[b].type==this.mimeType&&navigator.mimeTypes[b].enabledPlugin&&(document.write('<embed id="deployJavaPlugin" type="'+this.mimeType+'" hidden="true" />'),a=!0);if(!a)for(b=0;b<navigator.mimeTypes.length;b++)navigator.mimeTypes[b].type==this.oldMimeType&&navigator.mimeTypes[b].enabledPlugin&&document.write('<embed id="deployJavaPlugin" type="'+
    this.oldMimeType+'" hidden="true" />');}}};c.writePluginTag();if(null==c.locale){e=null;if(null==e)try{e=navigator.userLanguage;}catch(a){}if(null==e)try{e=navigator.systemLanguage;}catch(a){}if(null==e)try{e=navigator.language;}catch(a){}null!=e&&(e.replace("-","_"),c.locale=e);}return c}();var Detector=function(){var f=["monospace","sans-serif","serif"],d=document.getElementsByTagName("body")[0],e=document.createElement("span");e.style.fontSize="72px";e.innerHTML="mmmmmmmmmmlli";var p={},b={},c;for(c in f)e.style.fontFamily=f[c],d.appendChild(e),p[f[c]]=e.offsetWidth,b[f[c]]=e.offsetHeight,d.removeChild(e);this.detect=function(a){var c=!1,n;for(n in f){e.style.fontFamily=a+","+f[n];d.appendChild(e);var v=e.offsetWidth!=p[f[n]]||e.offsetHeight!=b[f[n]];d.removeChild(e);c=c||v;}return c};};function murmurhash3_32_gc(f,d){var e,p,b,c,a;e=f.length&3;p=f.length-e;b=d;for(a=0;a<p;)c=f.charCodeAt(a)&255|(f.charCodeAt(++a)&255)<<8|(f.charCodeAt(++a)&255)<<16|(f.charCodeAt(++a)&255)<<24,++a,c=3432918353*(c&65535)+((3432918353*(c>>>16)&65535)<<16)&4294967295,c=c<<15|c>>>17,c=461845907*(c&65535)+((461845907*(c>>>16)&65535)<<16)&4294967295,b^=c,b=b<<13|b>>>19,b=5*(b&65535)+((5*(b>>>16)&65535)<<16)&4294967295,b=(b&65535)+27492+(((b>>>16)+58964&65535)<<16);c=0;switch(e){case 3:c^=(f.charCodeAt(a+
    2)&255)<<16;case 2:c^=(f.charCodeAt(a+1)&255)<<8;case 1:c^=f.charCodeAt(a)&255,c=3432918353*(c&65535)+((3432918353*(c>>>16)&65535)<<16)&4294967295,c=c<<15|c>>>17,b^=461845907*(c&65535)+((461845907*(c>>>16)&65535)<<16)&4294967295;}b^=f.length;b^=b>>>16;b=2246822507*(b&65535)+((2246822507*(b>>>16)&65535)<<16)&4294967295;b^=b>>>13;b=3266489909*(b&65535)+((3266489909*(b>>>16)&65535)<<16)&4294967295;return (b^b>>>16)>>>0}var swfobject=function(){function f(){if(!y){try{var a=l.getElementsByTagName("body")[0].appendChild(l.createElement("span"));a.parentNode.removeChild(a);}catch(b){return}y=!0;for(var a=F.length,c=0;c<a;c++)F[c]();}}function d(a){y?a():F[F.length]=a;}function e(a){if("undefined"!=typeof r.addEventListener)r.addEventListener("load",a,!1);else if("undefined"!=typeof l.addEventListener)l.addEventListener("load",a,!1);else if("undefined"!=typeof r.attachEvent)B(r,"onload",a);else if("function"==typeof r.onload){var b=
    r.onload;r.onload=function(){b();a();};}else r.onload=a;}function p(){var a=l.getElementsByTagName("body")[0],c=l.createElement("object");c.setAttribute("type","application/x-shockwave-flash");var d=a.appendChild(c);if(d){var g=0;(function(){if("undefined"!=typeof d.GetVariable){var h=d.GetVariable("$version");h&&(h=h.split(" ")[1].split(","),k.pv=[parseInt(h[0],10),parseInt(h[1],10),parseInt(h[2],10)]);}else if(10>g){g++;setTimeout(arguments.callee,10);return}a.removeChild(c);d=null;b();})();}else b();}
    function b(){var b=x.length;if(0<b)for(var z=0;z<b;z++){var d=x[z].id,h=x[z].callbackFn,f={success:!1,id:d};if(0<k.pv[0]){var e=m(d);if(e)if(!C(x[z].swfVersion)||k.wk&&312>k.wk)if(x[z].expressInstall&&a()){f={};f.data=x[z].expressInstall;f.width=e.getAttribute("width")||"0";f.height=e.getAttribute("height")||"0";e.getAttribute("class")&&(f.styleclass=e.getAttribute("class"));e.getAttribute("align")&&(f.align=e.getAttribute("align"));for(var l={},e=e.getElementsByTagName("param"),q=e.length,u=0;u<
    q;u++)"movie"!=e[u].getAttribute("name").toLowerCase()&&(l[e[u].getAttribute("name")]=e[u].getAttribute("value"));g(f,l,d,h);}else n(e),h&&h(f);else A(d,!0),h&&(f.success=!0,f.ref=c(d),h(f));}else A(d,!0),h&&((d=c(d))&&"undefined"!=typeof d.SetVariable&&(f.success=!0,f.ref=d),h(f));}}function c(a){var b=null;(a=m(a))&&"OBJECT"==a.nodeName&&("undefined"!=typeof a.SetVariable?b=a:(a=a.getElementsByTagName("object")[0])&&(b=a));return b}function a(){return !G&&C("6.0.65")&&(k.win||k.mac)&&!(k.wk&&312>k.wk)}
    function g(a,b,c,d){G=!0;J=d||null;L={success:!1,id:c};var g=m(c);if(g){"OBJECT"==g.nodeName?(E=v(g),H=null):(E=g,H=c);a.id="SWFObjectExprInst";if("undefined"==typeof a.width||!/%$/.test(a.width)&&310>parseInt(a.width,10))a.width="310";if("undefined"==typeof a.height||!/%$/.test(a.height)&&137>parseInt(a.height,10))a.height="137";l.title=l.title.slice(0,47)+" - Flash Player Installation";d=k.ie&&k.win?"ActiveX":"PlugIn";d="MMredirectURL="+r.location.toString().replace(/&/g,"%26")+"&MMplayerType="+
    d+"&MMdoctitle="+l.title;b.flashvars="undefined"!=typeof b.flashvars?b.flashvars+("&"+d):d;k.ie&&k.win&&4!=g.readyState&&(d=l.createElement("div"),c+="SWFObjectNew",d.setAttribute("id",c),g.parentNode.insertBefore(d,g),g.style.display="none",function(){4==g.readyState?g.parentNode.removeChild(g):setTimeout(arguments.callee,10);}());h(a,b,c);}}function n(a){if(k.ie&&k.win&&4!=a.readyState){var b=l.createElement("div");a.parentNode.insertBefore(b,a);b.parentNode.replaceChild(v(a),b);a.style.display="none";
    (function(){4==a.readyState?a.parentNode.removeChild(a):setTimeout(arguments.callee,10);})();}else a.parentNode.replaceChild(v(a),a);}function v(a){var b=l.createElement("div");if(k.win&&k.ie)b.innerHTML=a.innerHTML;else if(a=a.getElementsByTagName("object")[0])if(a=a.childNodes)for(var c=a.length,d=0;d<c;d++)1==a[d].nodeType&&"PARAM"==a[d].nodeName||8==a[d].nodeType||b.appendChild(a[d].cloneNode(!0));return b}function h(a,b,c){var d,g=m(c);if(k.wk&&312>k.wk)return d;if(g)if("undefined"==typeof a.id&&
    (a.id=c),k.ie&&k.win){var h="",f;for(f in a)a[f]!=Object.prototype[f]&&("data"==f.toLowerCase()?b.movie=a[f]:"styleclass"==f.toLowerCase()?h+=' class="'+a[f]+'"':"classid"!=f.toLowerCase()&&(h+=" "+f+'="'+a[f]+'"'));f="";for(var e in b)b[e]!=Object.prototype[e]&&(f+='<param name="'+e+'" value="'+b[e]+'" />');g.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+h+">"+f+"</object>";I[I.length]=a.id;d=m(a.id);}else{e=l.createElement("object");e.setAttribute("type","application/x-shockwave-flash");
    for(var q in a)a[q]!=Object.prototype[q]&&("styleclass"==q.toLowerCase()?e.setAttribute("class",a[q]):"classid"!=q.toLowerCase()&&e.setAttribute(q,a[q]));for(h in b)b[h]!=Object.prototype[h]&&"movie"!=h.toLowerCase()&&(a=e,f=h,q=b[h],c=l.createElement("param"),c.setAttribute("name",f),c.setAttribute("value",q),a.appendChild(c));g.parentNode.replaceChild(e,g);d=e;}return d}function u(a){var b=m(a);b&&"OBJECT"==b.nodeName&&(k.ie&&k.win?(b.style.display="none",function(){if(4==b.readyState){var c=m(a);
    if(c){for(var d in c)"function"==typeof c[d]&&(c[d]=null);c.parentNode.removeChild(c);}}else setTimeout(arguments.callee,10);}()):b.parentNode.removeChild(b));}function m(a){var b=null;try{b=l.getElementById(a);}catch(c){}return b}function B(a,b,c){a.attachEvent(b,c);D[D.length]=[a,b,c];}function C(a){var b=k.pv;a=a.split(".");a[0]=parseInt(a[0],10);a[1]=parseInt(a[1],10)||0;a[2]=parseInt(a[2],10)||0;return b[0]>a[0]||b[0]==a[0]&&b[1]>a[1]||b[0]==a[0]&&b[1]==a[1]&&b[2]>=a[2]?!0:!1}function q(a,b,c,d){if(!k.ie||
    !k.mac){var h=l.getElementsByTagName("head")[0];h&&(c=c&&"string"==typeof c?c:"screen",d&&(K=w=null),w&&K==c||(d=l.createElement("style"),d.setAttribute("type","text/css"),d.setAttribute("media",c),w=h.appendChild(d),k.ie&&k.win&&"undefined"!=typeof l.styleSheets&&0<l.styleSheets.length&&(w=l.styleSheets[l.styleSheets.length-1]),K=c),k.ie&&k.win?w&&"object"==typeof w.addRule&&w.addRule(a,b):w&&"undefined"!=typeof l.createTextNode&&w.appendChild(l.createTextNode(a+" {"+b+"}")));}}function A(a,b){if(M){var c=
    b?"visible":"hidden";y&&m(a)?m(a).style.visibility=c:q("#"+a,"visibility:"+c);}}function N(a){return null!=/[\\\"<>\.;]/.exec(a)&&"undefined"!=typeof encodeURIComponent?encodeURIComponent(a):a}var r=window,l=document,t=navigator,O=!1,F=[function(){O?p():b();}],x=[],I=[],D=[],E,H,J,L,y=!1,G=!1,w,K,M=!0,k=function(){var a="undefined"!=typeof l.getElementById&&"undefined"!=typeof l.getElementsByTagName&&"undefined"!=typeof l.createElement,b=t.userAgent.toLowerCase(),c=t.platform.toLowerCase(),d=c?/win/.test(c):
    /win/.test(b),c=c?/mac/.test(c):/mac/.test(b),b=/webkit/.test(b)?parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,h=!+"\v1",g=[0,0,0],f=null;if("undefined"!=typeof t.plugins&&"object"==typeof t.plugins["Shockwave Flash"])!(f=t.plugins["Shockwave Flash"].description)||"undefined"!=typeof t.mimeTypes&&t.mimeTypes["application/x-shockwave-flash"]&&!t.mimeTypes["application/x-shockwave-flash"].enabledPlugin||(O=!0,h=!1,f=f.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),g[0]=parseInt(f.replace(/^(.*)\..*$/,
    "$1"),10),g[1]=parseInt(f.replace(/^.*\.(.*)\s.*$/,"$1"),10),g[2]=/[a-zA-Z]/.test(f)?parseInt(f.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if("undefined"!=typeof r.ActiveXObject)try{var e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");e&&(f=e.GetVariable("$version"))&&(h=!0,f=f.split(" ")[1].split(","),g=[parseInt(f[0],10),parseInt(f[1],10),parseInt(f[2],10)]);}catch(m){}return {w3:a,pv:g,wk:b,ie:h,win:d,mac:c}}();(function(){k.w3&&(("undefined"!=typeof l.readyState&&"complete"==l.readyState||
    "undefined"==typeof l.readyState&&(l.getElementsByTagName("body")[0]||l.body))&&f(),y||("undefined"!=typeof l.addEventListener&&l.addEventListener("DOMContentLoaded",f,!1),k.ie&&k.win&&(l.attachEvent("onreadystatechange",function(){"complete"==l.readyState&&(l.detachEvent("onreadystatechange",arguments.callee),f());}),r==top&&function(){if(!y){try{l.documentElement.doScroll("left");}catch(a){setTimeout(arguments.callee,0);return}f();}}()),k.wk&&function(){y||(/loaded|complete/.test(l.readyState)?f():
    setTimeout(arguments.callee,0));}(),e(f)));})();(function(){k.ie&&k.win&&window.attachEvent("onunload",function(){for(var a=D.length,b=0;b<a;b++)D[b][0].detachEvent(D[b][1],D[b][2]);a=I.length;for(b=0;b<a;b++)u(I[b]);for(var c in k)k[c]=null;k=null;for(var d in swfobject)swfobject[d]=null;swfobject=null;});})();return {registerObject:function(a,b,c,d){if(k.w3&&a&&b){var h={};h.id=a;h.swfVersion=b;h.expressInstall=c;h.callbackFn=d;x[x.length]=h;A(a,!1);}else d&&d({success:!1,id:a});},getObjectById:function(a){if(k.w3)return c(a)},
    embedSWF:function(b,c,f,e,m,q,l,u,p,r){var n={success:!1,id:c};k.w3&&!(k.wk&&312>k.wk)&&b&&c&&f&&e&&m?(A(c,!1),d(function(){f+="";e+="";var d={};if(p&&"object"===typeof p)for(var k in p)d[k]=p[k];d.data=b;d.width=f;d.height=e;k={};if(u&&"object"===typeof u)for(var B in u)k[B]=u[B];if(l&&"object"===typeof l)for(var t in l)k.flashvars="undefined"!=typeof k.flashvars?k.flashvars+("&"+t+"="+l[t]):t+"="+l[t];if(C(m))B=h(d,k,c),d.id==c&&A(c,!0),n.success=!0,n.ref=B;else{if(q&&a()){d.data=q;g(d,k,c,r);return}A(c,
    !0);}r&&r(n);})):r&&r(n);},switchOffAutoHideShow:function(){M=!1;},ua:k,getFlashPlayerVersion:function(){return {major:k.pv[0],minor:k.pv[1],release:k.pv[2]}},hasFlashPlayerVersion:C,createSWF:function(a,b,c){if(k.w3)return h(a,b,c)},showExpressInstall:function(b,c,d,h){k.w3&&a()&&g(b,c,d,h);},removeSWF:function(a){k.w3&&u(a);},createCSS:function(a,b,c,d){k.w3&&q(a,b,c,d);},addDomLoadEvent:d,addLoadEvent:e,getQueryParamValue:function(a){var b=l.location.search||l.location.hash;if(b){/\?/.test(b)&&(b=b.split("?")[1]);
    if(null==a)return N(b);for(var b=b.split("&"),c=0;c<b.length;c++)if(b[c].substring(0,b[c].indexOf("="))==a)return N(b[c].substring(b[c].indexOf("=")+1))}return ""},expressInstallCallback:function(){if(G){var a=m("SWFObjectExprInst");a&&E&&(a.parentNode.replaceChild(E,a),H&&(A(H,!0),k.ie&&k.win&&(E.style.display="block")),J&&J(L));G=!1;}}}}();(function(f,d){var e={extend:function(a,b){for(var c in b)-1!=="browser cpu device engine os".indexOf(c)&&0===b[c].length%2&&(a[c]=b[c].concat(a[c]));return a},has:function(a,b){return "string"===typeof a?-1!==b.toLowerCase().indexOf(a.toLowerCase()):!1},lowerize:function(a){return a.toLowerCase()},major:function(a){return "string"===typeof a?a.split(".")[0]:d}},p=function(){for(var a,b=0,c,f,g,e,p,n,r=arguments;b<r.length&&!p;){var l=r[b],t=r[b+1];if("undefined"===typeof a)for(g in a={},t)t.hasOwnProperty(g)&&
    (e=t[g],"object"===typeof e?a[e[0]]=d:a[e]=d);for(c=f=0;c<l.length&&!p;)if(p=l[c++].exec(this.getUA()))for(g=0;g<t.length;g++)n=p[++f],e=t[g],"object"===typeof e&&0<e.length?2==e.length?a[e[0]]="function"==typeof e[1]?e[1].call(this,n):e[1]:3==e.length?a[e[0]]="function"!==typeof e[1]||e[1].exec&&e[1].test?n?n.replace(e[1],e[2]):d:n?e[1].call(this,n,e[2]):d:4==e.length&&(a[e[0]]=n?e[3].call(this,n.replace(e[1],e[2])):d):a[e]=n?n:d;b+=2;}return a},b=function(a,b){for(var c in b)if("object"===typeof b[c]&&
    0<b[c].length)for(var f=0;f<b[c].length;f++){if(e.has(b[c][f],a))return "?"===c?d:c}else if(e.has(b[c],a))return "?"===c?d:c;return a},c={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2E3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2","8.1":"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},a={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],["name","version"],[/\s(opr)\/([\w\.]+)/i],[["name",
    "Opera"],"version"],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i],["name","version"],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[["name","IE"],"version"],[/(edge)\/((\d+)?[\w\.]+)/i],["name","version"],[/(yabrowser)\/([\w\.]+)/i],
    [["name","Yandex"],"version"],[/(comodo_dragon)\/([\w\.]+)/i],[["name",/_/g," "],"version"],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,/(qqbrowser)[\/\s]?([\w\.]+)/i],["name","version"],[/(uc\s?browser)[\/\s]?([\w\.]+)/i,/ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i,/JUC.+(ucweb)[\/\s]?([\w\.]+)/i],[["name","UCBrowser"],"version"],[/(dolfin)\/([\w\.]+)/i],[["name","Dolphin"],"version"],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[["name","Chrome"],"version"],[/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],
    ["version",["name","MIUI Browser"]],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],["version",["name","Android Browser"]],[/FBAV\/([\w\.]+);/i],["version",["name","Facebook"]],[/fxios\/([\w\.-]+)/i],["version",["name","Firefox"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],["version",["name","Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],["version","name"],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],["name",["version",b,{"1.0":"/8","1.2":"/1","1.3":"/3",
    "2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(konqueror)\/([\w\.]+)/i,/(webkit|khtml)\/([\w\.]+)/i],["name","version"],[/(navigator|netscape)\/([\w\.-]+)/i],[["name","Netscape"],"version"],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
    /(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]+)*/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],["name","version"]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[["architecture","amd64"]],[/(ia32(?=;))/i],[["architecture",e.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[["architecture","ia32"]],[/windows\s(ce|mobile);\sppc;/i],[["architecture","arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[["architecture",/ower/,"",e.lowerize]],[/(sun4\w)[;\)]/i],[["architecture","sparc"]],
    [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[["architecture",e.lowerize]]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],["model","vendor",["type","tablet"]],[/applecoremedia\/[\w\.]+ \((ipad)/],["model",["vendor","Apple"],["type","tablet"]],[/(apple\s{0,1}tv)/i],[["model","Apple TV"],["vendor","Apple"]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],
    ["vendor","model",["type","tablet"]],[/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],["model",["vendor","Amazon"],["type","tablet"]],[/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],[["model",b,{"Fire Phone":["SD","KF"]}],["vendor","Amazon"],["type","mobile"]],[/\((ip[honed|\s\w*]+);.+(apple)/i],["model","vendor",["type","mobile"]],[/\((ip[honed|\s\w*]+);/i],["model",["vendor","Apple"],["type","mobile"]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
    /(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],["vendor","model",["type","mobile"]],[/\(bb10;\s(\w+)/i],["model",["vendor","BlackBerry"],["type","mobile"]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i],["model",["vendor","Asus"],["type","tablet"]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[["vendor","Sony"],["model","Xperia Tablet"],["type","tablet"]],[/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],[["vendor","Sony"],["model","Xperia Phone"],["type",
    "mobile"]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],["vendor","model",["type","console"]],[/android.+;\s(shield)\sbuild/i],["model",["vendor","Nvidia"],["type","console"]],[/(playstation\s[34portablevi]+)/i],["model",["vendor","Sony"],["type","console"]],[/(sprint\s(\w+))/i],[["vendor",b,{HTC:"APA",Sprint:"Sprint"}],["model",b,{"Evo Shift 4G":"7373KT"}],["type","mobile"]],[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],["vendor","model",["type","tablet"]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w+)*/i,
    /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],["vendor",["model",/_/g," "],["type","mobile"]],[/(nexus\s9)/i],["model",["vendor","HTC"],["type","tablet"]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],["model",["vendor","Microsoft"],["type","console"]],[/(kin\.[onetw]{3})/i],[["model",/\./g," "],["vendor","Microsoft"],["type","mobile"]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w+)*/i,/(XT\d{3,4}) build\//i,/(nexus\s[6])/i],
    ["model",["vendor","Motorola"],["type","mobile"]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],["model",["vendor","Motorola"],["type","tablet"]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[["vendor","Samsung"],"model",["type","tablet"]],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,/sec-((sgh\w+))/i],[["vendor","Samsung"],"model",["type","mobile"]],[/(samsung);smarttv/i],["vendor","model",["type","smarttv"]],
    [/\(dtv[\);].+(aquos)/i],["model",["vendor","Sharp"],["type","smarttv"]],[/sie-(\w+)*/i],["model",["vendor","Siemens"],["type","mobile"]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]+)*/i],[["vendor","Nokia"],"model",["type","mobile"]],[/android\s3\.[\s\w;-]{10}(a\d{3})/i],["model",["vendor","Acer"],["type","tablet"]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[["vendor","LG"],"model",["type","tablet"]],[/(lg) netcast\.tv/i],["vendor","model",["type","smarttv"]],[/(nexus\s[45])/i,
    /lg[e;\s\/-]+(\w+)*/i],["model",["vendor","LG"],["type","mobile"]],[/android.+(ideatab[a-z0-9\-\s]+)/i],["model",["vendor","Lenovo"],["type","tablet"]],[/linux;.+((jolla));/i],["vendor","model",["type","mobile"]],[/((pebble))app\/[\d\.]+\s/i],["vendor","model",["type","wearable"]],[/android.+;\s(glass)\s\d/i],["model",["vendor","Google"],["type","wearable"]],[/android.+(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i],
    [["model",/_/g," "],["vendor","Xiaomi"],["type","mobile"]],[/\s(tablet)[;\/\s]/i,/\s(mobile)[;\/\s]/i],[["type",e.lowerize],"vendor","model"]],engine:[[/windows.+\sedge\/([\w\.]+)/i],["version",["name","EdgeHTML"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],["name","version"],[/rv\:([\w\.]+).*(gecko)/i],["version","name"]],os:[[/microsoft\s(windows)\s(vista|xp)/i],["name","version"],
    [/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],["name",["version",b,c]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[["name","Windows"],["version",b,c]],[/\((bb)(10);/i],[["name","BlackBerry"],"version"],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,/linux;.+(sailfish);/i],["name","version"],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
    [["name","Symbian"],"version"],[/\((series40);/i],["name"],[/mozilla.+\(mobile;.+gecko.+firefox/i],[["name","Firefox OS"],"version"],[/(nintendo|playstation)\s([wids34portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],["name","version"],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[["name","Chromium OS"],
    "version"],[/(sunos)\s?([\w\.]+\d)*/i],[["name","Solaris"],"version"],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],["name","version"],[/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i],[["name","iOS"],["version",/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i,/(macintosh|mac(?=_powerpc)\s)/i],[["name","Mac OS"],["version",/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
    /(unix)\s?([\w\.]+)*/i],["name","version"]]},g=function(b,c){if(!(this instanceof g))return (new g(b,c)).getResult();var d=b||(f&&f.navigator&&f.navigator.userAgent?f.navigator.userAgent:""),n=c?e.extend(a,c):a;this.getBrowser=function(){var a=p.apply(this,n.browser);a.major=e.major(a.version);return a};this.getCPU=function(){return p.apply(this,n.cpu)};this.getDevice=function(){return p.apply(this,n.device)};this.getEngine=function(){return p.apply(this,n.engine)};this.getOS=function(){return p.apply(this,
    n.os)};this.getResult=function(){return {ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return d};this.setUA=function(a){d=a;return this};this.setUA(d);return this};g.VERSION="0.7.10";g.BROWSER={NAME:"name",MAJOR:"major",VERSION:"version"};g.CPU={ARCHITECTURE:"architecture"};g.DEVICE={MODEL:"model",VENDOR:"vendor",TYPE:"type",CONSOLE:"console",MOBILE:"mobile",SMARTTV:"smarttv",TABLET:"tablet",WEARABLE:"wearable",
    EMBEDDED:"embedded"};g.ENGINE={NAME:"name",VERSION:"version"};g.OS={NAME:"name",VERSION:"version"};(module.exports&&(exports=module.exports=g),exports.UAParser=g);var n=f.jQuery||f.Zepto;if("undefined"!==typeof n){var v=new g;n.ua=v.getResult();n.ua.get=function(){return v.getUA()};n.ua.set=function(a){v.setUA(a);a=v.getResult();for(var b in a)n.ua[b]=a[b];};}})("object"===
    typeof window?window:commonjsGlobal);
    });
    var client_min_1 = client_min.UAParser;

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
            return (c === 'x' ?
                r :
                (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    }

    var socket = createCommonjsModule(function (module) {
    (function() {
      /*
       * Socket Module to connect and handle Socket functionalities
       * @module Socket
       *
       * @param {Object} params
       */

      function Socket(params) {

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
              };

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
              };

              socket.socket.onclose = function(event) {
                onCloseHandler(event);
              };

              socket.socket.onerror = function(event) {
                eventCallback["error"](event);
              };
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
        };

        this.emit = sendData;

        this.connect = function() {
          connect();
        };

        this.close = function() {
          lastReceivedMessageTimeoutId && clearTimeout(lastReceivedMessageTimeoutId);
          lastSentMessageTimeoutId && clearTimeout(lastSentMessageTimeoutId);
          socket.socket.close();
        };

        init();
      }

      {
        module.exports = Socket;
      }

    })();
    });

    var utility = createCommonjsModule(function (module) {
    (function() {
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
          return (typeof commonjsGlobal !== "undefined" && ({}).toString.call(commonjsGlobal) === '[object global]');
        };

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

          if (typeof commonjsGlobal !== "undefined" && ({}).toString.call(commonjsGlobal) === '[object global]') {
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
        };

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
        };
      }

      {
        module.exports = Utility;
      }
    })();
    });

    var async = createCommonjsModule(function (module, exports) {
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
          PodUtility;

        if (typeof(commonjsRequire) !== "undefined" && 'object' !== "undefined") {
          PodSocketClass = socket;
          PodUtility = utility;
        } else {
          PodSocketClass = POD.Socket;
          PodUtility = POD.Utility;
        }

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
          socket$$1,
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
          registerServerTimeoutId,
          checkIfSocketHasOpennedTimeoutId,
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

            socket$$1 = new PodSocketClass({
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

            socket$$1.on("open", function() {
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

            socket$$1.on("message", function(msg) {
              handleSocketMessage(msg);
              if (onReceiveLogging) {
                asyncLogger("Receive", msg);
              }
            });

            socket$$1.on("close", function(event) {
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
                  socket$$1.connect();
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

            socket$$1.on("customError", function(error) {
              fireEvent("error", {
                errorCode: error.errorCode,
                errorMessage: error.errorMessage,
                errorEvent: error.errorEvent
              });
            });

            socket$$1.on("error", function(error) {
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
              };
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
              socket$$1.emit(msg);
            } else {
              pushSendDataQueue.push(msg);
            }
          },

          clearTimeouts = function() {
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
        };

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
            };
          }

          socketData.content.messageId = messageId;
          socketData.content.ttl = messageTtl;

          pushSendData(socketData);
        };

        this.getAsyncState = function() {
          return socketState;
        };

        this.getSendQueue = function() {
          return pushSendDataQueue;
        };

        this.getPeerId = function() {
          return peerId;
        };

        this.getServerName = function() {
          return serverName;
        };

        this.setServerName = function(newServerName) {
          serverName = newServerName;
        };

        this.setDeviceId = function(newDeviceId) {
          deviceId = newDeviceId;
        };

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

          socket$$1.close();
        };

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

          socket$$1.close();
        };

        this.reconnectSocket = function() {
          oldPeerId = peerId;
          isDeviceRegister = false;
          isSocketOpen = false;
          clearTimeouts();
          socket$$1.connect();
        };

        init();
      }

      {
        module.exports = Async;
      }
    })();
    });

    var bind = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };

    /*!
     * Determine if an object is a Buffer
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */

    // The _isBuffer check is for Safari 5-7 support, because it's missing
    // Object.prototype.constructor. Remove this eventually
    var isBuffer_1 = function (obj) {
      return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
    };

    function isBuffer (obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
    }

    // For Node v0.10 support. Remove this eventually.
    function isSlowBuffer (obj) {
      return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
    }

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

    var utils = {
      isArray: isArray,
      isArrayBuffer: isArrayBuffer,
      isBuffer: isBuffer_1,
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

    var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };

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
    var enhanceError = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      return error;
    };

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
    var createError = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     */
    var settle = function settle(resolve, reject, response) {
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
    var buildURL = function buildURL(url, params, paramsSerializer) {
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
    var parseHeaders = function parseHeaders(headers) {
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

    var isURLSameOrigin = (
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

    var btoa_1 = btoa;

    var cookies = (
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

    var btoa$1 = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || btoa_1;

    var xhr = function xhrAdapter(config) {
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
        if (process.env.NODE_ENV !== 'test' &&
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
          requestHeaders.Authorization = 'Basic ' + btoa$1(username + ':' + password);
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
          var cookies$$1 = cookies;

          // Add xsrf header
          var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
              cookies$$1.read(config.xsrfCookieName) :
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
        adapter = xhr;
      } else if (typeof process !== 'undefined') {
        // For node use HTTP adapter
        adapter = xhr;
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

    var defaults_1 = defaults;

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

    var InterceptorManager_1 = InterceptorManager;

    /**
     * Transform the data for a request or a response
     *
     * @param {Object|String} data The data to be transformed
     * @param {Array} headers The headers for the request or response
     * @param {Array|Function} fns A single function or Array of functions
     * @returns {*} The resulting transformed data
     */
    var transformData = function transformData(data, headers, fns) {
      /*eslint no-param-reassign:0*/
      utils.forEach(fns, function transform(fn) {
        data = fn(data, headers);
      });

      return data;
    };

    var isCancel = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */
    var isAbsoluteURL = function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     * @returns {string} The combined URL
     */
    var combineURLs = function combineURLs(baseURL, relativeURL) {
      return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
    };

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
    var dispatchRequest = function dispatchRequest(config) {
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

      var adapter = config.adapter || defaults_1.adapter;

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

    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     */
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager_1(),
        response: new InterceptorManager_1()
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

      config = utils.merge(defaults_1, {method: 'get'}, this.defaults, config);
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

    var Axios_1 = Axios;

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

    var Cancel_1 = Cancel;

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

        token.reason = new Cancel_1(message);
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

    var CancelToken_1 = CancelToken;

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
    var spread = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     * @return {Axios} A new instance of Axios
     */
    function createInstance(defaultConfig) {
      var context = new Axios_1(defaultConfig);
      var instance = bind(Axios_1.prototype.request, context);

      // Copy axios.prototype to instance
      utils.extend(instance, Axios_1.prototype, context);

      // Copy context to instance
      utils.extend(instance, context);

      return instance;
    }

    // Create the default instance to be exported
    var axios = createInstance(defaults_1);

    // Expose Axios class to allow class inheritance
    axios.Axios = Axios_1;

    // Factory for creating new instances
    axios.create = function create(instanceConfig) {
      return createInstance(utils.merge(defaults_1, instanceConfig));
    };

    // Expose Cancel & CancelToken
    axios.Cancel = Cancel_1;
    axios.CancelToken = CancelToken_1;
    axios.isCancel = isCancel;

    // Expose all/spread
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = spread;

    var axios_1 = axios;

    // Allow use of default import syntax in TypeScript
    var default_1 = axios;
    axios_1.default = default_1;

    var axios$1 = axios_1;

    var PodEventTypes = {
        CONNECT: "connect",
        DISCONNECT: "disconnect",
        RECONNECT: "reconnect",
        MESSAGE: "message",
        ASYNC_READY: "asyncReady",
        STATE_CHANGE: "stateChange",
        ERROR: "error"
    };
    var PodNotify = /** @class */ (function () {
        function PodNotify(config) {
            var _this = this;
            this._eventCallbacks = {
                connect: {},
                disconnect: {},
                reconnect: {},
                message: {},
                asyncReady: {},
                stateChange: {},
                error: {}
            };
            this._connected = false;
            this._fireEvent = function (eventName, param, ack) {
                try {
                    if (ack) {
                        for (var id in _this._eventCallbacks[eventName])
                            _this._eventCallbacks[eventName][id](param, ack);
                    }
                    else {
                        for (var id in _this._eventCallbacks[eventName])
                            _this._eventCallbacks[eventName][id](param);
                    }
                }
                catch (e) {
                    _this._fireEvent(PodEventTypes.ERROR, {
                        errorCode: 999,
                        errorMessage: "Unknown ERROR!",
                        errorEvent: e
                    });
                }
            };
            this.on = function (eventName, callback) {
                if (_this._eventCallbacks[eventName]) {
                    var id = generateUUID();
                    _this._eventCallbacks[eventName][id] = callback;
                    return id;
                }
                if (eventName === PodEventTypes.CONNECT && _this._connected) {
                    callback(_this._peerId);
                }
            };
            axios$1.get('https://geoip-db.com/json/').then(function (res) {
                _this._uniqueInfo.lat = res.data.latitude || null;
                _this._uniqueInfo.lng = res.data.longitude || null;
                _this._uniqueInfoString = JSON.stringify(_this._uniqueInfo);
            });
            // @ts-ignore
            this.Notify = new Notify(typeof window !== 'undefined' ? window : global);
            this.Config = config || {
                socketAddress: 'ws://172.16.110.235:8003/ws',
                token: '2233',
                serverName: 'mnot'
            };
            var client = new client_min();
            this._appId = localStorage.getItem('appId') || new Date().getTime().toString();
            this._deviceFingerPrint = localStorage.getItem('deviceId') || client.getFingerprint().toString();
            this.ClientUniques = {
                browser: client.getBrowser(),
                browserMajorVersion: client.getBrowserMajorVersion(),
                browserVersion: client.getBrowserVersion(),
                currentResolution: client.getCurrentResolution(),
                deviceId: this._deviceFingerPrint,
                deviceName: client.getDevice(),
                deviceType: client.getDeviceType(),
                deviceVendor: client.getDeviceVendor(),
                hasLocalStorage: client.isLocalStorage(),
                os: client.getOS(),
                osVersion: client.getOSVersion()
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
            this._async = new async(__assign({}, this.Config, { appId: this._appId, deviceId: this._deviceFingerPrint }));
            this._async.on(PodEventTypes.CONNECT, function (peerId) {
                _this._peerId = peerId;
                _this._connected = true;
                _this._fireEvent(PodEventTypes.CONNECT, _this._peerId);
            });
            this._async.on(PodEventTypes.DISCONNECT, function (param, ack) {
                _this._peerId = undefined;
                _this._connected = false;
                _this._fireEvent(PodEventTypes.DISCONNECT, param, ack);
            });
            this._async.on(PodEventTypes.ERROR, function (param, ack) {
                _this._fireEvent(PodEventTypes.ERROR, param, ack);
            });
            this._async.on(PodEventTypes.ASYNC_READY, function (param, ack) {
                _this._async.send({
                    type: 4,
                    content: {
                        peerName: _this.Config.serverName,
                        content: JSON.stringify({
                            serviceName: "SetStatusPush",
                            messageType: 547,
                            content: JSON.stringify({
                                type: 0,
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
            this._async.on(PodEventTypes.MESSAGE, function (param, ack) {
                try {
                    var content = JSON.parse(param.content);
                    if (content.messageType === 545) {
                        var contentChild = JSON.parse(content.content);
                        if (contentChild.messageId && contentChild.senderId) {
                            _this._async.send({
                                type: 4,
                                content: {
                                    peerName: "mnot",
                                    content: JSON.stringify({
                                        serviceName: "SetStatusPush",
                                        messageType: 547,
                                        content: JSON.stringify({
                                            type: 1,
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
                            if (_this.Config.handlePushNotification) {
                                _this.Notify.create(contentChild.title, {
                                    body: contentChild.text,
                                    title: contentChild.title
                                });
                            }
                        }
                    }
                }
                catch (_) { }
                _this._fireEvent(PodEventTypes.MESSAGE, param, ack);
            });
            this._async.on(PodEventTypes.STATE_CHANGE, function (param, ack) {
                _this._fireEvent(PodEventTypes.STATE_CHANGE, param, ack);
            });
        }
        return PodNotify;
    }());

    return PodNotify;

}));
//# sourceMappingURL=pod-notify.js.map
