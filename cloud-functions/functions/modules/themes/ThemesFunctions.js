const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.createTheme = functions.https.onCall(async (theme, context) => {

	// Authenticate the request
	console.log('> createTheme~ called with: ' + JSON.stringify({ theme, auth: context.auth }, null, 4));
	const allowedUsers = [
		'7RAvkf9IHVSGEWeu5E3fUYR2dqi1', // Kylie
		'Op8k7VRQNkg0tK7GsCXks0jMj3l2', // Michael
		'6aICVvLNqbeVkvGlcOjddpvH1S63'	// Andrew
	];
	const requestUserId = context.auth.uid;
	if (!allowedUsers.includes(requestUserId)) throw new Error('not authenticated');

	// Update the Database
	console.log('> createTheme~ writing to themes collection');
	const result = await admin.firestore().collection('themes').add(theme);
	return result;
});
