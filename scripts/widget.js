var Widget = new Class({
	
	Implements: Unit,

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
		var container = this.element = new Element('section.widget');
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
			var item = map[controller.name] = new Controller(controller.type, controller)
				id = [self.id, self.name, controller.name].join(' ');

			item.addEvent('quickchange', function(value){
				self.onControllerChange(controller.name, value);
			}).attach(self.controlContainer);

			self.subscribe('planet update ' + id, self.onStateUpdate.bind(item));
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

	onControllerChange: function(name, value){
		this.publish('widget update', {
			'path': [this.id, this.name, name],
			'value': value
		});
	},

	onStateUpdate: function(value){
		this.set(value);
	}

});
