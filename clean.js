const buildMethods = require('./build/buildMethods').buildMethods;

Promise.all(buildMethods.cleanDirs).then(()=>{
	console.log('--- Clean finished');
});
