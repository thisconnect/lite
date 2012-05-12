new Unit({

	widgets: {},
	counter: 0,
	queue: {},

	initSetup: function(){
		this.subscribe({
			'descriptor ready': this.readyDescriptor,
			'descriptor.new': this.parse,
			'planet.onPut': this.onPut,
			'widget create': this.create
		});
	},

	readySetup: function(){
		this.container = document.id('instruments');
	},

	parse: function(name, data){
		this.widgets[data.name] = data;
	},

	readyDescriptor: function(){
		this.onPut(this.queue);
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
		this.publish('put', [data]);
	},

	onPut: function(data){
		for (var pos in data){
			for (var name in data[pos]){
				if (!this.widgets[name]) this.queue[pos] = data[pos];
				else {
					this.onCreate(pos, this.widgets[name]);
					// TODO: remove this, should create widget with correct data
					for (var control in data[pos][name]){
						this.publish('planet.update.' + [pos, name, control].join('.'), data[pos][name][control]);
					}
				}
			}
		}
	},

	onCreate: function(pos, data){
		new Widget(pos, data).attach(this.container);
		this.counter++;
	}

});
