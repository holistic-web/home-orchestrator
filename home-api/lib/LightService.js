// const IftttClient = require('./clients/IftttClient');
const HueClient = require('./clients/HueClient');

module.exports = class LightService {

	async updateLight(light, network) {
		console.log('> LightService/updateLight~ called with: ' + JSON.stringify({ light, network }, null, 4));

		// get the correct light client
		const lightClient = new HueClient(
			network.settings.lights.hue.ipAddress,
			network.settings.lights.hue.username
		);


		await lightClient.update(light);

		console.log('> LightService/updateLight~ completed successfully');
		return 'success';
	}

	async updateLights(lights, network) {
		const requests = lights.map(light => {
			return this.updateLight(light, network);
		});
		await Promise.all(requests);
	}

};