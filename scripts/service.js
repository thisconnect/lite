new Unit({

	initSetup: function(){
		this.subscribe('service create /station/dsp', this.addDSP);
		io.connect('/services').on('setup', this.onSetup.bind(this));
	},

	onSetup: function(data){
		for (var service in data){
			this.publish('service create ' + service, data[service]);
		}
	},

	request: new Request({
		method: 'get'
	}),

	element: new Element('button.btn[text=♫]'),

	build: function(){
		this.element.addEvent('click', this.onToggle.bind(this));
		this.publish('tools add', this.element);
	},

	dsp: false,

	onToggle: function(e){
		var self = this;
		e.stop();
		this.send('/station/dsp', this.onToggled.bind(this)); // /' + (this.dsp ? 'off' : 'on')
	},

	onToggled: function(response){
		response = JSON.parse(response);
		console.log(response);
		this.dsp = (response == 'on' ? true : false);
		this.element.set({
			'title': 'turn dsp ' + (this.dsp ? 'on' : 'off')
		});
		this.dsp ? this.element.addClass('active') : this.element.removeClass('active');
	},

	send: function(url, callback){
		this.request.removeEvents('success');
		if (callback) this.request.addEvent('success', callback);
		this.request.send({
			'url': url,
			'data': {dsp: 'on'}
		});
	},

	addDSP: function(data){
		this.build();

/*
		this.element.addEvent('click', function(e){
			var self = this;
			e.stop();
			that.send('/station/dsp/' + (dsp ? 'off' : 'on'), function(response){
				response = JSON.parse(response);
				dsp = (response == 'on' ? true : false);
				self.set({
					'title': 'turn dsp ' + (dsp ? 'on' : 'off')
				});
				dsp ? self.addClass('active') : self.removeClass('active');
			});
		});*/

	}

});
