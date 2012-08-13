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


Build MooTools
--------------

	./support/mootools-core/Packager/packager register ./support/mootools-core
	./support/mootools-core/Packager/packager build Core/Class.Extras Core/DOMReady Core/Element.Delegation Core/Element.Dimensions Core/Request Core/Fx.Tween Core/Fx.Morph Core/Fx.Transitions More/Drag/Slider -blocks 1.2compat 1.3compat ltFF4 IE ltIE8 ltIE9 '!ES5' '!ES5-bind' CommonJS > support/mootools.js
	uglifyjs support/mootools.js > support/mootools-ugly.js
