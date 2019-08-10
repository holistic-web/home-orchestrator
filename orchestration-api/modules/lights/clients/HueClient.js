const { HueApi } = require('node-hue-api');

module.exports = class HueClient {
	constructor(hueIP, username) {
		this.hueApi = new HueApi(hueIP, username);
	}

	async turnOn(light) {
		await this.hueApi.setLightState(light.meta.hueId, { on: true });
	}

	async turnOff(light) {
		await this.hueApi.setLightState(light.meta.hueId, { on: false });
	}

	async setBrightness(brightness) {
		await this.hueApi.setLightState(1, { bri: brightness });
	}

	async setColour(colour) {
		await this.hueApi.setLightState(1, { rgb: colour });
	}

}