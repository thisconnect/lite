var http = require('http'),
	connect = require('connect'),
	planet = require('planet').Planet;

var app = connect()
	//.use('/instruments', connect.static(__dirname + '/../abslib'))
	.use(connect.static(__dirname))
	.use(connect.favicon('./favicon.ico'));

var server = http.createServer(app).listen(8004);

new planet(server).listen();
