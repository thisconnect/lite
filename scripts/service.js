new Unit({

	initSetup: function(){
		this.subscribe('service create /station/dsp', this.build);
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
		e.preventDefault();
		this.send('/station/dsp', this.onToggled.bind(this));
	},

	onToggled: function(response){
		response = JSON.parse(response);
		this.dsp = (response.dsp == 'on' ? true : false);
		this.element.set({
			'title': 'turn dsp ' + (this.dsp ? 'on' : 'off')
		})[this.dsp ? 'addClass' : 'removeClass']('active');
	},

	send: function(url, callback){
		if (this.request.isRunning()) return;
		this.request.removeEvents('success');
		if (callback) this.request.addEvent('success', callback);
		this.request.send({
			'url': url,
			'data': {
				'dsp': (!this.dsp ? 'on' : 'off')
			}
		});
	}

});
