Controller.Int = new Class({

	Extends: Controller,

	initialize: function(data){
		this.build(data);
	},

	build: function(data){
		var that = this;
		this.parent();

		var control = this.control = new Element('input.input-xlarge', {
			'value': this.value
		});

		control.addEvent('change', function(e){
			that.fireEvent('quickchange', parseInt(this.value));
		});

		if (typeOf(data.range) != 'array') control.set('type', 'number');
		else control.set({
			'type': 'range',
			'min': data.range[0],
			'max': data.range[1]
		});

		this.adopt([
			new Element('label.control-label', {
				'text': data.label
			}),
			new Element('div.controls').grab(control)
		]);
	},

	set: function(value){
		this.control.value = value;
		return this;
	}

});
