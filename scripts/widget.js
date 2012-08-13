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
		this.element = new Element('form.form-horizontal').adopt([
			new Element('h1', {text: label + ' '}).grab(
			new Element('button.close[html="&#10799;"]', { // × &#10005; &#10799; &times;
				events: {
					click: this.onRemove.bind(this)
				}
			})
			)
			
		]);
	},

	buildControllers: function(controllers){
		for (var name in controllers){
			if (controllers.hasOwnProperty(name)){
				this.addController([this.id, this.name, name], controllers[name]).attach(this.element);
			}
		};
	},

	addController: function(path, controller){
		var self = this,
			control = new Controller[controller.type.capitalize()](controller);

		control.addEvent('quickchange', function(value){
			self.publish('widget update', {
				'path': path,
				'value': value
			});
		});
		this.subscribe('planet update ' + path.join(' '), this.onStateUpdate.bind(control));
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

	onRemove: function(){
		this.publish('widget remove', this.id);
	},

	destroy: function(){
		this.element.destroy();
	},

	onStateUpdate: function(value){
		this.set(value);
	}

});
