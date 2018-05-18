const fs = require('fs');
const process = require('process');
const path = require('path');
const util = require('util');
const {exec} = require('child_process');
global.watchers = [];

/**
 * TODO: Implement this, not yet finished, maybe nodemon? or switch to a designated tool
 */


process.on('exit', (code) => {
	global.watchers.forEach((watcherObj) => {
		watcherObj.close();
	});
	console.log('Ended with code ' + code);
});

const getAllFiles = dir =>
	fs.readdirSync(dir).reduce((files, file) => {
		const name = path.join(dir, file);
		const isDirectory = fs.statSync(name).isDirectory();
		return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
	}, []);

let fls = getAllFiles(process.cwd() + '/src/js');


const restart = () => {

	global.watchers.forEach((watcherObj) => {
		watcherObj.close();
	});

	let cmd = 'ps -ef | grep node | grep browser | awk \'{ print $2 }\'';

	exec(cmd, (err, stdout, stderr) => {
		if (err) {
			console.log('cant grep node browser process');
			return;
		}

		let pidNum = stdout.trim();
		exec('kill ' + pidNum, (err, stdout, stderr) => {
			if (err) {
				console.log('cant kill node server process');
				return;

			}

			exec('npm run build && npm run browserDemo', (err, stdout, stderr) => {
				if (err) {
					console.log('cant run build and demo');
					return;
				}
			});
		})
	});
};


fls.forEach((filePath) => {
	let watcherObj = fs.watch(filePath, {encoding: 'buffer'}, (eventType, filename) => {
		if (filename) {
			if (eventType === 'change') {
				restart();
			}
		}
	});

	global.watchers.push(watcherObj);
});

exec('npm run build && npm run browserDemo', (err, stdout, stderr) => {
	if (err) {
		console.log('cant run build and demo');
		return;
	}
});
