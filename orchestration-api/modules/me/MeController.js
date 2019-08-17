const { Router } = require('express');
const { getDocument, updateDocument } = require('../../clients/FirebaseClient');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { userId } = req.query;
		const user = await getDocument(`users/${userId}`);
		return res.send(user);
	} catch (err) {
		next(err);
	}
});

router.patch('/networkId', async (req, res, next) => {
	try {
		const { userId, netwokId } = req.body;
		const result = await updateDocument(`users/${userId}`, { networkId });
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;