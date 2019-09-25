const { Router } = require('express');
const { getDocument, updateDocument } = require('../../clients/FirebaseClient');
const { getUserRole } = require('../../lib/SecurityService');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { user } = req;
		return res.send(user);
	} catch (err) {
		return next(err);
	}
});

router.patch('/networkId', async (req, res, next) => {
	try {
		const { _id: userId } = req.user;
		const { networkId } = req.body;

		const requestUserRole = await getUserRole(userId, networkId);
		if (!requestUserRole) throw new Error('Not authorized');

		const result = await updateDocument(`users/${userId}`, { networkId });
		return res.send(result);
	} catch (err) {
		return next(err);
	}
});

router.get('/network', async (req, res, next) => {
	try {
		const { networkId } = req.user;
		const network = await getDocument(`networks/${networkId}`);
		return res.send(network);
	} catch (err) {
		return next(err);
	}
});

router.patch('/network', async (req, res, next) => {
	try {
		const { network } = req.body;
		const { networkId } = req.user;

		const requestUserRole = await getUserRole(req.user._id, networkId);
		if (!['admin', 'owner'].includes(requestUserRole)) throw new Error('Not authorized');

		const result = await updateDocument(`networks/${networkId}`, network);
		return res.send(result);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
