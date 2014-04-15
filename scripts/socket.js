new Unit({

	options: {
		'resource': 'io'
		, 'transports': ['websocket']
		, 'try multiple transports': false
		, 'force new connection': true
	},

	bound: {},

	initSetup: function(){
		this.bound = {
			'onConnect': this.onConnect.bind(this),
			'onDisconnect': this.onDisconnect.bind(this)
		};
	},

	button: new Element('button'),

	info: new Element('span.info'),

	readySetup: function(){
		this.info.inject(document.body, 'top');
		this.button.addEvent('click', this.toggle.bind(this));
		this.button.inject(document.body, 'top');
		this.connect();
	},

	io: null,

	connect: function(){
		(this.io = io.connect(null, this.options))
		.on('connect', this.bound.onConnect)
		.on('disconnect', this.bound.onDisconnect)
		.on('reconnect', this.publish.bind(this, 'socket reconnect'));

		this.button.set('text', 'conntecting');
	},

	disconnect: function(){
		this.io.disconnect();
	},

	reconnect: function(){
		this.io.socket.reconnect();
	},

	isConnected: function(){
		return !!this.io && !!this.io.socket.connected;
	},

	toggle: function(e){
		e.preventDefault();
		if (this.isConnected()) this.disconnect();
		else this.reconnect();
	},

	onConnect: function(){
		this.info.set('text', 'socket established ' + this.io.socket.options.host);
		console.log(this.io);
		this.button.set('text', 'disconnect');
		this.publish('socket connect', this.io);
	},

	onDisconnect: function(){
		this.info.set('text', ' disconnected');
		this.button.set('text', 'connect');
		this.publish('socket disconnect');
	}

});
