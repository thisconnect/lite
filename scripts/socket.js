new Unit({

	options: {
		resource: 'io'
	},

	readySetup: function(){
		this.subscribe({
			'socket toggle': this.toggle
		});
		this.connect();
	},

	io: null,

	connect: function(){
		var socket = this.io = io.connect(null, this.options);
		socket.on('connect', this.publish.bind(this, 'socket connect', socket));
		socket.on('disconnect', this.publish.bind(this, 'socket disconnect'));
	},

	disconnect: function(){
		this.io.disconnect();
	//	this.io.removeAllListeners();
	//	this.io.socket.removeAllListeners();
	},

	reconnect: function(){
		this.io.socket.reconnect();
		this.publish('socket reconnect', this.io);
	},

	isConnected: function(){
		return !!this.io.socket.connected;
	},

	toggle: function(){
		if (this.isConnected()) this.disconnect();
		else this.reconnect();
	}

});
