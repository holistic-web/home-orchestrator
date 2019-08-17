const { Router } = require('express');
const { getCollection, getDocument, setDocument, updateDocument, deleteDocument } = require('../../clients/FirebaseClient');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const users = await getCollection(`networks/${networkId}/users`);
		return res.send(users);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { user, networkId } = req.body;
		const result = await setDocument(`/networks/${networkId}/users/${user.email}`, user);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const { id: userId } = req.params;
		const user = await getDocument(`networks/${networkId}/users/${userId}`);
		return res.send(user);
	} catch (err) {
		next(err);
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const { user, networkId } = req.body;
		const { id: userId } = req.params;
		const result = await updateDocument(`networks/${networkId}/users/${userId}`, user);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const { id: userId } = req.params;
		const result = await deleteDocument(`networks/${networkId}/users/${userId}`)
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;