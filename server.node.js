var http    = require('http'),
	connect = require('connect'),
	io      = require('socket.io'),
	planet  = require('planet');


var app = connect()
	//.use('/instruments', connect.static(__dirname + '/../abslib'))
	.use(connect.static(__dirname))
	.use(connect.favicon('./favicon.ico'));

var server = http.createServer(app);

var socket = io.listen(server, {
	'transports': ['websocket'],
	'flash policy server': false,
	'log level': 1//,
	//'browser client': false,
	//'browser client cache': true,
	//'browser client minification': true,
	//'browser client gzip': true
});

var local = planet(socket, {});

server.listen(8004, 'localhost');
