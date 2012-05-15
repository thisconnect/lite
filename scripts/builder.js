new Unit({

	widgets: {},
	counter: 0,
	ready: false,
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
		this.ready = true;
		this.onCreate(this.queue);
		this.queue = {};
	},

	parse: function(data){
		this.widgets[data.name] = data;
	},

	create: function(name){
		var data = {},
			dest = data[this.counter] = {};
		dest = dest[name] = this.widgets[name].payload;
		this.publish('put', data);
	},

	onCreate: function(data){
		for (var pos in data){
			// TODO: could be a real number: pos = parseFloat(pos);
			if (!this.ready) this.queue[pos] = data[pos];
			else for (var widget in data[pos]){
				new Widget(pos, this.widgets[widget]).attach(this.container);
				// TODO: if (pos == this.counter) this.counter++;
				this.counter++;
				for (var control in data[pos][widget]){
					this.publish('planet update ' + [pos, widget, control].join(' '), data[pos][widget][control]);
				}
			}
		}
	}

});
