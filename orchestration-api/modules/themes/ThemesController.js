const { Router } = require('express');
const admin = require('firebase-admin');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const themesSnapshots = await admin.firestore().collection('networks').doc(networkId).collection('themes').get();
		const themes = themesSnapshots.docs.map(doc => doc.data());
		return res.send(themes);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { theme, networkId } = req.body;
		const themeDocumentRef = admin.firestore().collection('networks').doc(networkId).collection('themes').doc();
		theme._id = themeDocumentRef.id;
		await themeDocumentRef.set(theme);
		return res.send(theme);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const themeId = req.params.id;
		const themeSnapshot = await admin.firestore().collection('networks').doc(networkId).collection('themes').doc(themeId).get();
		const theme = themeSnapshot.data();
		return res.send(theme);
	} catch (err) {
		next(err);
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const { theme, networkId } = req.body;
		const themeId = req.params.id;
		const themeDocumentRef = admin.firestore().collection('networks').doc(networkId).collection('themes').doc(themeId);
		await themeDocumentRef.update(theme);
		return res.send('done');
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const themeId = req.params.id;
		const themeDocumentRef = admin.firestore().collection('networks').doc(networkId).collection('themes').doc(themeId);
		await themeDocumentRef.delete();
		return res.send('done');
	} catch (err) {
		next(err);
	}
});

module.exports = router;