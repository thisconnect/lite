new Unit({

	initSetup: function(){
		this.subscribe('descriptor add', this.parse);
	},

	element: new Element('select'),

	dispatcher: new Element('button.btn[text=add]'),

	readySetup: function(){
		this.publish('tools add', new Element('div.form-inline.pull-left')
			.adopt(this.element)
			.appendText(' ')
			.adopt(this.dispatcher)
		);
		//this.publish('tools add', [this.element]);
		
		this.dispatcher.addEvent('click', this.onSelect.bind(this));
	},

	parse: function(data){
		new Element('option', {
			value: data.name,
			text: data.label
		}).inject(this.element, 'top');
	},

	onSelect: function(e){
		e.preventDefault();
		this.publish('widget select', this.element.value);
	}

});
