const { forIn, getDocument, loadJS, replaceAll } = require('./utils');


module.exports = function(modV) {
	modV.prototype.register = function(Module, instantiated) {

		function finish(Module) {
			// Add to Registry
			self.registeredMods[Module.info.name] = Module;

			// List controls/variables for remote
			let controls = [];

			forIn(Module.info.controls, (key, Control) => {
				let type = 'unknown';

				if(Control instanceof self.RangeControl) 	type = 'range';
				if(Control instanceof self.CheckboxControl) type = 'checkbox';
				if(Control instanceof self.SelectControl) 	type = 'select';
				if(Control instanceof self.TextControl) 	type = 'text';
				if(Control instanceof self.ColorControl) 	type = 'color';
				if(Control instanceof self.PaletteControl) 	type = 'palette';
				if(Control instanceof self.ImageControl) 	type = 'image';
				if(Control instanceof self.VideoControl) 	type = 'video';
				if(Control instanceof self.CustomControl) 	type = 'custom';

				controls.push({
					type: type,
					settings: Control.settings
				});
			});

			// Send to remote
			self.remote.update('addRegistered', {
				name: name,
				type: type,
				controls: controls
			});

			// Create Gallery item
			self.createGalleryItem(Module);

			self.emit('moduleRegister',
				Module
			);
		}

		var self = this;
		var originalModule = Module;

		if(originalModule.name in self.moduleStore) {
			throw new STError("Already registered a Module with the name " + originalModule.name + ". Could not register duplicately named module");
		}

		// check if already instantiated for the script loader
		if(!instantiated) {
			self.moduleStore[originalModule.name] = originalModule;
			Module = new Module();
			Module.info.originalModuleName = originalModule.name;
		}

		// Shared Module variables
		var name;
		let type = 'unknown';


		// Set meta
		Module.info.alpha = 1;
		Module.info.disabled = true;
		Module.info.solo = false;

		// Get name
		name = Module.info.name;
		Module.info.safeName = replaceAll(name, ' ', '-');

		// Super hacky way of loading scripts
		// TODO: improve this
		if('scripts' in Module.info && !instantiated) {
			let promises = [];

			Module.info.scripts.forEach(function(script) {
				promises.push(loadJS('/modules/' + script, document.body, Module));
			});


			Promise.all(promises).then(() => {
				this.register(Module, true);
			});

			return;
		}

		// Handle Module2D
		if(Module instanceof self.Module2D) {
			type = 'Module2D';

			// Parse Meyda
			if(Module.info.meyda) {
				Module.info.meyda.forEach(this.addMeydaFeature.bind(this));
			}

			// Initialise Module
			Module.init(self.layers[0].canvas, self.layers[0].context);

			// finish up
			finish(Module, type);
		}

		// Handle ModuleShader
		if(Module instanceof self.ModuleShader) {
			type = 'ModuleShader';
			let gl = self.shaderEnv.gl;

			// Module.info.uniforms.modVcanvas = {
			// 	type: "t",
			// 	value: self.shaderEnv.texture
			// };

			Module._makeProgram(gl, this).then(() => {
				Module._setupUniforms(gl);
				finish(Module, 'shader');
			}).catch(e => {
				console.error(e);
			});
		}

		// Handle Module3D
		if(Module instanceof self.Module3D) {
			type = 'Module3D';

			// Parse Meyda
			if(Module.info.meyda) {
				Module.info.meyda.forEach(self.addMeydaFeature);
			}

			// Initialise Module
			Module.init(self.layers[0].canvas, Module.getScene(), self.threeEnv.material, self.threeEnv.texture);

			// finish up
			finish(Module, type);
		}

		// Handle ModuleScript
		if(Module instanceof self.ModuleScript) {
			type = 'ModuleScript';

			// Parse Meyda
			if(Module.info.meyda) {
				Module.info.meyda.forEach(self.addMeydaFeature);
			}

			// Initialise Module
			Module.init(/*self.layers[0].canvas*/self.previewCanvas, /*self.layers[0].context*/self.previewContext);

			// finish up
			finish(Module, type);
		}
	};

};