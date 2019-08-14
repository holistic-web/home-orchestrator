const { Router } = require('express');
const admin = require('firebase-admin');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const usersSnapshot = await admin.firestore().collection('networks').doc(networkId).collection('users').get();
		const users = usersSnapshot.docs.map(doc => doc.data());
		return res.send(users);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { user, networkId } = req.body;
		const userDocumentRef = await admin.firestore().collection('networks').doc(networkId).collection('users').doc(user.email);
		await userDocumentRef.set(user);
		return res.send('success');
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const userId = req.params.id;
		const userDoc = await admin.firestore().collection('networks').doc(networkId).collection('users').doc(userId).get();
		const user = userDoc.data();
		return res.send(user);
	} catch (err) {
		next(err);
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const { user, networkId } = req.body;
		const userId = req.params.id;
		const userDoc = await admin.firestore().collection('networks').doc(networkId).collection('users').doc(userId).get();
		await userDoc.update(user);
		return res.send('done');
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.query;
		const userId = req.params.id;
		const userDoc = await admin.firestore().collection('networks').doc(networkId).collection('users').doc(userId).get();
		await userDoc.delete();
		return res.send('done');
	} catch (err) {
		next(err);
	}
});

module.exports = router;