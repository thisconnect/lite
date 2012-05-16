new Unit({

	initSetup: function(){
		this.subscribe({
			'widget update': this.update,
			'widget remove': this.remove,
			'put': this.put
		});
	},

	readySetup: function(){
		var socket = this.socket = io.connect('http://localhost:8999');
		socket.on('connect', this.onConnect.bind(this));
		socket.on('initial state', this.onPut.bind(this));
		socket.on('put', this.onPut.bind(this));
		socket.on('delete', this.onRemove.bind(this));
		socket.on('state update', this.onUpdate.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));
	},

	put: function(data){
		this.socket.emit('put', data);
		return this;
	},

	update: function(data){
		this.socket.emit('update', data);
		return this;
	},

	remove: function(id){
		this.socket.emit('delete', id);
		return this;
	},

	onRemove: function(id){
		this.publish('planet remove', id);
		return this;
	},

	onConnect: function(){
		this.connected = true;
		this.publish('planet connect');
	},

	onDisconnect: function(){
		this.connected = false;
		this.publish('planet disconnect');
	},

	onPut: function(data){
		this.publish('widget create', data);
	},

	onUpdate: function(data){
		if (data.key != null) this.publish('planet update ' + data.key, data.value);
		if (typeof data.path != 'string') data.path = data.path.join(' ');
		this.publish('planet update ' + data.path, data.value);
	}

});
