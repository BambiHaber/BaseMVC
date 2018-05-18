const opn = require('opn');
const LightServer = require('./LightServer.js').LightServer;
const port = 3003;

let lightServer = new LightServer({
	entry: 'html/index.html',
	port: port
});

lightServer.createServer();

opn('http://localhost:3003/');
