/* global Controller */

Controller.collection = new Class({

	Extends: Controller,

	initialize: function(key, data, widget){
		var path = data.path.concat(key),
			schema = data.schema || {};

		this.setup(key, data, widget);

		var outer = new Element('div.collection').inject(this.element),
			table = new Element('table').inject(outer),
			thead = new Element('thead').inject(table);

		(schema.headings || Object.keys(data.value[0]))
			.forEach(function(key){
				new Element('th', {'text': key}).inject(thead);
			});

		widget.build({
			'schema': schema,
			'element': new Element('tbody').inject(table),
			'path': path,
			'collection': true
		}, data.value);

		//this.attach(data.element);
	},

	setup: function(key, data, widget){
		var schema = data.schema || {};
		this.element = data.element;

		if (!!schema.title) new Element('h2.title', {
			'text': schema.title
		}).inject(this.element);

		this.create(key, data, widget);
	}

});
