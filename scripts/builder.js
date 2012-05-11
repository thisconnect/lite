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
		console.log('readyDescriptor', this.queue);
		for (var i in this.queue){
			if (this.widgets[i]) this.onCreate(this.widgets[i].name, this.widgets[i]);
		}
	},

	create: function(name){
		var data = {},
			point = data[this.counter] = {},
			controls = this.widgets[name].controllers;

		point = point[name] = {};
	//	should put default controller data
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
				if (this.widgets[name]) this.onCreate(pos, this.widgets[name]);
				else this.queue[pos] = data[pos];
				console.log(data[pos][name]);
			}
		}
		
		console.log('onPut', pos, data);
	
		//if (!this.widgets[name]) this.queue[name] = data;
		//else this.onWidgetCreate(name, this.widgets[name]);
		for (var i in data){
			if (!this.widgets[i]) this.queue[i] = data[i];
			else this.onCreate(pos, this.widgets[i]);
			console.log('onPut item', pos, i, data[i]);
		}
	},

	onCreate: function(pos, data){
		console.log('onCreate', pos, data);
		//new Widget(pos, data).attach(this.container);
		this.counter++;
	}

});
