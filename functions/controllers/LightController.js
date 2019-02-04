const functions = require('firebase-functions');
const axios = require('axios');

const key = functions.config().ifttt.key;

buildPath = (lightController, actionName) => {
	if (!key) throw new Error('no "iftt.key" environment variable')
	let path = `https://maker.ifttt.com/trigger/${lightController.name}-${actionName}/with/key/${key}`;
	return path;
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
	async setBrightness(brightness) {
		console.log(`> Setting ${this.name} brightness: ${brightness}`);
		const path = buildPath(this, 'set-brightness');
		await axios.post(path, { value1: brightness });
	}

	/**
	 * Sets the light completely off
	 */
	async turnOff() {
		console.log(`> Turning ${this.name} off`);
		const path = buildPath(this, 'turn-off');
		await axios.post(path);
	}

	/**
	 * Sets the lightto a specific colour (must be configured on device and IFTTT)
	 * @param {string} colour new colour to display
	 */
	async setColour(colour) {
		console.log(`> Setting ${this.name} colour: ${colour}`);
		const actionName = `set-colour`;
		const path = buildPath(this, actionName);
		if (this.type === 'nanoleaf') colour = colour.substring(1);
		await axios.post(path, { value1: colour });
	}

}
