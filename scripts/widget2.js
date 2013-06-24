(function(){

new Unit({

	initSetup: function(){
		this.subscribe({
			'widget create': this.create
		});
	},

	widgets: {},

	create: function(id, data){
		var widget = this.widgets[id]
			|| (this.widgets[id] = new Widget2(id, data));
		this.publish('system add', widget);
	}

});

var Widget2 = new Class({

	Implements: Unit,

	brakets: /(.*?)\[(.*?)\]/,

	initialize: function(id, data){
		var control = this.control.bind(this, id);
		this.setupUnit();
		this.id = id;
		this.element = new Element('section');
		Object.forEach(data, control);
    },

	attach: function(element, position){
		this.element.inject(element, position || 'bottom');
		return this;
	},

	detach: function(){
		this.element.dispose();
		return this;
	},

	control: function(id, data, name){
		var type = data.type.capitalize(),
			array = type.match(this.brakets),
			publish = this.publish.bind(this);

		(!array ? new Controller[type](data)
				: new Controller.Array(array, data))
			.attach(this.element)
			.addEvent('quickchange', function(value){
				console.log('quickchange', value);
				publish('state set', [[id, name], value]);
			});
	}

});

})();
