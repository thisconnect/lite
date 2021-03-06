/* global Widget */

new Unit({

	bound: {},

	initSetup: function(){
		this.subscribe({
			'socket connect': this.connect
			, 'socket disconnect': this.disconnect
			, 'schema ready': this.setSchema
		});
		this.bound = {
			'onGet': this.onGet.bind(this)
			, 'onSet': this.onSet.bind(this)
			, 'onMerge': this.onMerge.bind(this)
			, 'onRemove': this.onRemove.bind(this)
		};
	},

	element: new Element('main'),

	readySetup: function(){
		this.element.inject(document.body);
	},

	schema: null,

	setSchema: function(schema){
		this.schema = schema;
		//Object.freeze(schema);
		this.then();
	},

	io: null,

	connect: function(socket){
		(this.io = socket)
			.on('set', this.bound.onSet)
			.on('merge', this.bound.onMerge)
			.on('remove', this.bound.onRemove);

		this.bound.set = socket.emit.bind(socket, 'set');
		this.bound.merge = socket.emit.bind(socket, 'merge');
		this.then();
	},

	disconnect: function(){
		this.io
			.removeListener('set', this.bound.onSet)
			.removeListener('merge', this.bound.onMerge)
			.removeListener('remove', this.bound.onRemove);

		this.io = this.schema = null;
	},

	then: function(){
		if (!!this.io && !!this.schema){
			this.io.emit('get', this.bound.onGet);
		}
	},

	set: function(path, value){
		this.io.emit('set', path, value);
	},

	get: function(path, callback){
		this.io.emit('get', path, callback);
	},

	remove: function(key){
		this.io.emit('remove', key);
	},

	merge: function(data){
		this.io.emit('merge', data);
	},

	onGet: function(data){

		for (var widget in data){
			console.log('====', widget, [data[widget]]);
			// if (Array.isArray(data[widget])) console.log('onGet', widget, data[widget]);
			this.publish('state ' + widget + ' delete');
			this.addWidget('state', widget);
			this.publish('state ' + widget + ' build', [data[widget]]);
			this.publish('state ' + widget + ' merge', [data[widget]]);
		}
	},

	onSet: function(key, value){
		if (typeof key == 'string'){
			this.addWidget('state', key);
			this.publish('state ' + key + ' build', value);
			this.publish('state ' + key + ' merge', value);
		} else {
			this.publish('state ' + key[0] + ' set', [key.slice(1), value]);
		}
	},

	onRemove: function(widget){
		if (typeof widget == 'string'){
			this.publish('state ' + widget + ' delete');
		} else {
			console.log('OMG OMG OMG OMG OMG onRemove', widget);
		}
	},

	onMerge: function(data){
		for (var widget in data){
			this.publish('state ' + widget + ' build', data[widget]);
			this.publish('state ' + widget + ' merge', data[widget]);
		}
	},

	addWidget: function(context, name){
		var widget = new Widget(name, this.schema),
			build = widget.build.bind(widget, {
				'schema': this.schema[name] || {}//,
				//'definitions': this.schema.definitions
			}),
			unsubscribe = this.unsubscribe.bind(this),
			id = context + ' ' + name;

		function set(path, value){
			var parent = path.slice(0),
				key = parent.pop();

			widget.fireEvent(parent.join(' '), {'key': key, 'value': value});

			widget.fireEvent(path.join(' '), value);
		}

		function merge(values, path){
			if (typeof values != 'object') console.log(id, values);
			else for (var key in values){
				if (!values.hasOwnProperty(key)) continue;

				var keys = (path || []).concat(key);
				if (typeof values[key] == 'object'){
					merge(values[key], keys);
				} else {
					widget.fireEvent(keys.join(' '), values[key]);
				}
			}
		}

		function destroy(){
			unsubscribe(id + ' build', build);
			unsubscribe(id + ' set', set);
			unsubscribe(id + ' merge', merge);
			unsubscribe(id + ' delete', destroy);
			widget.fireEvent('destroy');
		}

		widget.addEvent('change', this.bound.set);
		widget.addEvent('set', this.bound.set);
		widget.addEvent('merge', this.bound.merge);
		widget.addEvent('remove', this.remove.bind(this, name));

		this.subscribe(id + ' build', build);
		this.subscribe(id + ' set', set);
		this.subscribe(id + ' merge', merge);
		this.subscribe(id + ' delete', destroy);

		widget.attach(this.element);

	}

});
