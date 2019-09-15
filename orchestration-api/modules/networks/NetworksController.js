const { Router } = require('express');
const { getCollection, getDocument } = require('../../clients/FirebaseClient');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { _id: userId } = req.user;
		const networks = await getCollection('networks');

		const loadUsersPromises = networks.map(async network => {
			network.users = await getCollection(`networks/${network._id}/users`);
			network.owner = await getDocument(`users/${network.ownerId}`);
		});
		await Promise.all(loadUsersPromises);

		const filteredNetworks = networks.filter(network => {
			if (network.ownerId === userId) return true;
			let isNetworkUser = false;
			network.users.forEach(networkUser => {
				if (networkUser.userId === userId) {
					isNetworkUser = true;
				}
			});
			return isNetworkUser;
		});
		return res.send(filteredNetworks);

	} catch (err) {
		return next(err);
	}
});

module.exports = router;
