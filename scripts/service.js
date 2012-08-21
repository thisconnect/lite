new Unit({

	initSetup: function(){
		this.subscribe('service add', this.addService);
	},

	addService: function(data){
		if ('/station/dsp' in data) this.addDSP();
	},

	request: new Request(),

	send: function(url, callback){
		this.request.send({
			'url': url,
			'data': 'yoyo=doo'
		});
		this.request.removeEvents('success');
		if (callback) this.request.addEvent('success', callback);
	},

	addDSP: function(){
		var that = this,
			dsp = false,
			button = new Element('button.btn[text=♫]');

		button.addEvent('click', function(e){
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
		});

		this.publish('tools add', button);
	}

});



