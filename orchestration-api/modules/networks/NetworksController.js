const { Router } = require('express');
const admin = require('firebase-admin');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { email } = req.query;

		const networkSnaps = await admin.firestore().collection('networks').get();
		const networks = networkSnaps.docs.map(doc => doc.data());

		const loadUsersPromises = networks.map(async network => {
			const userSnaps = await admin.firestore().collection('networks').doc(network._id).collection('users').get();
			const users = userSnaps.docs.map(doc =>  doc.data());
			network.users = users;
		});

		await Promise.all(loadUsersPromises);

		const filteredNetworks = networks.filter(network => {
			if (network.owner === email) return true;
			let isNetworkUser = false;
			network.users.forEach(networkUser => {
				if (networkUser.email === email) {
					isNetworkUser = true;
				}
			});
			return isNetworkUser;
		});
		return res.send(filteredNetworks);

	} catch (err) {
		next(err);
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const networkId = req.params.id;
		const { network } = req.body;
		const networkDoc = await admin.firestore().collection('networks').doc(networkId).collection('users').doc(networkId).get();
		await networkDoc.update(network);
		return res.send('done');
	} catch (err) {
		next(err);
	}
});

module.exports = router;