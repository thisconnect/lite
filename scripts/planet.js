new Unit({

	readySetup: function(){
		if (null != window.io) this.connect('//:8999');
		else this.load('/planet', function(response){
			response = JSON.decode(response);

			this.load(response.io, function(){
				this.connect(response.connect);
			});
		});
	},

	load: function(location, callback){
		new Request({
			url: location,
			method: 'get',
			noCache: true,
			onSuccess: callback.bind(this),
			onFailure: function(){
				console.log('errrrr');
			}
		}).send();
		return this;
	},

	connect: function(uri){
		this.publish('planet connection', io.connect(uri));
	}

});
