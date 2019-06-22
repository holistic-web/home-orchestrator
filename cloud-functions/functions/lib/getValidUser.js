const admin = require('firebase-admin');

module.exports = async (context) => {
	const requestEmail = context.auth.token.email;
	const userDoc = admin.firestore().collection('users').doc(requestEmail);
	const userSnap = await userDoc.get();
	if (!userSnap.exists) throw new Error('not authenticated');
	const user = userSnap.data();
	return user;
}