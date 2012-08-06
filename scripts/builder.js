new Unit({

	initSetup: function(){
		this.subscribe({
			'descriptor add': this.addDescriptor,
			'widget select': this.create,
			'widget create': this.onCreate,
			'planet remove': this.onRemove
		});
	},

	header: null,
	container: null,

	readySetup: function(){
		this.header = new Element('header');
		this.container = new Element('div');
		document.body.adopt([this.header, this.container]);
	},

	widgets: {},

	addDescriptor: function(data){
		this.widgets[data.name] = data;
	},

	counter: 0,

	create: function(name){
		var data = {},
			dest = data[this.counter] = {};

		dest[name] = this.widgets[name].payload;
		this.publish('put', data);
	},

	state: {},

	onCreate: function(pos, data){
		for (var widget in data){
			this.state[pos] = new Widget(pos, this.widgets[widget]);
			this.state[pos].attach(this.container);
			for (var control in data[widget]){
				this.publish('planet update ' + [pos, widget, control].join(' '), data[widget][control]);
			}
			if (this.counter <= pos) this.counter = pos + 1;
		}
	},

	onRemove: function(id){
		this.state[id].destroy();
		delete this.state[id]; 
	}

});
