new Unit({

	initSetup: function(){
		this.subscribe({
			'descriptor add': this.addDescriptor,
			'widget select': this.create,
			'widget create': this.onCreate,
			'planet remove': this.onRemove,
			'tools add': this.addTool
		});
	},

	readySetup: function(){},

	widgets: {},

	addDescriptor: function(data){
		this.widgets[data.name] = data;
	},

	counter: 0,

	create: function(name){
		var data = {},
			dest = data[this.counter] = {};

		dest[name] = this.widgets[name]['payload'];
		this.publish('put', data);
	},

	state: {},

	content: document.id('content'),

	onCreate: function(pos, data){
		for (var widget in data){
			this.addWidget(widget, pos, data);
		}
	},

	addWidget: function(widget, pos, data){
		this.state[pos] = new Widget(pos, this.widgets[widget]).attach(this.content);
		for (var control in data[widget]){
			this.publish('planet update ' + [pos, widget, control].join(' '),
				data[widget][control]
			);
		}
		if (this.counter <= pos) this.counter = pos + 1;
	},

	onRemove: function(id){
		this.state[id].destroy();
		delete this.state[id]; 
	},

	tools: document.id('tools'),

	addTool: function(){
		this.tools.adopt(arguments).appendText(' ');
	}

});
