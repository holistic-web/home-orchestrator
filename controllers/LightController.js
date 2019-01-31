require('dotenv').config()
const axios = require('axios');

const key = process.env.IFTTT_WEBHOOK_KEY;

buildPath = (lightController, actionName) => {
	if (!key) throw new Error('no "IFTTT_WEBHOOK_KEY" environment variable')
	let path = `https://maker.ifttt.com/trigger/${lightController.type}-${actionName}/with/key/${key}`;
	return path
}

module.exports = class LightController {

	constructor({ name, type }) {
		this.name = name;
		this.type = type;
	}

	/**
	 * Sets the brightness of the light
	 * @param {number} brightness [1-100] new brightness value
	 */
	setBrightness(brightness) {
		const path = buildPath(this, 'set-brightness');
		axios.post(path, { value1: brightness });
	}

	/**
	 * Sets the light completely off
	 */
	turnOff() {
		const path = buildPath(this, 'turn-off');
		axios.post(path);
	}

	/**
	 * Sets the lightto a specific scene (must be configured on device and IFTTT)
	 * @param {string} scene new scene to display
	 */
	setScene(scene) {
		const actionName = `set-scene-${scene}`
		const path = buildPath(this, actionName);
		axios.post(path);
	}

}
