const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getValidUser = require('../../lib/getValidUser');

exports.getNetworks = functions.https.onCall(async (data, context) => {
	console.log('> getNetworks~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	await getValidUser(context);

	// Fetch the networks
	const networksSnapshots = await admin.firestore().collection('networks').get();
	const themes = networksSnapshots.docs.map(doc => doc.data());
	return themes;
});