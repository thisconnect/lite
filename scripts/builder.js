var Builder = new Unit({

	initSetup: function(){
		this.subscribe('descriptor.new', this.parse);
		this.subscribe('instrument.create', this.parse);
	},

	readySetup: function(){
		this.container = document.id('instruments');
	},

	parse: function(name, data){
		var parsers = this.parsers,
			controllers = data.controllers;

		new Widget(name, data.label, data.controllers).attach(this.container);
	}

});

