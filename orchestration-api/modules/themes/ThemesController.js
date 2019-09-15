const { Router } = require('express');
const { getCollection, getDocument, createDocument, updateDocument, deleteDocument } = require('../../clients/FirebaseClient');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { networkId } = req.user;
		const themes = await getCollection(`networks/${networkId}/themes`);
		return res.send(themes);
	} catch (err) {
		return next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { theme } = req.body;
		const { networkId } = req.user;
		const result = await createDocument(`networks/${networkId}/themes`, theme);
		return res.send(result);
	} catch (err) {
		return next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { id: themeId } = req.params;
		const { networkId } = req.user;
		const theme = await getDocument(`networks/${networkId}/themes/${themeId}`);
		return res.send(theme);
	} catch (err) {
		return next(err);
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const { theme } = req.body;
		const themeId = req.params.id;
		const { networkId } = req.user;
		const result = await updateDocument(`networks/${networkId}/themes/${themeId}`, theme);
		return res.send(result);
	} catch (err) {
		return next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const themeId = req.params.id;
		const { networkId } = req.user;
		const result = await deleteDocument(`networks/${networkId}/themes/${themeId}`);
		return res.send(result);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
