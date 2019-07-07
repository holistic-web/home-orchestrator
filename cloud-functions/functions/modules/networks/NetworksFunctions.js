const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getValidUser = require('../../lib/getValidUser');

exports.getNetworks = functions.https.onCall(async (data, context) => {
	console.log('> getNetworks~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	const user = await getValidUser(context);

	// Fetch the networks
	const networksSnapshots = await admin.firestore().collection('networks').get();
	const networks = networksSnapshots.docs.map(doc => doc.data());
	console.log('networks: ', networks);

	const filteredNetworks = networks.filter(network => {
		const users = Object.keys(network.users);
		return (network.owner === user.email
			|| users.includes(user.email));
	});
	console.log('filteredNetworks: ', filteredNetworks);
	return filteredNetworks
});
