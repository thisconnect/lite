new Unit({

	element: new Element('div.system'),

	button: new Element('button'),

	readySetup: function(){
		this.element.inject(document.body);

		this.button.inject(this.element)
			.set('text', 'conntecting')
			.addEvent('click', this.toggle.bind(this));
	
		this.subscribe({
			'socket connect': this.connect,
			'socket disconnect': this.disconnect,
			'socket reconnect': this.reconnect,
			'system connect': this.ready,
			'system add': this.add
		});
	},

	system: null,

	connect: function(socket){
		var system = this.system = socket.of('/system'),
			connect = this.publish.bind(this, 'system connect', system);

		system.once('connect', connect);
	},

	disconnect: function(){
		this.button.set('text', 'disconnected');
	},

	reconnect: function(socket){
		this.button.set('text', 'reconnect');
	},

	ready: function(system){
		var that = this;
		system.emit('get', 'system', function(data){
			that.publish('widget create', ['system', data]);
		});
		this.button.set('text', 'connected');
	},

	add: function(widget){
		widget.attach(this.element);
	},

	toggle: function(e){
		e.preventDefault();
		this.publish('socket toggle');
	}

});
