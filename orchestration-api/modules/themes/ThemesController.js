const { Router } = require('express');
const { getCollection, getDocument, createDocument, updateDocument, deleteDocument } = require('../../clients/FirebaseClient');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { userId } = req.query;
		const { networkId } = await getDocument(`users/${userId}`);
		const themes = await getCollection(`networks/${networkId}/themes`);
		return res.send(themes);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { theme, userId } = req.body;
		const { networkId } = await getDocument(`users/${userId}`);
		const result = await createDocument(`networks/${networkId}/themes`, theme);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { userId } = req.query;
		const { id: themeId } = req.params;
		const { networkId } = await getDocument(`users/${userId}`);
		const theme = await getDocument(`networks/${networkId}/themes/${themeId}`);
		return res.send(theme);
	} catch (err) {
		next(err);
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const { theme, userId } = req.body;
		const themeId = req.params.id;
		const { networkId } = await getDocument(`users/${userId}`);
		const result = await updateDocument(`networks/${networkId}/themes/${themeId}`, theme);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { userId } = req.query;
		const themeId = req.params.id;
		const { networkId } = await getDocument(`users/${userId}`);
		const result = await deleteDocument(`networks/${networkId}/themes/${themeId}`);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;