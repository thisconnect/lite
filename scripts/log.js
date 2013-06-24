new Unit({

	pre: new Element('pre'),

	initSetup: function(){
		var pre = this.pre;

		this.subscribe({
			'socket connect': function(){
				pre.set('text', '');
			},
			'system connect': function(system){
				system.emit('get', function(data){
					pre.appendText('system: ' + JSON.stringify(data, null, '\r\t'), 'top');
					pre.appendText('\n', 'top');
				});
			},
			'state connect': function(state){
				state.emit('get', function(data){
					pre.appendText('state: ' + JSON.stringify(data, null, '\r\t'), 'top');
					pre.appendText('\n', 'top');
				});
			},
			'state set': function(path, value){
				path = path.slice(0);
				path.push(value);
				pre.appendText('\n' + path.join(' '), 'top');
			}
		});

	},

	readySetup: function(){
		this.pre.inject(document.body);
	}

});
