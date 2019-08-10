const IftttClient = require('./clients/IftttClient');
const HueClient = require('./clients/HueClient');

module.exports = class LightService {

	async updateLight(light, network) {
		console.log('> LightService/updateLight~ called with: ' + JSON.stringify(light, null, 4));

		// get the correct light client
		let lightClient;
		if (light.type === 'hue') {
			if (network.settings.lights.hue.useIFTTT) {
				lightClient = new IftttClient(network.settings.IFTTT.key)
			} else {
				lightClient = new HueClient(
					network.settings.lights.hue.ipAddress,
					network.settings.lights.hue.username
				);
			}
		} else {
			lightClient = new IftttClient(network.settings.IFTTT.key)
		}

		console.log('> LightService/updateLight~ setting light (on/off) state');
		if (light.state.on) {
			await lightClient.turnOn(light);

			if (light.type === 'nanoleaf' && light.state.scene) {
				console.log('> LightService/updateLight~ setting light scene');
				await lightClient.setScene(light, light.state.scene)
			}

			if (light.state.brightness) {
				console.log('> LightService/updateLight~ setting light brightness');
				await lightClient.setBrightness(light, light.state.brightness);
			}

			if (light.state.colour) {
				console.log('> LightService/updateLight~ setting light colour');
				await lightClient.setColour(light, light.state.colour);
			}

		} else {
			await lightClient.turnOff(light);
		}

		console.log('> LightService/updateLight~ completed successfully');
		return 'success';
	}

	async updateLights(lights, network) {
		console.log('> LightsController/updateLights~ updating lights: ' + JSON.stringify(lights, null, 4));
		const requests = lights.map(light => {
			return this.updateLight(light, network);
		});
		await Promise.all(requests);
		console.log('> LightsController/updateLights~ completed successfully');
	}

};