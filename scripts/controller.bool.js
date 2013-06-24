Controller.Bool = new Class({

	Extends: Controller,

	initialize: function(data){
		var input = this.input = new Element('input[type=checkbox]');

		input.addEvent('change', this.onChange.bind(this));

		if (!data.label) this.element = input;
		else {
			this.element = this.label(data.label);
			input.inject(this.element);
		}
	},

	onChange: function(){
		this.fireEvent('quickchange', this.input.checked);
	},

	set: function(value){
		this.input.checked = !!value;
		return this;
	}

});
