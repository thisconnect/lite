Controller.Bool = new Class({

	Extends: Controller,

	initialize: function(data){
		this.label = data.label;
		//this.value = data.value;
		this.build();
	},

	build: function(){
		this.parent();

		var self = this,
			label = new Element('label');	

		this.control = new Element('input[type=checkbox]', {
			events: {
				change: function(){
					self.onChange(this.checked);
				}
			}
		}).inject(label);

		label.appendText(this.label).inject(this.element);
	},

	onChange: function(value){
		if (this.isEnabled()) this.fireEvent('quickchange', value);
	},

	set: function(value){
		this.control.checked = !!value;
		return this;
	}

});
