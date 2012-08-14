Controller.Bool = new Class({

	Extends: Controller,

	initialize: function(data){
		this.build(data);
	},

	build: function(data){
		var that = this;
		this.parent();

		var control = this.control = new Element('input[type=checkbox]');

		control.addEvent('change', function(){
			that.onChange(this.checked);
		});

		var label = new Element('label.checkbox', {
			'text': data.label
		});

		control.inject(label, 'top');

		this.adopt(new Element('div.controls').grab(label));
	},

	onChange: function(value){
		if (this.isEnabled()) this.fireEvent('quickchange', value);
	},

	set: function(value){
		this.control.checked = !!value;
		return this;
	}

});
