new Unit({

	initSetup: function(){
		this.subscribe('descriptor add', this.parse);
	},

	element: null,
	dispatcher: null,

	readySetup: function(){
		this.element = document.id('instrument-list');
		this.dispatcher = document.id('instrument-create');
		this.build();
	},

	queue: new Element('select'),

	parse: function(data){
		new Element('option', {
			value: data.name,
			text: data.label
		}).inject(this.element || this.queue, 'top');
	},

	build: function(){
		this.element.adopt(this.queue.getElements('option'));
		this.queue.destroy();
		this.dispatcher.addEvent('click', this.onSelect.bind(this));
	},

	onSelect: function(){
		this.publish('widget select', this.element.value);
	}

});
