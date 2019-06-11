/* Adds listeners to the firebase database and affects the lights through IFTTT */

const axios = require('axios');
const config = require('../config');

buildPath = (lightController, actionName) => {
	let path = `https://maker.ifttt.com/trigger/${lightController.name}-${actionName}/with/key/${config.IFTTT_KEY}`;
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
		if (!brightness) return;
		console.log(`> Setting ${this.name} brightness: ${brightness}`);
		let path = buildPath(this, 'set-brightness');
		if (brightness === 0)  path = buildPath(this, 'turn-off');
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
		if (!colour) return;
		console.log(`> Setting ${this.name} colour: ${colour}`);
		const actionName = `set-colour`;
		const path = buildPath(this, actionName);
		if (this.type === 'nanoleaf' && colour[0] === '#') colour = colour.substring(1);
		await axios.post(path, { value1: colour });
	}

	/**
	 * Sets the lightto a specific scene (must be configured on device and IFTTT)
	 * @param {string} scene new scene to display
	 */
	async setScene(scene) {
		if (!this.type === 'nanoleaf') throw new Error('set scene called on a non nanoleaf device');
		console.log(`> Setting ${this.name} scene: ${scene}`);
		const actionName = `set-scene-${scene}`;
		const path = buildPath(this, actionName);
		await axios.post(path);
	}

}
