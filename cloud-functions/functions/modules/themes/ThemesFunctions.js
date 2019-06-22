const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.getTheme = functions.https.onCall(async (id, context) => {

	// Authenticate the request
	console.log('> getTheme~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	const allowedUsers = [
		'kyliechung13@gmail.com', // Kylie
		'michael.fitzhavey@gmail.com', // Michael MGgWe75HRAeEsjEoLyVTHwydgVy1
		'andrew12lewis@gmail.com' // Andrew
	];
	const requestUserEmail = context.auth.token.email;
	if (!allowedUsers.includes(requestUserEmail)) throw new Error('not authenticated');

	// Fetch the theme
	const themeRef = await admin.firestore().collection('themes').doc(id);
	const themeSnapshot = await themeRef.get();
	const theme = themeSnapshot.data();
	return theme;
});

exports.getThemes = functions.https.onCall(async (data, context) => {

	// Authenticate the request
	console.log('> getThemes~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	const allowedUsers = [
		'kyliechung13@gmail.com', // Kylie
		'michael.fitzhavey@gmail.com', // Michael MGgWe75HRAeEsjEoLyVTHwydgVy1
		'andrew12lewis@gmail.com' // Andrew
	];
	const requestUserEmail = context.auth.token.email;
	if (!allowedUsers.includes(requestUserEmail)) throw new Error('not authenticated');

	// Fetch the themes
	const themesSnapshot = await admin.firestore().collection('themes').get();
	const themes = themesSnapshot.docs.map(doc => doc.data());
	return themes;
});

exports.createTheme = functions.https.onCall(async (data, context) => {

	// Authenticate the request
	console.log('> createTheme~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	const allowedUsers = [
		'kyliechung13@gmail.com', // Kylie
		'michael.fitzhavey@gmail.com', // Michael MGgWe75HRAeEsjEoLyVTHwydgVy1
		'andrew12lewis@gmail.com' // Andrew
	];
	const requestUserEmail = context.auth.token.email;
	if (!allowedUsers.includes(requestUserEmail)) throw new Error('not authenticated');

	const theme = {
		name: data.name,
		lights: data.lights
	};

	// Update the Database
	console.log('> createTheme~ writing to themes collection');
	const themeDocumentRef = admin.firestore().collection('themes').doc();
	theme._id = themeDocumentRef.id;
	await themeDocumentRef.set(theme);
	return 'success';
});

exports.updateTheme = functions.https.onCall(async (data, context) => {

	// Authenticate the request
	console.log('> updateTheme~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	const allowedUsers = [
		'kyliechung13@gmail.com', // Kylie
		'michael.fitzhavey@gmail.com', // Michael MGgWe75HRAeEsjEoLyVTHwydgVy1
		'andrew12lewis@gmail.com' // Andrew
	];
	const requestUserEmail = context.auth.token.email;
	if (!allowedUsers.includes(requestUserEmail)) throw new Error('not authenticated');

	const theme = {
		name: data.name,
		lights: data.lights,
		_id: data._id
	};

	// Update the Database
	console.log('> updateTheme~ writing to themes collection');
	const themeDocumentRef = admin.firestore().collection('themes').doc(theme._id);
	await themeDocumentRef.set(theme);
	return 'success';
});

exports.deleteTheme = functions.https.onCall(async (data, context) => {

	// Authenticate the request
	const allowedUsers = [
		'kyliechung13@gmail.com', // Kylie
		'michael.fitzhavey@gmail.com', // Michael MGgWe75HRAeEsjEoLyVTHwydgVy1
		'andrew12lewis@gmail.com' // Andrew
	];
	const requestUserEmail = context.auth.token.email;
	if (!allowedUsers.includes(requestUserEmail)) throw new Error('not authenticated');

	// Update the Database
	console.log('> updateTheme~ writing to themes collection');
	const themeDocumentRef = admin.firestore().collection('themes').doc(data._id);
	await themeDocumentRef.delete();
	return 'success';
});