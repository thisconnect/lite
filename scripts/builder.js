new Unit({

	widgets: {},
	counter: 0,
	queue: {},

	initSetup: function(){
		this.subscribe({
			'descriptor add': this.parse,
			'descriptor ready': this.readyDescriptors,
			'widget select': this.create,
			'widget create': this.onCreate
		});
	},

	readySetup: function(){
		this.container = document.id('instruments');
	},

	readyDescriptors: function(){
		this.onCreate(this.queue);
	},

	parse: function(data){
		this.widgets[data.name] = data;
	},

	create: function(name){
		var data = {},
			point = data[this.counter] = {},
			controls = this.widgets[name].controllers;

		point = point[name] = {};
	//	TODO: should put default controller data on the planet

	//	for (var i in controls){
	//		if (controls.hasOwnProperty(i)){
	//			point[controls[i].name] = controls[i].value;
	//		}
	//	}

	//	TODO: should be put a new widget
		this.publish('put', [data]);
	},

	onCreate: function(data){
		for (var pos in data){
			for (var name in data[pos]){
				if (!this.widgets[name]) this.queue[pos] = data[pos];
				else {
					this.onBuild(pos, this.widgets[name]);
					// TODO: this is a workaround to set current values of the controllers
					for (var control in data[pos][name]){
						this.publish('planet update ' + [pos, name, control].join(' '), data[pos][name][control]);
					}
				}
			}
		}
	},

	onBuild: function(pos, data){
		// TODO: keep reference to instance
		new Widget(pos, data).attach(this.container);
		this.counter++;
	}

});
