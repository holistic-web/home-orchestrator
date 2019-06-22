const functions = require('firebase-functions');
const admin = require('firebase-admin');
const LightsController = require('./LightsController');

exports.getLights = functions.https.onCall(async (data, context) => {

	// Authenticate the request
	console.log('> getLights~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	const allowedUsers = [
		'7RAvkf9IHVSGEWeu5E3fUYR2dqi1', // Kylie
		'Op8k7VRQNkg0tK7GsCXks0jMj3l2', // Michael
		'6aICVvLNqbeVkvGlcOjddpvH1S63'	// Andrew
	];
	const requestUserId = context.auth.uid;
	if (!allowedUsers.includes(requestUserId)) throw new Error('not authenticated');

	// Fetch the lights
	const lightsSnapshots = await rootState.db.collection('lights').get();
	const lights = lightsSnapshots.docs.map(doc => doc.data());
	return lights;
});

exports.updateLights = functions.https.onCall(async (lights, context) => {

	// Authenticate the request
	console.log('> updateLights~ called with: ' + JSON.stringify({ lights, auth: context.auth }, null, 4));
	const allowedUsers = [
		'7RAvkf9IHVSGEWeu5E3fUYR2dqi1', // Kylie
		'Op8k7VRQNkg0tK7GsCXks0jMj3l2', // Michael
		'6aICVvLNqbeVkvGlcOjddpvH1S63'	// Andrew
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
