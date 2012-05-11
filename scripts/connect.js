new Unit({

	Prefix: 'planet',

	initSetup: function(){
		this.subscribe({
			'widget.quickchange': this.onWidgetQuickChange,
			'update': this.update,
			'widget.update': this.update,
			'put': this.put,
			'widget.put': this.put
		});
	},

	readySetup: function(){
		this.status = document.id('conn-status');
		var socket = this.socket = io.connect('http://localhost:8999');
		socket.on('connect', this.onConnect.bind(this));
		socket.on('initial state', this.onPut.bind(this));
		socket.on('put', this.onPut.bind(this));
		socket.on('state update', this.onStateUpdate.bind(this));
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

	onConnect: function(){
		this.connected = true;
		this.setStatus('Connected');
		this.publish('connect');
	},

	onDisconnect: function(){
		this.connected = false;
		this.setStatus('Disconnected');
		this.publish('disconnect');
	},

	onPut: function(data){
		for (var i in data){
			if (data.hasOwnProperty(i)){
				this.publish('descriptor select', [i, data[i]]);
			}
		}
	},

	onWidgetQuickChange: function(name, data){
		this.update({
			key: name,
			value: data
		});
	},

	onStateUpdate: function(data){
		if (data.key != null) this.publish('update.' + data.key, data.value);
		if (typeof data.path != 'string') data.path = data.path.join('.');
		console.log('update.' + data.path, data.value);
		this.publish('update.' + data.path, data.value);
	},

	setStatus: function(status){
		this.status.set('text', status);
		return this;
	}

});
