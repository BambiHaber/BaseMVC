import EventEmitter from 'event-emitter-es6/dist/event-emitter';
import {SwissKnife} from "./SwissKnife";

export class BaseCollection extends EventEmitter {
	constructor(data, options) {
		super();

		/**
		 * We have options
		 */
		if (options && !Array.isArray(options)) {

		}
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
				targetModel = new this.modelClass(jsonModel)
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
		this.models
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
