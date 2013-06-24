new Unit({

	element: new Element('div.state'),

	readySetup: function(){
		this.element.inject(document.body);
		this.subscribe({
			'socket connect': this.setup,
			'system connect': this.connect,
			'state connect': this.ready,
			'state set': this.set,
			'state remove': this.remove,
			'state merge': this.merge
		});
	},

	io: null,

	state: null,

	setup: function(socket){
		this.io = socket;
	},

	connect: function(){
		var state = this.state = this.io.of('/state');
		state.on('set', this.onSet.bind(this));
		state.on('remove', this.onRemove.bind(this));
		state.on('merge', this.onMerge.bind(this));
		state.once('connect', this.publish.bind(this, 'state connect', state));
	},

	ready: function(state){
		var that = this;
		state.emit('get', function(data){
	//		that.pre.set('text', 'state: ' + JSON.stringify(data, null, '\r\t'));
		});
	},

	set: function(path, value){
		this.state.emit('set', path, value);
	},

	remove: function(key){
		this.state.emit('remove', key);
	},

	merge: function(data){
		this.state.emit('merge', data);
	},

	onSet: function(key, value){
		// console.log('onSet', key, value);
	},

	onRemove: function(key){
		// console.log('onRemove', key);
	},

	onMerge: function(data){
		// console.log('onMerge', data);
	}

});
