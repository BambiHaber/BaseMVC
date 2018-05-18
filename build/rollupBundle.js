const rollup = require("rollup");

const rollupBundle = async (bundle) => {
	let bundleObject = await rollup.rollup(bundle.input);
	await bundleObject.write(bundle.output);
};

module.exports.rollupBundle = rollupBundle;
