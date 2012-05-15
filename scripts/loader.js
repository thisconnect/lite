new Unit({

	descriptorDir: 'instruments',
	count: 0,

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

		var i = this.count = Object.getLength(data);
		while (i--){
			if (typeof data[i] != 'string') this.parseDescriptor(data[i]);
			else this.load(data[i], this.parseDescriptor);
		}
		return this;
	},

	parseDescriptor: function(data){
		if (typeof data == 'string') data = JSON.decode(data);
		if (!data) return null;
		data.name = data.name.toLowerCase();
		this.publish('descriptor add', data);
		if (--this.count <= 0) this.publish('descriptor ready');
		return this;
	}

});
