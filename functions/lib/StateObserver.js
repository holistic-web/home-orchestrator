const functions = require('firebase-functions');
const LightController = require('../controllers/LightController');
// const AlarmController = require('../controllers/AlarmController');
const LightService = require('./LightService');

module.exports = functions.database.ref().onWrite(async (change) => {
	const originalState = change.before.val().state;
	const newState = change.after.val().state;

	// const isAlarmActive = newState.alarm.active;
	// const wasAlarmActive = originalState.alarm.active;

	// if (isAlarmActive !== wasAlarmActive) {
	// 	const alarmController = new AlarmController();
	// 	if (isAlarmActive) {
	// 		alarmController.triggerAlarm();
	// 	} else {
	// 		LightService.setTheme('morning');
	// 	}
	// }

	const lightNames = Object.keys(newState.lights);
	for (let i=0; i<lightNames.length; i++) {

		const lightName = lightNames[i];
		const lightController = new LightController({ name: lightName, type: newState.lights[lightName].meta.type });

		const isOff = newState.lights[lightName].off;
		const wasOff = originalState.lights[lightName].off;
		if (isOff) {
			lightController.turnOff();
		} else {

			const originalBrightness = originalState.lights[lightName].brightness;
			const newBrightness = newState.lights[lightName].brightness;
			try {
				if (originalBrightness !== newBrightness || wasOff) lightController.setBrightness(newBrightness);
			} catch (err) {
				console.log(`> Error: ${err}`, err);
			}

			const originalColour = originalState.lights[lightName].colour;
			const newColour = newState.lights[lightName].colour;
			try {
				if (originalColour !== newColour) lightController.setColour(newColour);
			} catch (err) {
				console.log(`> Error: ${err}`), err;
			}

			const originalScene = originalState.lights[lightName].scene;
			const newScene = newState.lights[lightName].scene;
			try {
				if (originalScene !== newScene) lightController.setScene(newScene);
			} catch (err) {
				console.log(`> Error: ${err}`), err;
			}

		}
	}

	return;
});
