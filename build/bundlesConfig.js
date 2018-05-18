const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const uglify = require("rollup-plugin-uglify");

const bundlesConfig = [
	/**
	 * Node package in the 'lib' directory
	 */
	{
		input: {
			input: './src/js/index.js', plugins: [
				resolve({
					browser: true,
					preferBuiltins: false,
					jsnext: true,
					main: true,
				}),
				commonjs({})
			]
		},
		output: {
			file: 'lib/index.js',
			format: 'umd',
			sourceMap: 'inline',
			name: 'BaseMVC'
		},

	},
	{
		/**
		 * Minified version for the dist directory
		 */
		input: {
			input: './src/js/index.js', plugins: [
				resolve({
					browser: true,
					preferBuiltins: false,
					jsnext: true,
					main: true,
				}),
				commonjs({}),
				uglify({})
			]
		},
		output: {
			file: 'dist/bambis-BaseMVC.js',
			format: 'umd',
			sourceMap: 'inline',
			name: 'BaseMVC'
		}
	},
	{
		/**
		 * IIFE version
		 */
		input: {
			input: './src/js/index.js', plugins: [
				resolve({
					browser: true,
					preferBuiltins: false,
					jsnext: true,
					main: true,
				}),
				commonjs({}),
/*
				uglify({})
*/
			]
		},
		output: {
			file: 'dist/bambis-BaseMVC.standalone.js',
			format: 'es',
			sourceMap: 'inline'
		}
	}
];

module.exports.bundlesConfig = bundlesConfig;
