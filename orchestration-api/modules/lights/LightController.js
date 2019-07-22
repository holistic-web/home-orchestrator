const { Router } = require('express');
const admin = require('firebase-admin');
const LightService = require('./LightService');

const router = Router();
const lightService = new LightService();

router.post('/update', async (req, res) => {
	console.log('req: ', req);
	console.log('req.body: ', req.body);
	console.log('req.data: ', req.data);

	const { lights, networkId } = req.body;
	console.log('> lights/update~ called with: ' + JSON.stringify({ lights, networkId }, null, 4));

	// Update the Database
	const batchWrite = admin.firestore().batch();
	lights.forEach(light => {
		lightRef = admin.firestore().collection('networks').doc(networkId).collection('lights').doc(light._id);
		batchWrite.update(lightRef, light);
	});
	await batchWrite.commit();

	// Get the IFTTT key
	const networkDoc = admin.firestore().collection('networks').doc(networkId);
	const networkSnap = await networkDoc.get();
	const network = networkSnap.data();
	const IFTTT_KEY = network.variables.IFTTT_KEY;

	// Update the lights
	console.log('> updateLights~ updating the lights\' state');
	await lightService.updateLights(lights, IFTTT_KEY);

	return res.send();
});

module.exports = router;