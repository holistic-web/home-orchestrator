const { Router } = require('express');
const { getCollection, getDocument, createDocument, updateDocument, deleteDocument } = require('../../clients/FirebaseClient');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const path = `networks/${networkId}/themes`;
		const themes = await getCollection(path);
		return res.send(themes);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { theme, networkId } = req.body;
		const result = await createDocument(`networks/${networkId}/themes`, theme);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const { id: themeId } = req.params;
		const theme = await getDocument(`networks/${networkId}/themes/${themeId}`);
		return res.send(theme);
	} catch (err) {
		next(err);
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const { theme, networkId } = req.body;
		const themeId = req.params.id;
		const result = await updateDocument(`networks/${networkId}/themes/${themeId}`, theme);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const themeId = req.params.id;
		const result = await deleteDocument(`networks/${networkId}/themes/${themeId}`);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;