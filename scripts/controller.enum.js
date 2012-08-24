Controller.Enum = new Class({

	Extends: Controller,

	initialize: function(data){
		this.build(data);
		this.element.addEvent('change', this.onChange.bind(this));
	},

	build: function(data){
		this.parent();
		this.element = new Element('select.span12');
		this.adopt([
			new Element('label.control-label', {
				'text': data.label
			}),
			new Element('div.controls').grab(this.element)
		]);
		var i = data.values.length;
		while (i--){
			new Element('option', {
				text: data.values[i].capitalize(),
				value: data.values[i]
			}).inject(this.element, 'top');
		}
	},

	onChange: function(){
		this.fireEvent('quickchange', this.element.get('value'));
	},

	set: function(value){
		this.element.value = value;
		return this;
	}

});
