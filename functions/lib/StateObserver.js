const functions = require('firebase-functions');
const LightController = require('../controllers/LightController');

module.exports = functions.database.ref().onWrite(async (change) => {
	const originalState = change.before.val().state;
	const newState = change.after.val().state;

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
				if (originalColour !== newColour) controller.setColour(newColour);
			} catch (err) {
				console.log(`> Error: ${err}`), err;
			}
		}
	}

	return;
});
