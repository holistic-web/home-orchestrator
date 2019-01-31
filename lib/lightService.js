const axios = require('axios');
const lightConfig = require('./config/lights');

const lights = ['nanoleaf', 'room', 'lamp'];

/**
 * Sets the brightness of all lights
 * @param {number} brightness [1-100] new brightness value
 */
exports.setAllBrightness = (brightness) => {
	lights.forEach(light => {
		const path = lightConfig[light].endpoints.setBrightness;
		axios.post(path, { value1: brightness });
	});
}
