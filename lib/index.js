(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.BaseMVC = {})));
}(this, (function (exports) { 'use strict';

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var eventEmitter = createCommonjsModule(function (module, exports) {
	(function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND", f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_VALUES = {
	    emitDelay: 10,
	    strictMode: false
	};

	/**
	 * @typedef {object} EventEmitterListenerFunc
	 * @property {boolean} once
	 * @property {function} fn
	 */

	/**
	 * @class EventEmitter
	 *
	 * @private
	 * @property {Object.<string, EventEmitterListenerFunc[]>} _listeners
	 * @property {string[]} events
	 */

	var EventEmitter = function () {

	    /**
	     * @constructor
	     * @param {{}}      [opts]
	     * @param {number}  [opts.emitDelay = 10] - Number in ms. Specifies whether emit will be sync or async. By default - 10ms. If 0 - fires sync
	     * @param {boolean} [opts.strictMode = false] - is true, Emitter throws error on emit error with no listeners
	     */

	    function EventEmitter() {
	        var opts = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_VALUES : arguments[0];

	        _classCallCheck(this, EventEmitter);

	        var emitDelay = void 0,
	            strictMode = void 0;

	        if (opts.hasOwnProperty('emitDelay')) {
	            emitDelay = opts.emitDelay;
	        } else {
	            emitDelay = DEFAULT_VALUES.emitDelay;
	        }
	        this._emitDelay = emitDelay;

	        if (opts.hasOwnProperty('strictMode')) {
	            strictMode = opts.strictMode;
	        } else {
	            strictMode = DEFAULT_VALUES.strictMode;
	        }
	        this._strictMode = strictMode;

	        this._listeners = {};
	        this.events = [];
	    }

	    /**
	     * @protected
	     * @param {string} type
	     * @param {function} listener
	     * @param {boolean} [once = false]
	     */


	    _createClass(EventEmitter, [{
	        key: '_addListenner',
	        value: function _addListenner(type, listener, once) {
	            if (typeof listener !== 'function') {
	                throw TypeError('listener must be a function');
	            }

	            if (this.events.indexOf(type) === -1) {
	                this._listeners[type] = [{
	                    once: once,
	                    fn: listener
	                }];
	                this.events.push(type);
	            } else {
	                this._listeners[type].push({
	                    once: once,
	                    fn: listener
	                });
	            }
	        }

	        /**
	         * Subscribes on event type specified function
	         * @param {string} type
	         * @param {function} listener
	         */

	    }, {
	        key: 'on',
	        value: function on(type, listener) {
	            this._addListenner(type, listener, false);
	        }

	        /**
	         * Subscribes on event type specified function to fire only once
	         * @param {string} type
	         * @param {function} listener
	         */

	    }, {
	        key: 'once',
	        value: function once(type, listener) {
	            this._addListenner(type, listener, true);
	        }

	        /**
	         * Removes event with specified type. If specified listenerFunc - deletes only one listener of specified type
	         * @param {string} eventType
	         * @param {function} [listenerFunc]
	         */

	    }, {
	        key: 'off',
	        value: function off(eventType, listenerFunc) {
	            var _this = this;

	            var typeIndex = this.events.indexOf(eventType);
	            var hasType = eventType && typeIndex !== -1;

	            if (hasType) {
	                if (!listenerFunc) {
	                    delete this._listeners[eventType];
	                    this.events.splice(typeIndex, 1);
	                } else {
	                    (function () {
	                        var removedEvents = [];
	                        var typeListeners = _this._listeners[eventType];

	                        typeListeners.forEach(
	                        /**
	                         * @param {EventEmitterListenerFunc} fn
	                         * @param {number} idx
	                         */
	                        function (fn, idx) {
	                            if (fn.fn === listenerFunc) {
	                                removedEvents.unshift(idx);
	                            }
	                        });

	                        removedEvents.forEach(function (idx) {
	                            typeListeners.splice(idx, 1);
	                        });

	                        if (!typeListeners.length) {
	                            _this.events.splice(typeIndex, 1);
	                            delete _this._listeners[eventType];
	                        }
	                    })();
	                }
	            }
	        }

	        /**
	         * Applies arguments to specified event type
	         * @param {string} eventType
	         * @param {*[]} eventArguments
	         * @protected
	         */

	    }, {
	        key: '_applyEvents',
	        value: function _applyEvents(eventType, eventArguments) {
	            var typeListeners = this._listeners[eventType];

	            if (!typeListeners || !typeListeners.length) {
	                if (this._strictMode) {
	                    throw 'No listeners specified for event: ' + eventType;
	                } else {
	                    return;
	                }
	            }

	            var removableListeners = [];
	            typeListeners.forEach(function (eeListener, idx) {
	                eeListener.fn.apply(null, eventArguments);
	                if (eeListener.once) {
	                    removableListeners.unshift(idx);
	                }
	            });

	            removableListeners.forEach(function (idx) {
	                typeListeners.splice(idx, 1);
	            });
	        }

	        /**
	         * Emits event with specified type and params.
	         * @param {string} type
	         * @param eventArgs
	         */

	    }, {
	        key: 'emit',
	        value: function emit(type) {
	            var _this2 = this;

	            for (var _len = arguments.length, eventArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                eventArgs[_key - 1] = arguments[_key];
	            }

	            if (this._emitDelay) {
	                setTimeout(function () {
	                    _this2._applyEvents.call(_this2, type, eventArgs);
	                }, this._emitDelay);
	            } else {
	                this._applyEvents(type, eventArgs);
	            }
	        }

	        /**
	         * Emits event with specified type and params synchronously.
	         * @param {string} type
	         * @param eventArgs
	         */

	    }, {
	        key: 'emitSync',
	        value: function emitSync(type) {
	            for (var _len2 = arguments.length, eventArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                eventArgs[_key2 - 1] = arguments[_key2];
	            }

	            this._applyEvents(type, eventArgs);
	        }

	        /**
	         * Destroys EventEmitter
	         */

	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this._listeners = {};
	            this.events = [];
	        }
	    }]);

	    return EventEmitter;
	}();

	module.exports = EventEmitter;

	},{}]},{},[1])(1)
	});
	});

	class SwissKnife {
		static size(obj) {
			let result = 0;
			if (obj !== null) {
				result = Array.isArray(obj) ? obj.length : Object.keys(obj).length;
			}
			return result;
		};

		static isFunction(obj) {
			return !!(obj && obj.constructor && obj.call && obj.apply);
		}

		static first() {

		}
	}

	class BaseCollection extends eventEmitter {
		constructor(data, options) {
			super();
			this.options = options || {};

			this.url = this.options['url'];

			this.modelOptions = this.options['modelOptions'];
			this.modelClass = this.constructor.model || this.options['model'];
			this.models = [];

			if (data && Array.isArray(data) && SwissKnife.size(data) > 0) {
				this.reset(data);
			}
			this.comparator = options && options['comparator'];
		}

		get rawData() {
			return this._data;
		}

		set rawData(val) {
			this._data = val;
		}

		add(jsonModel = {}, atStart = false) {
			if (this.modelClass) {
				let targetModel;
				let method = atStart ? 'unshift' : 'push';

				if (this.modelOptions) {
					targetModel = new this.modelClass(jsonModel, this.modelOptions);
				} else {
					targetModel = new this.modelClass(jsonModel);
				}
				this.models[method](targetModel);

				this.emit('add:end', targetModel);
				return this;
			} else {
				throw 'NO_MODEL_CLASS_DEFINED_FOR_COLLECTION'
			}
		}

		/**
		 * Works with modelClass
		 * @param predicate
		 */
		remove(predicate) {
			this.models;
		}

		find(predicate) {
			let result = this.toJSON().find(predicate);

			this.emit('find', result);
			return result;
		}

		where(predicate) {
			let result = this.toJSON().filter(predicate);

			this.emit('where', result);
			return result;
		}

		filter(predicate) {
			let result = this.where(predicate);
			this.emit('filter', result);
			return result;
		}

		get modelType() {
			return (this.modelClass && this.modelClass.constructor && this.modelClass.constructor.name) || 'Object';
		}

		reset(data) {
			this.models.length = 0;
			this.emit('reset', data);

			if (this.modelClass) {
				data.forEach((jsonModel) => {
					if (this.modelOptions) {
						this.models.push(new this.modelClass(jsonModel, this.modelOptions));
					} else {
						this.models.push(new this.modelClass(jsonModel));
					}
				});
				this.emit('reset:end', this.models);
				return this;
			} else {
				throw 'NO_MODEL_CLASS_DEFINED_FOR_COLLECTION'
			}
		}

		toJSON() {
			let result = [];
			this.models.forEach((model) => {
				result.push(model && model.toJSON());
			});

			if (this.comparator) {
				result = result.sort(this.comparator);
			}
			return result;
		}

		forEach(callback) {
			let result = this.models;

			if (this.comparator) {
				if (SwissKnife.isFunction(this.comparator)) {
					//todo: test this method
					result = result.sort((a) => {
						return this.comparator(a.toJSON())
					});
				}
				else {
					result = result.sort((a) => {
						return a.toJSON()[this.comparator]
					});
				}
			}

			result.forEach(function (model) {
				callback(model);
			});
		}

		get size() {
			return this.models.length;
		}
	}

	class Template {

		//Todo: enable customization of the token wrappers.. wouldnt work now because of interpolation detection of '=' sign
		static _newRegex(rgxStr = '(<%=?(.*)?%>)', flags = 'gm') {
			return new RegExp(rgxStr, flags);
		}


		/**
		 * Returns a template function which accepts an optional data object, and will return a rendered string.
		 * @param str
		 * @returns {Function}
		 */
		static compile(str = '') {
			let regex = this._newRegex();
			let stringLength = str.length;

			let targetFunctionArr = [];
			let cursor = 0;

			let regexResults;

			let functionText = [];

			while ((regexResults = regex.exec(str)) !== null) {

				targetFunctionArr.push({
					portion: str.substring(cursor, regexResults.index),
					cursor: cursor,
					result: regexResults[0],
					strippedResult: regexResults[2],
					next: regex.lastIndex
				});

				cursor = regex.lastIndex;
			}
			//TODO: Is right? should maintain readability but be recursive
			if (regexResults === null) {
				targetFunctionArr.push({
					//TODO: Ugly, make it reasonable
					portion: str.substring(targetFunctionArr[targetFunctionArr.length - 1] && targetFunctionArr[targetFunctionArr.length - 1].next || 0, stringLength)
				});
			}

			/**
			 * Construct function
			 */
			functionText.push("var str = '';\n");
			targetFunctionArr.forEach((result) => {
				/**
				 * Normal text? we add it to the string.
				 */
				if (result['portion']) {
					functionText += 'str = str + `' + result['portion'] + '`;\n';
				}

				/**
				 * Token? We need to execute it according in conjunction with the potential data object
				 */
				if (result['result']) {
					//Is it interpolation? else a function;
					//TODO: Create an interpolation object.. so we can change token wrappers
					if (result['result'][2] === '=') {
						functionText += "str = str + " + result['strippedResult'] + ";\n";
					} else {
						functionText += result['strippedResult'] + '\n';
					}
				}
			});

			functionText += '\nreturn str;';
			return new Function(functionText);

		}

		/**
		 * Returns a a rendered string after compiling the template and executing it with the data
		 * @param templateString
		 * @param data
		 * @returns {String}
		 */
		static render(templateString, data = {}) {
			return this.compile(templateString).bind(data)();
		}
	}

	class BaseView extends eventEmitter {
		constructor(options = {}) {
			super();
			this.options = options;
			this.model = this.options['model'] ? this.options.model : null;
			this.template = this.options['template'] ? this.options['template'] : null;
			this.el = this.options['el'] || document.querySelector('body');
		}


		get model() {
			return this._model;
		}

		set model(val) {
			this._model = val;
		}

		get template() {
			return this._template;
		}

		set template(val) {
			this._template = val;
		}

		render(data) {
			if (!data) {
				data = (this.model['toJSON']) ? this.model.toJSON() : this.model;
			}

			let tplResult = Template.render(this.template || this.constructor.template, data);
			this.el.innerHTML = tplResult;
		}
	}

	class BaseModel {
		constructor(data, options = {}) {
			this.options = options;
			this.defaults = options.defaults || {};
			this.disableAttributesExtension = this.options['disableAttributesExtension'];
			this.noExceptions = this.options['noExceptions'];

			this._allowOnlyAuthorizedKeys = this.disableAttributesExtension && this.hasDefaults();

			this.attributes = this.hasDefaults() ? this.getDefaults() : {};

			if (data) {
				Object.keys(data).forEach((key) => {
					this.set(key, data[key]);
				});
			}
		}

		hasDefaults() {
			return (this.constructor.defaults && typeof this.constructor.defaults === "object");
		}


		getDefaults() {
			return this.constructor.defaults;
		}

		set(key, value) {
			if (this._allowOnlyAuthorizedKeys) {
				var defaultValuesObject = this.getDefaults();
				var allowedProperties = Object.keys(defaultValuesObject);


				if ((typeof key === 'object') && (typeof value === 'undefined')) {

				} else if (allowedProperties.includes(key)) {
					console.log(this.attributes);
					this._set(key, value);
				} else {
					if (!this.noExceptions) {
						throw 'Allow only authorized keys is enabled. '
					}
				}

			} else {
				this._set(key, value);
			}
		}

		_set(key, value) {
			if ((typeof key === 'object') && (!Array.isArray(key)) && (typeof value === 'undefined')) {
				Object.keys(key).forEach((pojoKey) => {
					this.attributes[pojoKey] = key[pojoKey];
				});
			} else {
				this.attributes[key] = value;
			}
		}

		get(key) {
			return this.attributes[key];
		}

		toJSON() {
			return this.attributes;
		}
	}

	exports.SwissKnife = SwissKnife;
	exports.Template = Template;
	exports.BaseModel = BaseModel;
	exports.BaseCollection = BaseCollection;
	exports.BaseView = BaseView;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
