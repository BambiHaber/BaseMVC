import {Base} from './Base.js';

/**
 * TODO: implement result types, and render of a result type to container, or method to bind a result to a component
 */
export class BaseController extends EventEmitter {
	constructor(options) {
		super();

		this._model = options['model'];
		this._view = options['view'];
	}

	render() {

	}

	result() {

	}

}
