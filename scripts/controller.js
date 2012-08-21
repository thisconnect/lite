var Controller = new Class({

	Implements: [Events, Bound],

	initialize: function(data){
		this.build();
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

	adopt: function(){
		this.$element.adopt(arguments);
		return this;
	},

	set: function(value){
		return this;
	},

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
	}

});
