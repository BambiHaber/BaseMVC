export class SwissKnife {
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
