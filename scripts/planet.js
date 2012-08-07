new Unit({

	element: new Element('span[text="Planet ☌"]'),

	readySetup: function(){
		this.publish('interface add', ['header', this.element]);
		this.connect();
		io.connect('/services').on('setup', function(){
			console.log('services', arguments);
		});
		this.element.addEvent('click', this.toggle);
	},

	toggle: function(){},

	socket: null,

	connect: function(uri){
		var socket = this.socket = io.connect(uri);
		this.publish('planet connection', socket);
		socket.on('connect', this.onConnect.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));
	},

	onConnect: function(){
		this.element.set('text', 'Planet ☍');
		this.publish('planet connect');
	},

	onDisconnect: function(){
		this.element.set('text', 'Planet ☌');
		this.publish('planet disconnect');
	}

});
