new Unit({

	initSetup: function(){
		this.subscribe({
			'planet connection': this.log.bind(['planet connection']),
			'planet connect': this.log.bind(['planet connect']),
			'planet disconnect': this.log.bind(['planet disconnect']),
			'planet remove': this.log.bind(['planet remove']),

			'descriptor add': this.log.bind(['descriptor add']),
			'descriptor ready': this.log.bind(['descriptor ready']),
			
			'widget select': this.log.bind(['widget select']),
			'widget create': this.log.bind(['widget create']),
			'widget update': this.log.bind(['widget update']),
			'widget remove': this.log.bind(['widget remove']),

			'tools add': this.log.bind(['tools add']),
			
			'put': this.log.bind(['put'])
		});
	},

	log: function(){
		console.log(this, arguments);
	}

});
