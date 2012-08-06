new Unit({

	initSetup: function(){
		this.subscribe({
			'planet connect': function(){
				this.setStatus('&#9741'); // Connected
			},
			'planet disconnect': function(){
				this.setStatus('&#9740;'); // Disconnected
			},
			'descriptor add': function(data){
				//console.log('descriptor add', data);
			},
			'widget create': function(data){
				//console.log('widget create', data);
			},
			'widget update': function(data){
				//console.log('widget update', data.path || data.key, data.value);
			},
			'widget delete': function(id){
				//console.log('widget delete', id);
			}
		});
	},

	readySetup: function(){
		this.status = document.id('conn-status');
	},

	setStatus: function(status){
		this.status.set('html', status);
		return this;
	}
});
