new Unit({

	initSetup: function(){
		this.subscribe({
			'widget update': this.post,
			'widget remove': this.remove,
			'put': this.put,
			'planet connection': this.connect
		});
	},

	put: function(data){
		this.socket.emit('put', data);
	},

	post: function(data){
		this.socket.emit('post', data);
	},

	remove: function(id){
		this.socket.emit('delete', id);
	},

	onRemove: function(id){
		this.publish('planet remove', id);
	},

	connect: function(socket){
		this.socket = socket;
		socket.on('connect', this.onConnect.bind(this));
		socket.on('initial state', this.onPut.bind(this));
		socket.on('put', this.onPut.bind(this));
		socket.on('delete', this.onRemove.bind(this));
		socket.on('post', this.onPost.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));
	},

	onConnect: function(){
		this.publish('planet connect');
	},

	onDisconnect: function(){
		this.publish('planet disconnect');
	},

	onPut: function(data){
		this.publish('widget create', data);
	},

	onPost: function(data){
		if (data.key != null) this.publish('planet update ' + data.key, data.value);
		if (typeof data.path != 'string') data.path = data.path.join(' ');
		this.publish('planet update ' + data.path, data.value);
	}

});
