const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getValidUser = require('../../lib/getValidUser');
const LightsController = require('./LightsController');

exports.getLights = functions.https.onCall(async (networkId, context) => {
	console.log('> getLights~ called with: ' + JSON.stringify({ networkId, auth: context.auth }, null, 4));
	await getValidUser(context);

	// Fetch the lights\
	const lightsSnapshots = await admin.firestore().collection('networks').doc(networkId).collection('lights').get();
	const lights = lightsSnapshots.docs.map(doc => doc.data());
	return lights;
});

exports.updateLights = functions.https.onCall(async ({ lights, networkId }, context) => {
	console.log('> updateLights~ called with: ' + JSON.stringify({ lights, networkId,  auth: context.auth }, null, 4));
	await getValidUser(context);

	// Update the Database
	console.log('> updateLights~ writing to lights collection');
	const batchWrite = admin.firestore().batch();
	lights.forEach(light => {
		lightRef = admin.firestore().collection('networks').doc(networkId).collection('lights').doc(light._id);
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
