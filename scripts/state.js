new Unit({

	bound: {},

	initSetup: function(){
		this.subscribe({
			'socket connect': this.setup,
			'types connect': this.setTypes,
			'state set': this.set,
			'state merge': this.merge,
			'state remove': this.remove,
			'state add': this.add
		});
		this.bound = {
			'onSet': this.onSet.bind(this),
			'onMerge': this.onMerge.bind(this),
			'onRemove': this.onRemove.bind(this),
			'create': this.create.bind(this)
		};
	},

	element: new Element('div.state'),

	readySetup: function(){
		this.element.inject(document.body);
	},

	io: null,

	types: null,

	setup: function(socket){
		(this.io = socket)
		.on('set', this.bound.onSet)
		.on('merge', this.bound.onMerge)
		.on('remove', this.bound.onRemove);
	},

	setTypes: function(types){
		this.types = types;
		this.io.emit('get', this.bound.create)
	},

	create: function(data){
		for (var widget in data){
			if (!(widget in this.types)){
				this.publish('log', 'widget [' + widget + '] missing in this.types');
				continue;
			}
			this.publish('state ' + widget + ' delete');
			this.publish('widget create', ['state', widget, this.types[widget]]);
			this.publish('state ' + widget + ' merge', [data[widget]]);
		}
	},

	add: function(widget){
		widget.attach(this.element);
	},

	set: function(path, value){
		this.io.emit('set', path, value);
	},

	remove: function(key){
		this.io.emit('remove', key);
	},

	merge: function(data){
		this.io.emit('merge', data);
	},

	onSet: function(key, value){
		console.log('onSet:::::::::', key, value);
	},

	onRemove: function(key){
		console.log('onRemove:::::::::', key);
	},

	onMerge: function(data){
		for (var widget in data){
			this.publish('state ' + widget + ' update', data[widget]);
		}
	}

});
