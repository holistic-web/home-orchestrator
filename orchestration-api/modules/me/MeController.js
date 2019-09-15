const { Router } = require('express');
const { getDocument, updateDocument } = require('../../clients/FirebaseClient');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { user } = req;
		return res.send(user);
	} catch (err) {
		next(err);
	}
});

router.patch('/networkId', async (req, res, next) => {
	try {
		const { _id: userId } = req.user;
		const { networkId } = req.body;
		const result = await updateDocument(`users/${userId}`, { networkId });
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

router.get('/network', async (req, res, next) => {
	try {
		const { networkId } = req.user;
		const network = await getDocument(`networks/${networkId}`);
		return res.send(network);
	} catch(err) {
		next(err);
	}
});

router.patch('/network', async (req, res, next) => {
	try {
		const { network } = req.body;
		const { networkId } = req.user;
		const result = await updateDocument(`networks/${networkId}`, network);
		return res.send(result);
	} catch(err) {
		next(err);
	}
});

module.exports = router;