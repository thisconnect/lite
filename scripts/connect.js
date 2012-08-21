new Unit({

	initSetup: function(){
		this.subscribe({
			'put': this.put,
			'widget update': this.post,
			'widget remove': this.remove,
			'planet connection': this.connect,
			'descriptor ready': this.onReadyDescriptors
		});
	},

	socket: null,

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
		var bound = {
			onPut: this.onPut.bind(this),
			onRemove: this.onRemove.bind(this),
			onPost: this.onPost.bind(this)
		};
		this.socket = socket;
		socket.on('initial state', bound.onPut);
		socket.on('put', bound.onPut);
		socket.on('post', bound.onPost);
		socket.on('delete', bound.onRemove);
		
	},

	ready: false,

	queue: {},

	onReadyDescriptors: function(){
		this.ready = true;
		this.onPut(this.queue);
		this.queue = {};
	},

	onPut: function(data){
		if (!this.ready) this.queue = data;
		else for (var pos in data){
			this.publish('widget create', [parseFloat(pos), data[pos]]);
		}
	},

	onPost: function(data){
		if (data.key != null) this.publish('planet update ' + data.key, data.value);
		if (typeof data.path != 'string') data.path = data.path.join(' ');
		this.publish('planet update ' + data.path, data.value);
	}

});
