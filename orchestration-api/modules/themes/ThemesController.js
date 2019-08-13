const { Router } = require('express');
const admin = require('firebase-admin');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
		const { networkId } = req.body;
		const themesSnapshots = await admin.firestore().collection('networks').doc(networkId).collection('themes').get();
		const themes = themesSnapshots.docs.map(doc => doc.data());
		return res.send(themes);
    } catch (err) {
        next(err);
    }
});

module.exports = router;