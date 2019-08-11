const axios = require('axios');
const rgbHex = require('rgb-hex');

module.exports = class IftttClient {
	constructor(IFTTT_KEY) {
		this.IFTTT_KEY = IFTTT_KEY;
	}

	async update(light) {
		if (light.state.on) {
			await this.turnOn(light);

			if (light.type === 'nanoleaf' && light.state.scene) {
				await this.setScene(light, light.state.scene)
			}

			if (light.state.brightness) {
				await this.setBrightness(light, light.state.brightness);
			}

			if (light.state.colour) {
				await this.setColour(light, light.state.colour);
			}

		} else {
			await this.turnOff(light);
		}

		return 'done';
	}

	async turnOn(light) {
		const result = await axios.post(this._getRequestPath(light, 'turn-on'));
		return result;
	}

	async turnOff(light) {
		const result = await axios.post(this._getRequestPath(light, 'turn-off'));
		return result;
	}

	async setBrightness(light, brightness) {
		const adjustedBrightness = brightness * (100 / 255);
		const result = await axios.post(this._getRequestPath(light, 'set-brightness'), { value1: adjustedBrightness });
		return result;
	}

	async setColour(light, colour) {
		let hexColour = rgbHex(colour);
		// handle nanoleaf hex codes...
		if (light.type === 'nanoleaf') hexColour = hexColour.replace('#', '');
		const result = await axios.post(this._getRequestPath(light, 'set-colour'), { value1: hexColour });
		return result;
	}

	async setScene(light, scene) {
		const result = await axios.post(this._getRequestPath(light, `set-scene-${scene}`));
		return result;
	}

	_getRequestPath(light, actionName) {
		const path = `https://maker.ifttt.com/trigger/${light.name}-${actionName}/with/key/${this.IFTTT_KEY}`;
		return path;
	}
}