new Unit({

	instruments: {},
	
	initSetup: function(){
		this.subscribe('descriptor.new', this.parse);
	},

	readySetup: function(){
		this.element = document.id('instrument-list');
		this.dispatcher = document.id('instrument-create');
		this.build();
	},

	parse: function(name, data){
		this.instruments[data.name] = data;

		new Element('option', {
			value: data.name,
			text: data.label
		}).inject(this.element);
	},

	build: function(){
		this.dispatcher.addEvent('click', this.onCreate.bind(this));
		return this;
	},

	onCreate: function(){
		var name = this.element.value;
		this.publish('instrument.create', [name, this.instruments[name]]);
	}

});
