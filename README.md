Satellite
=========

Setup
-----

	git submodule update --init --recursive


Run (python)
------------

	python -m SimpleHTTPServer 8004

Browse to http://localhost:8004/


Setup (node.js)
---------------

	npm install connect
	npm install planet


Run (node.js)
-------------

	node server.node.js


Build styles
------------

	lessc --compress --include-path="support/bootstrap/less/" styles/bootstrap.less > styles/bootstrap-min.css
