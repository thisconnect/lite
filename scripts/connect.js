new Unit({

	initSetup: function(){
		this.subscribe({
			'post': this.post,
			'widget update': this.put,
			'widget remove': this.remove,
			'planet connection': this.connect,
			'descriptor ready': this.onReadyDescriptors
		});
	},

	socket: null,

	post: function(data){
		this.socket.emit('post', data);
	},

	put: function(key, value){
		this.socket.emit('put', key, value);
	},

	remove: function(key){
		this.socket.emit('delete', key);
	},

	onRemove: function(key){
		this.publish('planet remove', key);
	},

	connect: function(socket){
		var bound = {
			put: this.onPut.bind(this),
			remove: this.onRemove.bind(this),
			post: this.onPost.bind(this)
		};
		this.socket = socket;
	//	socket.on('get', bound.onPut);
		socket.on('put', bound.put);
		socket.on('post', bound.post);
	//	socket.on('delete', bound.remove);
	},

	ready: false,

	queue: {},

	onReadyDescriptors: function(){
		this.ready = true;
		this.onPost(this.queue);
		this.queue = {};
	},

	onPost: function(data){
		if (!this.ready) this.queue = data;
		else for (var pos in data){
			this.publish('widget create', [parseFloat(pos), data[pos]]);
		}
	},

	onPut: function(key, value){
		if (key != null) this.publish('planet update ' + key, value);
		if (typeof key != 'string') key = key.join(' ');
		this.publish('planet update ' + key, value);
	}

});
