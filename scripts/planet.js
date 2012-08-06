new Unit({

	readySetup: function(){
		this.connect('planet connection');
		io.connect('/services').on('setup', function(){
			console.log('services', arguments);
		});
	},

	connect: function(type, uri){
		this.publish(type, io.connect(uri));
	}

});
