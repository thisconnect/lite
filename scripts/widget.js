(function(){

var counter = {};

var Widget = this.Widget = new Class({
	
	Implements: Unit,

	Prefix: 'widget',

	initialize: function(name, label, controllers){
		this.setupUnit();
		this.name = name;
		this.label = label;
		this.controllers = controllers;

		this.register(name);
		this.build();
		this.buildControllers();
	},

	register: function(name){
		if (!counter[name]) counter[name] = 0;
		this.id = name + '-' + (++counter[name]);
		return this;
	},

	build: function(){
		var container = this.element = new Element('div.instrument', {
			'data-id': this.id
		});
		new Element('h1', {text: this.label}).inject(container);
		this.controlContainer = new Element('div.controllers').inject(container);
		return this;
	},

	buildControllers: function(){
		var self = this,
			map = {},
			controllers = this.controllers,
			len = controllers.length;

		while (len--) (function(controller){
			var item = new Controller(controller.type, controller);
			item.addEvents({
				'change': function(value){
					self.onControllerChange(controller.name, value);
				},
				'quickchange': function(value){
					self.onControllerQuickChange(controller.name, value);
				}
			}).attach(self.controlContainer);
			map[controller.name] = item;

			self.subscribe('planet.stateupdate.' + [self.id, controller.name].join(':'), self.onStateUpdate.bind(item));
		})(controllers[len]);

		this.controllers = map;
		return this;
	},

	attach: function(element, position){
		this.element.inject(element || document.body, position || 'bottom');
		return this;
	},

	detach: function(){
		this.element.dispose();
		return this;
	},

	onControllerChange: function(name, value){},

	onControllerQuickChange: function(name, value){
		var id = [this.id, name].join(':');
		this.publish('quickchange', [id, value]);
	},

	onStateUpdate: function(value){
		this.set(value);
	}

});

})();
