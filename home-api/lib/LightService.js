const HueClient = require('./clients/HueClient');

module.exports = class LightService {

	async updateLight(light, network) {
		const lightClient = new HueClient(
			network.settings.lights.hue.ipAddress,
			network.settings.lights.hue.username
		);

		await lightClient.update(light);
		return 'success';
	}

	async updateLights(lights, network) {
		const requests = lights.map(light => {
			return this.updateLight(light, network);
		});
		await Promise.all(requests);
	}

};