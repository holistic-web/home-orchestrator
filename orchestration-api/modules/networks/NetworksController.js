const { Router } = require('express');
const { getCollection, updateDocument } = require('../../clients/FirebaseClient');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { email } = req.query;

		const networks = await getCollection('networks');

		const loadUsersPromises = networks.map(async network => {
			network.users = await getCollection(`networks/${network._id}/users`)
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
		const result = await updateDocument(`networks/${networkId}`, network);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;