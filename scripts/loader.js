/** 
 * Loader Unit
 */

(function(){

new Unit({

	descriptorDir: 'instruments',

	initSetup: function(){
		this.setDir(this.descriptorDir);
		this.loadManifest();
	},
	
	setDir: function(descriptors){
		this.url = '/' + descriptors + '/';
		return this;
	},

	loadManifest: function(){
		new Request({
			url: this.url + 'manifest.json',
			method: 'get',
			onSuccess: this.parseManifest.bind(this)
		}).send();
	},

	parseManifest: function(data){
		data = JSON.decode(data);
		if (!data) return null;

		for (var i = 0, l = data.length; i < l; i++) this.loadDescriptor(data[i]);
		return this;
	},

	loadDescriptor: function(descriptor){
		new Request({
			url: this.url + descriptor,
			method: 'get',
			onSuccess: this.parseDescriptor.bind(this)
		}).send();
	},

	parseDescriptor: function(data){
		data = JSON.decode(data);
		if (!data) return null;

		data.name = data.name.toLowerCase();
		this.publish('descriptor.new', [data.name, data]);
		return this;
	}

});

})();
