Satellite
=========

Setup
-----

	git submodule update --init --recursive


Run (node)
----------

	var connect = require('connect'),
		http = require('http');
	
	var app = connect()
		.use(connect.static(__dirname + '/satellite'))
		.use(connect.favicon('./favicon.ico'));
	
	http.createServer(app).listen(8004);


Run (python)
------------

	python -m SimpleHTTPServer 8004

Browse to http://localhost:8004/
