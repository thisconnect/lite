new Unit({

	descriptorDir: 'instruments',

	initSetup: function(){
		this.setDir(this.descriptorDir);
		this.load('manifest.json', this.parseManifest);
	},

	setDir: function(descriptors){
		this.url = '/' + descriptors + '/';
		return this;
	},

	load: function(file, callback){
		new Request({
			url: this.url + file,
			method: 'get',
			onSuccess: callback.bind(this)
		}).send();
		return this;
	},

	parseManifest: function(data){
		data = JSON.decode(data);
		if (!data) return null;
		var i = this.count = data.length;
		while (i--){
			if (typeof data[i] == 'string') this.load(data[i], this.parseDescriptor);
			else this.publish('descriptor add', data);
		}
		return this;
	},

	parseDescriptor: function(data){
		data = JSON.decode(data);
		if (!data) return null;

		data.name = data.name.toLowerCase();
		this.publish('descriptor add', data);
		if (--this.count <= 0) this.publish('descriptor ready');
		return this;
	}

});
