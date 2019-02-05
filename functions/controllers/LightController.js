/* Adds listeners to the firebase database and effects the lights through IFTTT */

const functions = require('firebase-functions');
const axios = require('axios');

const key = functions.config().ifttt.key;

buildPath = (lightController, actionName) => {
	if (!key) throw new Error('no "iftt.key" environment variable')
	let path = `https://maker.ifttt.com/trigger/${lightController.name}-${actionName}/with/key/${key}`;
	return path;
}

class LightController {

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
		console.log(`> Setting ${this.name} colour: ${colour}`);
		const actionName = `set-colour`;
		const path = buildPath(this, actionName);
		if (this.type === 'nanoleaf' && colour[0] === '#') colour = colour.substring(1);
		await axios.post(path, { value1: colour });
	}

}

module.exports = functions.database.ref().onWrite(async (change) => {
	const originalState = change.before.val();
	const newState = change.after.val();

	const lightNames = Object.keys(newState.lights);
	for (let i=0; i<lightNames.length; i++) {

		const lightName = lightNames[i];
		const controller = new LightController({ name: lightName, type: newState.lights[lightName].meta.type });

		const isOff = newState.lights[lightName].off;
		const wasOff = originalState.lights[lightName].off;
		if (isOff) {
			controller.turnOff();
		} else {
			const originalBrightness = originalState.lights[lightName].brightness;
			const newBrightness = newState.lights[lightName].brightness;
			try {
				if (originalBrightness !== newBrightness || wasOff) controller.setBrightness(newBrightness);
			} catch (err) {
				console.log(`> Error: ${err}`, err);
			}

			const originalColour = originalState.lights[lightName].colour;
			const newColour = newState.lights[lightName].colour;
			try {
				if (originalColour !== newColour) await controller.setColour(newColour);
			} catch (err) {
				console.log(`> Error: ${err}`), err;
			}
		}
	}

	return;
});
