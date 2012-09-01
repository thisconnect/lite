Controller.Enum = new Class({

	Extends: Controller,

	initialize: function(data){
		this.build(data);
		this.element.addEvent('change', this.onChange.bind(this));
	},

	build: function(data){
		this.parent();

		var label = this.add('label.control-label', {
				'text': data.label
			}),
			wrapper = this.add('div.controls'),
			select = this.element = new Element('select.span12');

		wrapper.adopt(select);

		var i = data.values.length;
		while (i--){
			new Element('option', {
				text: data.values[i].capitalize(),
				value: data.values[i]
			}).inject(select, 'top');
		}
	},

	onChange: function(){
		this.fireEvent('quickchange', this.element.get('value'));
	},

	set: function(value){
		this.element.set('value', value);
		return this;
	}

});
