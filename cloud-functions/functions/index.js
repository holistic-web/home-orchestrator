const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const config = require('./config');

admin.initializeApp(functions.config().firebase);

class LightsController {

	async updateLight(light) {
		console.log('> LightsController/updateLight~ called with: ' + JSON.stringify(light, null, 4));

		console.log('> LightsController/updateLight~ settings light (on/off) state');
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
				console.log('> LightsController/updateLight~ setting light colour');
				await axios.post(this._getRequestPath(light, 'set-colour'), { value1: light.state.colour });
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
		let path = `https://maker.ifttt.com/trigger/${light.name}-${actionName}/with/key/${config.IFTTT_KEY}`;
		console.log('> LightsController/_getRequestPath~ generated request path: ' + path);
		return path;
	}

}

exports.updateLights = functions.https.onCall(async (lights, context) => {

	// Authenticate the request
	console.log('> updateLights~ called with: ' + JSON.stringify({ lights, auth: context.auth }, null, 4));
	const allowedUsers = [
		'7RAvkf9IHVSGEWeu5E3fUYR2dqi1', // Kylie
		'Op8k7VRQNkg0tK7GsCXks0jMj3l2' // Michael
	];
	const requestUserId = context.auth.uid;
	if (!allowedUsers.includes(requestUserId)) throw new Error('not authenticated');

	// Update the Database
	console.log('> updateLights~ writing to lights collection');
	const batchWrite = admin.firestore().batch();
	lights.forEach(light => {
		lightRef = admin.firestore().collection('lights').doc(light._id);
		batchWrite.update(lightRef, light);
	});
	await batchWrite.commit();

	// Update the lights
	console.log('> updateLights~ updating the lights\' state');
	const lightsController = new LightsController();
	await lightsController.updateLights(lights);

	console.log('> updateLights~ completed successfully');
	return 'success'
});