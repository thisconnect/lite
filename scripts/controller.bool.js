Controller.Bool = new Class({

	Extends: Controller,

	initialize: function(data){
		this.build(data);
	},

	build: function(data){
		this.parent();

		var that = this,
			container = this.add('div.controls'),
			label = new Element('label.checkbox', {
				'text': data.label
			}),
			input = this.element = new Element('input[type=checkbox]');

		container.adopt(label);
		label.adopt(input);

		input.addEvent('change', function(){
			that.fireEvent('quickchange', this.checked);
		});
	},

	set: function(value){
		this.element.checked = !!value;
		return this;
	}

});
