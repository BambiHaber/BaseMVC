const buildMethods = require('./build/buildMethods').buildMethods;

Promise.all(buildMethods.cleanDirs)
.then(()=>{
	Promise.all(buildMethods.rollupBundles)
		.then(buildMethods.copyExamples)
});
