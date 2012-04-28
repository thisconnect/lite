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
		socket.on('message', this.onMessage.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));
	},

	onConnect: function(){
		this.connected = true;
		this.setStatus('Connected');
		this.publish('connect');
	},

	onMessage: function(data){
		data = JSON.decode(data);
		if (data == null) return this;
		switch (data.type){
			case 'initial_state':
				console.log('payload', data.payload);
			break;

			case 'state_update':
				this.onStateUpdate(data.payload);
			break;
		}
	},

	onDisconnect: function(){
		this.connected = false;
		this.setStatus('Disconnected');
		this.publish('disconnect');
	},

	onWidgetQuickChange: function(name, value){
		this.send('attempt_update', {
			component: name,
			payload: value
		});
		return this;
	},

	onStateUpdate: function(data){
		for (var i in data){
			if (data.hasOwnProperty(i)) this.publish('stateupdate.' + i, data[i]);
		}
		return this;
	},

	setStatus: function(status){
		this.status.set('text', status);
	},

	send: function(type, payload){
		this.socket.send(JSON.encode({
			type: type,
			payload: payload
		}));
		return this;
	}

});
