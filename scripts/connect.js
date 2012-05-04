new Unit({

	Prefix: 'planet',

	initSetup: function(){
		this.subscribe({
			'widget.quickchange': this.onWidgetQuickChange
		});
	},

	readySetup: function(){
		this.status = document.id('conn-status');
		var socket = this.socket = io.connect('http://localhost:8999');
		socket.on('connect', this.onConnect.bind(this));
		//socket.on('initial state', this.onInitalState.bind(this));
		socket.on('state update', this.onStateUpdate.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));
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

	onWidgetQuickChange: function(name, data){
		this.send('update', {
			key: name,
			value: data
		});
		return this;
	},

	onStateUpdate: function(data){
		this.publish('stateupdate.' + data.key, data.value);
		return this;
	},
/*
	onCreate: function(data){
		for (var i in data){
			if (data.hasOwnProperty(i)) this.publish('stateupdate.' + i, data[i]);
		}
		return this;
	},
*/
	setStatus: function(status){
		this.status.set('text', status);
	},

	send: function(type, data){
		this.socket.emit(type, data);
		return this;
	}

});
