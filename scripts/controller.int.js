Controller.Int = new Class({

	Extends: Controller,

	initialize: function(data){
		this.build(data);
		this.element.addEvent('change', this.onChange.bind(this));
	},

	build: function(data){
		this.parent();
		var number = this.element = new Element('input.span12[type=number]');
		this.adopt([
			new Element('label.control-label', {
				'text': data.label
			}),
			new Element('div.controls').grab(number)
		]);
		if (data.range) number.set({
			'min': data.range[0],
			'max': data.range[1]
		});
		if (data.step) number.set('step', data.step);
	},

	onChange: function(e){
		this.fireEvent('quickchange', parseInt(this.element.value));
	},

	set: function(value){
		this.element.value = value;
		return this;
	}

});
