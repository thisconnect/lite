Controller.String = new Class({

	Extends: Controller,

	initialize: function(data){
		var element = this.element = new Element('input[type=text]');

		this.value = '';

		if (data.placeholder != null) element.set('placeholder', data.placeholder);

		element.addEvent('keyup', this.onChange.bind(this));
	},

	onChange: function(e){
		if (this.value != this.element.value) this.fireEvent('quickchange', this.value = this.element.value);
	},

	set: function(value){
		this.value = this.element.value = value;
		return this;
	}

});
