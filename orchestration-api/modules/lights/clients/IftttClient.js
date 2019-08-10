const axios = require('axios');
const rgbHex = require('rgb-hex');

module.exports = class IftttClient {
	constructor(IFTTT_KEY) {
		this.IFTTT_KEY = IFTTT_KEY;
	}

	async turnOn(light) {
		await axios.post(this._getRequestPath(light, 'turn-on'));
	}

	async turnOff(light) {
		await axios.post(this._getRequestPath(light, 'turn-off'));
	}

	async setBrightness(light, brightness) {
		const adjustedBrightness = brightness * (100 / 255);
		await axios.post(this._getRequestPath(light, 'set-brightness'), { value1: adjustedBrightness });
	}

	async setColour(light, colour) {
		let hexColour = rgbHex(colour);
		// handle nanoleaf hex codes...
		if (light.type === 'nanoleaf') hexColour = hexColour.replace('#', '');
		await axios.post(this._getRequestPath(light, 'set-colour'), { value1: hexColour });
	}

	async setScene(light, scene) {
		await axios.post(this._getRequestPath(light, `set-scene-${scene}`));
	}

	_getRequestPath(light, actionName) {
		let path = `https://maker.ifttt.com/trigger/${light.name}-${actionName}/with/key/${this.IFTTT_KEY}`;
		return path;
	}
}