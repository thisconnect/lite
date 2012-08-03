new Unit({

	readySetup: function(){
		this.connect();
	},

	connect: function(uri){
		this.publish('planet connection', io.connect(uri));
	}

});
