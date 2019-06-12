const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

class LightsController {

	async updateLight(light) {

		if (light.on) {
			await axios.post(this._getRequestPath(light, 'turn-on'));
		} else {
			await axios.post(this._getRequestPath(light, 'turn-off'));
		}

		if (light.state.scene) {
			await axios.post(this._getRequestPath(light, `set-scene-${light.state.scene}`));
		}

		if (light.state.brightness) {
			await axios.post(this._getRequestPath(light, 'set-brightness'), { value1: light.state.brightness });
		}

		if (light.state.colour) {
			await axios.post(this._getRequestPath(light, 'set-colour'), { value1: light.state.colour });
		}

	}

	async updateLights(lights) {
		const requests = lights.map(light => {
			this.updateLight(light);
		});
		await Promise.all(requests);
	}

	_getRequestPath(light, actionName) {
		let path = `https://maker.ifttt.com/trigger/${light.name}-${actionName}/with/key/${config.IFTTT_KEY}`;
		return path;
	}

}

exports.updateLights = functions.https.onCall(async (lights, context) => {

	// Authenticate the request
	const allowedUsers = [
		'7RAvkf9IHVSGEWeu5E3fUYR2dqi1', // Kylie
		'Op8k7VRQNkg0tK7GsCXks0jMj3l2' // Michael
	];
	const requestUserId = context.auth.uid;
	if (!allowedUsers.includes(requestUserId)) throw new Error('not authenticated');

	// Update the Database
	const batchWrite = admin.firestore().batch();
	lights.foreach(light => {
		lightRef = admin.firestore().collection('lights').document(light._id);
		batchWrite.update(lightRef, light);
	});
	await batchWrite.commit();

	// Update the lights
	const lightsController = new LightsController();
	await lightsController.updateLights(lights);

	return 'success'

});