new Unit({

	initSetup: function(){
		this.subscribe('descriptor.new', this.parse);
	},

	readySetup: function(){
		this.element = document.id('instrument-list');
		this.dispatcher = document.id('instrument-create');
		this.build();
	},

	parse: function(name, data){
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
		this.publish('widget create', [this.element.value]);
	}

});
