const functions = require('firebase-functions');
const LightController = require('./controllers/LightController');

exports.lightController = functions.database.ref().onWrite(async (change, context) => {
	const originalState = change.before.val();
	const newState = change.after.val();

	const lightNames = Object.keys(newState.lights);
	for (let i=0; i<lightNames.length; i++) {

		const lightName = lightNames[i];
		const controller = new LightController({ name: lightName, type: newState.lights[lightName].meta.type });

		const originalBrightness = originalState.lights[lightName].brightness;
		const newBrightness = newState.lights[lightName].brightness;
		try {
			if (originalBrightness !== newBrightness) await controller.setBrightness(newBrightness);
		} catch (err) {
			console.log(`> Error: ${err}`, err);
		}

		const originalScene = originalState.lights[lightName].brightness;
		const newScene = newState.lights[lightName].brightness;
		try {
			if (originalScene !== newScene) await controller.setScene(newScene);
		} catch (err) {
			console.log(`> Error: ${err}`), err;
		}

	}

	return true;
});
