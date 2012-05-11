new Unit({
	
	counter: 0,

	widgets: {},
	
	queue: {},

	initSetup: function(){
		this.subscribe({
			'descriptor ready': this.readyDescriptor,
			'descriptor.new': this.parse,
			'planet.descriptor select': this.onSelect,
			'widget create': this.onCreate
		});
	},

	readySetup: function(){
		this.container = document.id('instruments');
	},

	parse: function(name, data){
		this.widgets[data.name] = data;
	},

	readyDescriptor: function(){
		for (var i in this.queue){
			if (this.widgets[i]) this.onWidgetCreate(this.widgets[i].name, this.widgets[i]);
		}
	},

	onCreate: function(name){
		var data = {},
			controls = this.widgets[name].controllers;
		data[name] = {};

		// change json files to have a model object containing all controls
		for (var i in controls){
			if (controls.hasOwnProperty(i)){
				data[name][controls[i].name] = controls[i].value;
			}
		}
		this.publish('put', [data]);
	},

	onWidgetCreate: function(name, data){
		new Widget(++this.counter, data).attach(this.container);
	},

	onSelect: function(name, data){
		if (!this.widgets[name]) this.queue[name] = data;
		else this.onWidgetCreate(name, this.widgets[name]);
	}

});
