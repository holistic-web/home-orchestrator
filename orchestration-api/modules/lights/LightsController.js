const { Router } = require('express');
const admin = require('firebase-admin');
const LightService = require('./LightService');

const router = Router();
const lightService = new LightService();

router.post('/update', async (req, res, next) => {
	try {
		const { lights, networkId } = req.body;
		console.log('> lights/update~ called with: ' + JSON.stringify({ lights, networkId }, null, 4));

		// Update the Database
		const batchWrite = admin.firestore().batch();
		lights.forEach(light => {
			lightRef = admin.firestore().collection('networks').doc(networkId).collection('lights').doc(light._id);
			batchWrite.update(lightRef, light);
		});
		await batchWrite.commit();

		// Get the network
		const networkDoc = admin.firestore().collection('networks').doc(networkId);
		const networkSnap = await networkDoc.get();
		const network = networkSnap.data();

		// Update the lights
		console.log('> updateLights~ updating the lights\' state');
		await lightService.updateLights(lights, network);

		return res.send('done');

	} catch (err) {
		next(err);
	}
});

router.get('/', async (req, res, next) => {
    try {
		const { networkId } = req.query;
		const lightsSnapshots = await admin.firestore().collection('networks').doc(networkId).collection('lights').get();
		const lights = lightsSnapshots.docs.map(doc => doc.data());
		return res.send(lights);
    } catch (err) {
        next(err);
    }
});

module.exports = router;