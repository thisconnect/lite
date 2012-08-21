new Unit({

	element: new Element('button.btn[text="☉"][title=local]'),

	readySetup: function(){
		this.publish('tools add', this.element);
		this.element.addEvent('click', this.onToggle.bind(this));
		this.connect();
	},

	onToggle: function(e){
		e.preventDefault();
		if (this.connected) this.disconnect();
		else this.socket.socket.reconnect();
	},

	socket: null,

	connect: function(uri){
		var socket = this.socket = io.connect(uri);
		socket.on('connect', this.onConnect.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));
		this.publish('planet connection', socket);
	},

	connected: false,

	onConnect: function(){
		this.connected = true;
		this.element.set('text', '☄').set('title', 'online');
		this.publish('planet connect');
	},

	disconnect: function(){
		this.socket.disconnect();
		this.socket.removeAllListeners();
        this.socket.socket.removeAllListeners();
	},

	onDisconnect: function(){
		this.connected = false;
		this.element.set('text', '☉').set('title', 'local');
		this.publish('planet disconnect');
	}

});
