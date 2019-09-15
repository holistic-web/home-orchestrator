const { HueApi } = require('node-hue-api');

module.exports = class HueClient {
	constructor(hueIP, username) {
		this.hueApi = new HueApi(hueIP, username);
	}

	async update(light) {
		const result = await this.hueApi.setLightState(
			light.meta.hueId,
			{
				on: light.state.on,
				bri: light.state.brightness,
				rgb: light.state.colour
			}
		);
		return result;
	}

	async turnOn(light) {
		const result = await this.hueApi.setLightState(light.meta.hueId, { on: true });
		return result;
	}

	async turnOff(light) {
		const result = await this.hueApi.setLightState(light.meta.hueId, { on: false });
		return result;
	}

	async setBrightness(brightness) {
		const result = await this.hueApi.setLightState(1, { bri: brightness });
		return result;
	}

	async setColour(colour) {
		const result = await this.hueApi.setLightState(1, { rgb: colour });
		return result;
	}

};
