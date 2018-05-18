const cleanDir = require('./cleanDir').cleanDir;
const rollupBundle = require('./rollupBundle').rollupBundle;
const bundlesConfig = require('./bundlesConfig').bundlesConfig;
const copyExamples = require('./copyExamples').copyExamples;

let buildMethods = {
	cleanDirs: ['lib', 'dist', 'examples'].map(cleanDir),
	rollupBundles: bundlesConfig.map(rollupBundle),
	copyExamples: copyExamples

};


module.exports.buildMethods = buildMethods;
