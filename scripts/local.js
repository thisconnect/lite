new Unit({

	element: new Element('div.local'),

	initSetup: function(){
		this.subscribe({
			'socket connect': this.setup,
			'socket disconnect': this.disconnect,
			'local connect': this.connect,
			'local type connect': this.connectType,
			'local add': this.add
		});
	},

	readySetup: function(){
		this.element.inject(document.body);
	},

	io: null,

	type: null,

	setup: function(local){
		this.io = local;
		this.type = local.of('/type');
		this.publish('local type connect', this.type);
		this.publish('local connect', this.io);
	},

	connect: function(local){
		var that = this;
		this.publish('widget destroy', 'local');
		local.emit('get', function(data){
			console.log('local', data);
	//		that.publish('widget create', ['local', data]);
		});
	},

	connectType: function(type){
		type.emit('get', function(data){
			console.log('local type', data);
		});
	},

	disconnect: function(){
		//this.local.removeAllListeners();
		//delete this.local;
	},

	add: function(widget){
		widget.inject(this.element);
	}

});
