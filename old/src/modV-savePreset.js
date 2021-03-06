const {forIn} = require('./utils');


module.exports = function(modV) {

	modV.prototype.savePreset = function(name, profile) {
			
		let preset = this.generatePreset(name);
		
		this.presets[name] = preset;
		console.info(preset, this.presets[name]);

		let presetSelectNode = document.querySelector('#loadPresetSelect');
		presetSelectNode.innerHTML = '';

		forIn(this.presets, presetName => {
			var optionNode = document.createElement('option');
			optionNode.value = presetName;
			optionNode.textContent = presetName;

			presetSelectNode.appendChild(optionNode);
		});

		if(this.mediaManager.available) {
			this.mediaManager.sendJSON({
				request: 'save-preset',
				profile: profile,
				payload: preset,
				name: name
			});
		}
	};
};