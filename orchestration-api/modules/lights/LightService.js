const axios = require('axios');

module.exports = class LightService {

	async updateLight(light, IFTTT_KEY) {
		console.log('> LightService/updateLight~ called with: ' + JSON.stringify(light, null, 4));

		console.log('> LightService/updateLight~ setting light (on/off) state');
		if (light.state.on) {
			await axios.post(this._getRequestPath(light, 'turn-on', IFTTT_KEY));

			if (light.state.scene) {
				console.log('> LightService/updateLight~ setting light scene');
				await axios.post(this._getRequestPath(light, `set-scene-${light.state.scene}`, IFTTT_KEY));
			}

			if (light.state.brightness) {
				console.log('> LightService/updateLight~ setting light brightness');
				await axios.post(this._getRequestPath(light, 'set-brightness', IFTTT_KEY), { value1: light.state.brightness });
			}

			if (light.state.colour) {

				// handle nanoleaf hex codes...
				let colour = light.state.colour;
				if (light.type === 'nanoleaf') colour = colour.replace('#', '');

				console.log('> LightService/updateLight~ setting light colour');
				await axios.post(this._getRequestPath(light, 'set-colour', IFTTT_KEY), { value1: colour });
			}

		} else {
			await axios.post(this._getRequestPath(light, 'turn-off', IFTTT_KEY));
		}

		console.log('> LightService/updateLight~ completed successfully');
		return 'success';
	}

	async updateLights(lights, IFTTT_KEY) {
		console.log('> LightsController/updateLights~ updating lights: ' + JSON.stringify(lights, null, 4));
		const requests = lights.map(light => {
			return this.updateLight(light, IFTTT_KEY);
		});
		await Promise.all(requests);
		console.log('> LightsController/updateLights~ completed successfully');
	}

	_getRequestPath(light, actionName, IFTTT_KEY) {
		let path = `https://maker.ifttt.com/trigger/${light.name}-${actionName}/with/key/${IFTTT_KEY}`;
		console.log('> LightsController/_getRequestPath~ generated request path: ' + path);
		return path;
	}

};