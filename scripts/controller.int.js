Controller.Int = new Class({

	Extends: Controller,

	initialize: function(data){
		this.label = data.label;
		this.value = data.value;
		this.range = data.range;
		this.build();
	},

	build: function(){
		var self = this;
		this.parent();

		var label = new Element('label', {
			text: this.label
		});	

		var control = this.control = new Element('input', {
			value: this.value,
			events: {
				change: function(e){
					self.onChange(this.value);
				}
			}
		});

		if (typeOf(this.range) == 'array'){
			control.set({
				type: 'range',
				min: this.range[0],
				max: this.range[1]
			});
		}

		this.element.adopt(label, control);
	},

	onChange: function(value){
		if (this.isEnabled()) this.fireEvent('quickchange', value);
		return this;
	},

	set: function(value){
		this.control.value = value;
		return this;
	}

});
