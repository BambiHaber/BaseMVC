import {Template} from "./Template";
import EventEmitter from 'event-emitter-es6/dist/event-emitter';

export class BaseView extends EventEmitter {
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
