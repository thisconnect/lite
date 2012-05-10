new Unit({

	instruments: {},
	
	queue: {},
	
	initSetup: function(){
		this.subscribe('descriptor ready', this.readyDescriptor);
		this.subscribe('descriptor.new', this.parse);
		this.subscribe('planet.descriptor select', this.onSelect);
	},

	readySetup: function(){
		this.element = document.id('instrument-list');
		this.dispatcher = document.id('instrument-create');
		this.build();
	},

	readyDescriptor: function(){
		for (var i in this.queue){
			if (this.instruments[i]) this.publish('instrument.create', [this.instruments[i].name, this.instruments[i]]);
		}
	},

	parse: function(name, data){
		this.instruments[data.name] = data;

		new Element('option', {
			value: data.name,
			text: data.label
		}).inject(this.element, 'top');
	},

	build: function(){
		this.dispatcher.addEvent('click', this.onCreate.bind(this));
		return this;
	},

	onCreate: function(){
		var name = this.element.value,
			data = {},
			controls = this.instruments[name].controllers;

		data[name] = {};

		// change json files to have a model object containing all controls
		for (var i in controls){
			if (controls.hasOwnProperty(i)){
				data[name][controls[i].name] = controls[i].value;
			}
		}
		//this.publish('instrument.create', [name, this.instruments[name]]);
		this.publish('widget create', [data]);
	},

	onSelect: function(name, data){
		if (!this.instruments[name]) this.queue[name] = data;
		else this.publish('instrument.create', [name, this.instruments[name]]);
	}

});
