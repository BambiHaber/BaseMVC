const fs = require("fs-extra");
const path = require('path');

const copyExamples = () => {
    let success;
    try {
        success = fs.copySync(path.resolve(process.cwd() + '/src/js/examples'), path.resolve(process.cwd() + '/examples'));
        success = true;
    } catch (err) {
        success = false
        console.error(err)
    } finally {
        console.log("File copy success: ", success)
    }
    return success;
};

module.exports.copyExamples = copyExamples;
