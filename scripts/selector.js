new Unit({

	initSetup: function(){
		this.subscribe('descriptor add', this.parse);
	},

	element: new Element('select'),

	dispatcher: new Element('button[text=add]'),

	readySetup: function(){
		this.publish('interface add', ['header', [this.element, this.dispatcher	]]);
		this.dispatcher.addEvent('click', this.onSelect.bind(this));
	},

	parse: function(data){
		new Element('option', {
			value: data.name,
			text: data.label
		}).inject(this.element, 'top');
	},

	onSelect: function(){
		this.publish('widget select', this.element.value);
	}

});
