var Controller = new Class({

	Implements: [Events, Bound],

	$enabled: true,

	initialize: function(type, data){
		type = type.capitalize();
		return Controller[type] ? new Controller[type](data) : this;
	},

	build: function(){
		this.element = new Element('div.controller');
		return this;
	},

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
	},

	attach: function(container, position){
		this.element.inject(container || document.body, position || 'top');
		return this;
	},

	detach: function(){
		this.element.dispose();
		return this;
	},

	set: function(value){
		return this;
	}

});
