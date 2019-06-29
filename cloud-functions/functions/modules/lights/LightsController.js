const axios = require('axios');

class LightsController {

	async updateLight(light) {
		console.log('> LightsController/updateLight~ called with: ' + JSON.stringify(light, null, 4));

		console.log('> LightsController/updateLight~ setting light (on/off) state');
		if (light.state.on) {
			await axios.post(this._getRequestPath(light, 'turn-on'));

			if (light.state.scene) {
				console.log('> LightsController/updateLight~ setting light scene');
				await axios.post(this._getRequestPath(light, `set-scene-${light.state.scene}`));
			}

			if (light.state.brightness) {
				console.log('> LightsController/updateLight~ setting light brightness');
				await axios.post(this._getRequestPath(light, 'set-brightness'), { value1: light.state.brightness });
			}

			if (light.state.colour) {

				// handle nanoleaf hex codes...
				let colour = light.state.colour;
				if (light.type === 'nanoleaf') colour = colour.replace('#', '');

				console.log('> LightsController/updateLight~ setting light colour');
				await axios.post(this._getRequestPath(light, 'set-colour'), { value1: colour });
			}

		} else {
			await axios.post(this._getRequestPath(light, 'turn-off'));
		}

		console.log('> LightsController/updateLight~ completed successfully');
		return 'success';
	}

	async updateLights(lights) {
		console.log('> LightsController/updateLights~ updating lights: ' + JSON.stringify(lights, null, 4));
		const requests = lights.map(light => {
			return this.updateLight(light);
		});
		await Promise.all(requests);
		console.log('> LightsController/updateLights~ completed successfully');
	}

	_getRequestPath(light, actionName) {
		const IFTTT_KEY = light.key;
		let path = `https://maker.ifttt.com/trigger/${light.name}-${actionName}/with/key/${IFTTT_KEY}`;
		console.log('> LightsController/_getRequestPath~ generated request path: ' + path);
		return path;
	}

}

module.exports = LightsController;