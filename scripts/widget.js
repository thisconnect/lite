var Widget = new Class({
	
	Implements: Unit,

	Prefix: 'widget',

	initialize: function(id, data){
		this.setupUnit();
		this.id = id;
		this.name = data.name;
		this.label = data.label;
		this.controllers = data.controllers;

		this.build();
		this.buildControllers();
	},

	build: function(){
		var container = this.element = new Element('div.widget', {
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
			l = controllers.length;

		while (l--) (function(controller){
			var item = map[controller.name] = new Controller(controller.type, controller);
			item.addEvent('quickchange', function(value){
				self.onControllerQuickChange(controller.name, value);
			}).attach(self.controlContainer);

			self.subscribe('planet.update.' + [self.id, self.name, controller.name].join('.'), self.onStateUpdate.bind(item));
		})(controllers[l]);

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

	onControllerQuickChange: function(name, value){
		this.publish('update', {'path': [this.id, this.name, name], 'value': value});
	},

	onStateUpdate: function(value){
		this.set(value);
	}

});
