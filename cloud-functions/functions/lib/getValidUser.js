const admin = require('firebase-admin');

module.exports = async (context, networkId) => {
	const requestEmail = context.auth.token.email;
	const networkDoc = admin.firestore().collection('networks').doc(networkId);
	const networkSnap = await networkDoc.get();
	const network = networkSnap.data();

	if (network.owner === requestEmail) {
		return {
			email: network.owner,
			role: 'owner'
		}
	}

	const userDoc = admin.firestore().collection('networks').doc(networkId).collection('users').doc(requestEmail);
	const userSnap = await userDoc.get();
	if (!userSnap.exists) throw new Error('not authenticated');
	const user = userSnap.data();
	return user;
}