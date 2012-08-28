Controller.String = new Class({

	Extends: Controller,

	initialize: function(data){
		this.build(data);
		this.element.addEvent('change', this.onChange.bind(this));
	},

	build: function(data){
		this.parent();
		var input = this.element = new Element('input.span12[type=text]');
		this.adopt([
			new Element('label.control-label', {
				'text': data.label
			}),
			new Element('div.controls').grab(input)
		]);
		if (data.placeholder) input.set('placeholder', data.placeholder);
	},

	onChange: function(e){
		this.fireEvent('quickchange', this.element.value);
	},

	set: function(value){
		this.element.value = value;
		return this;
	}

});
