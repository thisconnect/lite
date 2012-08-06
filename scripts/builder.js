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
		for (var pos in this.queue){
			this.publish('widget create', [pos, this.queue[pos]]);
		}
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

	onCreate: function(pos, data){
		if (!this.ready) this.queue[pos] = data;
		else for (var widget in data){
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
