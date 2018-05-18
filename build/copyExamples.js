const fs = require("fs-extra");
const path = require('path');

const copyExamples = () => {
	let success = fs.copySync(path.resolve(process.cwd() + '/src/js/examples'), path.resolve(process.cwd() + '/examples'));
	console.log(success);
};

module.exports.copyExamples = copyExamples;
