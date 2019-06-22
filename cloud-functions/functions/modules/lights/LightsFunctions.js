const functions = require('firebase-functions');
const admin = require('firebase-admin');
const LightsController = require('./LightsController');

exports.getLights = functions.https.onCall(async (data, context) => {

	// Authenticate the request
	console.log('> getLights~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	const allowedUsers = [
		'kyliechung13@gmail.com', // Kylie
		'michael.fitzhavey@gmail.com', // Michael MGgWe75HRAeEsjEoLyVTHwydgVy1
		'andrew12lewis@gmail.com' // Andrew
	];
	const requestUserEmail = context.auth.token.email;
	if (!allowedUsers.includes(requestUserEmail)) throw new Error('not authenticated');

	// Fetch the lights
	const lightsSnapshots = await admin.firestore().collection('lights').get();
	const lights = lightsSnapshots.docs.map(doc => doc.data());
	return lights;
});

exports.updateLights = functions.https.onCall(async (lights, context) => {

	// Authenticate the request
	console.log('> updateLights~ called with: ' + JSON.stringify({ lights, auth: context.auth }, null, 4));
	const allowedUsers = [
		'kyliechung13@gmail.com', // Kylie
		'michael.fitzhavey@gmail.com', // Michael MGgWe75HRAeEsjEoLyVTHwydgVy1
		'andrew12lewis@gmail.com' // Andrew
	];
	const requestUserEmail = context.auth.token.email;
	if (!allowedUsers.includes(requestUserEmail)) throw new Error('not authenticated');

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
