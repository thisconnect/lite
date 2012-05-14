var Widget = new Class({

	Implements: Unit,

	initialize: function(id, data){
		this.setupUnit();
		this.id = id;
		this.name = data.name;

		this.build(data.label + ' (' + this.id + ')');
		this.buildControllers(data.controllers);
	},

	build: function(label){
		this.element = new Element('section.widget').grab(new Element('h1', {
			text: label
		}));
		return this;
	},

	buildControllers: function(controllers){
		var container = new Element('div.controllers').inject(this.element);
		for (var name in controllers){
			if (controllers.hasOwnProperty(name)){
				this.addController([this.id, this.name, name], controllers[name]).attach(container);
			}
		};
		return this;
	},

	addController: function(id, controller){
		var self = this,
			control = new Controller(controller.type, controller);

		control.addEvent('quickchange', function(value){
			self.publish('widget update', {
				'path': id,
				'value': value
			});
		});
		this.subscribe('planet update ' + id.join(' '), this.onStateUpdate.bind(control));
		return control;
	},

	attach: function(element, position){
		this.element.inject(element || document.body, position || 'bottom');
		return this;
	},

	detach: function(){
		this.element.dispose();
		return this;
	},

	onStateUpdate: function(value){
		this.set(value);
	}

});
