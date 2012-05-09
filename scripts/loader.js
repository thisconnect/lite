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
	},

	parseManifest: function(data){
		data = JSON.decode(data);
		if (!data) return null;

		for (var i = 0, l = data.length; i < l; i++) this.load(data[i], this.parseDescriptor);
		return this;
	},

	parseDescriptor: function(data){
		data = JSON.decode(data);
		if (!data) return null;

		data.name = data.name.toLowerCase();
		this.publish('descriptor.new', [data.name, data]);
		return this;
	}

});
