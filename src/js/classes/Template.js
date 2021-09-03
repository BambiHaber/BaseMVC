export class Template {

	//Todo: enable customization of the token wrappers.. wouldnt work now because of interpolation detection of '=' sign,
	//also move the constants outside. maybe this should be parsed with a stage 2+ babel plugin.
	 static _newRegex(rgxStr = '(<%=?(.*)?%>)', flags = 'gm') {
		return new RegExp(rgxStr, flags);
	}

	/**
	 * Compile accepts a string which may contain evaluation <% %> or interpolation <%= %> tokens.
	 * it Returns a template function which accepts an optional data object which will be bound to the context,
	 * and will return a rendered string once invoked.
	 *
	 *
	 * DISCLAIMER: this is all very beginning, and right now focused on readability to understand how things work/will work
	 *
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
			})
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
				if (result['result'][2] === '=') { // TODO: change this check to reflecg a regex group
					functionText += "str = str + " + result['strippedResult'] + ";\n";
				} else {
					functionText += result['strippedResult'] + '\n';
				}
			}
		});

		/**
		 * Todo: implement caching for reusability and change += coercion operators to array.push.join for performance optimization
		 * @type {string}
		 */

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
