new Unit({

	widgets: {},
	state: {},
	queue: {},
	counter: 0,

	initSetup: function(){
		this.subscribe({
			'descriptor add': this.addDescriptor,
			'descriptor ready': this.readyDescriptors,
			'widget select': this.create,
			'widget create': this.onCreate,
			'planet remove': this.onRemove
		});
	},

	readySetup: function(){
		this.header = new Element('header');
		this.container = new Element('div');
		document.body.adopt([this.header, this.container]);
	},

	readyDescriptors: function(){
		this.ready = true;
		this.onCreate(this.queue);
		this.queue = {};
	},

	addDescriptor: function(data){
		this.widgets[data.name] = data;
	},

	create: function(name){
		var data = {},
			dest = data[this.counter] = {};

		dest[name] = this.widgets[name].payload;
		this.publish('put', data);
	},

	onCreate: function(data){
		for (var pos in data){
			pos = parseFloat(pos);
			if (!this.ready) this.queue[pos] = data[pos];
			else for (var widget in data[pos]){
				this.state[pos] = new Widget(pos, this.widgets[widget]);
				this.state[pos].attach(this.container);
				for (var control in data[pos][widget]){
					this.publish('planet update ' + [pos, widget, control].join(' '), data[pos][widget][control]);
				}
				if (this.counter <= pos) this.counter = pos + 1;
			}
		}
	},

	onRemove: function(id){
		this.state[id].destroy();
		delete this.state[id]; 
	}

});
