const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const uglify = require("rollup-plugin-uglify").uglify;

const bundlesConfig = [
    /**
     * Node package in the 'lib' directory
     */
    {
        input: {
            input: './src/js/index.js', plugins: [
                resolve({
                    mainFields: ["browser"],
                    preferBuiltins: false
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
                    preferBuiltins: false
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
                    mainFields: ["browser"],
                    preferBuiltins: false
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
