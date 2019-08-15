const IftttClient = require('./clients/IftttClient');
const HomeClient = require('./clients/HomeClient');

module.exports = class LightService {

	async updateLight(light, network) {
		console.log('> LightService/updateLight~ called with: ' + JSON.stringify({ light, network }, null, 4));

		let lightClient;
		if (light.type === 'hue' && !network.settings.lights.hue.useIFTTT) {
			lightClient = new HomeClient(network);
		} else {
			lightClient = new IftttClient(network.settings.IFTTT.key)
		}

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