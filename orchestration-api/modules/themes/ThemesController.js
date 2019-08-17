const { Router } = require('express');
const admin = require('firebase-admin');
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
		const path = `networks/${networkId}/themes`;
		const result = await createDocument(path, theme);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const { id: themeId } = req.params;
		const path = `networks/${networkId}/themes/${themeId}`;
		const theme = await getDocument(path);
		return res.send(theme);
	} catch (err) {
		next(err);
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const { theme, networkId } = req.body;
		const themeId = req.params.id;
		const path = `networks/${networkId}/themes/${themeId}`;
		const result = await updateDocument(path, theme);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const themeId = req.params.id;
		const path = `networks/${networkId}/themes/${themeId}`;
		const result = await deleteDocument(path);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;