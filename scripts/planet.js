new Unit({

	element: new Element('button.btn.btn-mini[text="☉ local"]'),

	readySetup: function(){
		this.publish('tools add', this.element);
		this.element.addEvent('click', this.toggle.bind(this));
		this.connect();
		io.connect('/services').on('setup', function(){
			console.log('services', arguments);
		});
	},

	toggle: function(){
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
		this.element.set('text', '☄ online');
		this.publish('planet connect');
	},

	disconnect: function(){
		this.socket.disconnect();
		this.socket.removeAllListeners();
        this.socket.socket.removeAllListeners();
	},

	onDisconnect: function(){
		this.connected = false;
		this.element.set('text', '☉ local');
		this.publish('planet disconnect');
	}

});
