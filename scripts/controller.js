var Controller = new Class({

	Implements: [Events, Bound],

	initialize: function(type, data){
		var array = type.match(/(.*?)\[(.*?)\]/);
		type = type.capitalize();
		if (array) return new Controller.Array[type](data);
		else return Controller[type] ? new Controller[type](data) : this;
	},

	$element: null,

	build: function(){
		this.$element = new Element('div.control-group');
		return this;
	},

	attach: function(container, position){
		this.$element.inject(container || document.body, position || 'bottom');
		return this;
	},

	detach: function(){
		this.$element.dispose();
		return this;
	},

	add: function(selector, options){
		var element = new Element(selector, options);
		element.inject(this.$element);
		return element;
	},

	set: function(value){
		return this;
	}/*,

	$enabled: true,

	isEnabled: function(){
		return !!this.$enabled;
	},

	enable: function(){
		this.$enabled = true;
		return this;
	},

	disable: function(){
		this.$enabled = false;
		return this;
	}*/

});
