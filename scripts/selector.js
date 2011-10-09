var Selector = new Unit({

	instruments: {},

	queue: new Element('select'),
	
	initSetup: function(){
		this.subscribe('descriptor.new', this.parse);
	},

	readySetup: function(){
		this.element = document.id('instrument-list');
		this.dispatcher = document.id('instrument-create');
		this.build();
	},

	parse: function(name, data){
		var instruments = this.instruments,
			queue = this.queue;

		instruments[data.name] = data;

		var instrument = new Element('option', {
			value: data.name,
			text: data.label
		});

		instrument.inject(this.element || queue);
	},

	build: function(){
		this.element.adopt(this.queue.getElements('option'));
		this.dispatcher.addEvent('click', this.create.bind(this));
	},

	create: function(){
		var name = this.element.value;
		this.publish('instrument.create', [name, this.instruments[name]]);
	}

});
