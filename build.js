const buildMethods = require('./build/buildMethods').buildMethods;

Promise.all(buildMethods.cleanDirs)
.then(()=>{
	Promise.all(buildMethods.rollupBundles)
		.then(buildMethods.copyExamples)
		.then(()=>{
			console.log(`\x1b[5m
			𝔹𝕦𝕚𝕝𝕕 ℂ𝕠𝕞𝕡𝕝𝕖𝕥𝕖𝕕
			`)
		})
});
