const rimraf = require("rimraf");

const cleanDir = async (dirName) => new Promise(r => rimraf(dirName, () => {
	r(`--- Cleaned directory ${dirName}`)
}));

module.exports.cleanDir = cleanDir;
