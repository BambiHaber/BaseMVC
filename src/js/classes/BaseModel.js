import {Base} from './Base.js';

export class BaseModel {
	 //defaults = {};
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

	get hasDefaults() {
		return (this.constructor.defaults && typeof this.constructor.defaults === "object");
	}


	get defaults() {
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
