const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getValidUser = require('../../lib/getValidUser');

exports.getTheme = functions.https.onCall(async ({ id, networkId }, context) => {
	console.log('> getTheme~ called with: ' + JSON.stringify({ id, networkId, auth: context.auth }, null, 4));
	await getValidUser(context);

	// Fetch the theme
	const themeSnapshot = await admin.firestore().collection('networks').doc(networkId).collection('themes').doc(id).get();
	const theme = themeSnapshot.data();
	return theme;
});

exports.getThemes = functions.https.onCall(async (networkId, context) => {
	console.log('> getThemes~ called with: ' + JSON.stringify({ networkId, auth: context.auth }, null, 4));
	await getValidUser(context);

	// Fetch the themes
	const themesSnapshot = await admin.firestore().collection('networks').doc(networkId).collection('themes').get();
	const themes = themesSnapshot.docs.map(doc => doc.data());
	return themes;
});

exports.createTheme = functions.https.onCall(async ({ theme, networkId }, context) => {
	console.log('> createTheme~ called with: ' + JSON.stringify({ theme, networkId, auth: context.auth }, null, 4));
	await getValidUser(context);

	theme = {
		name: data.name,
		lights: data.lights
	};

	// Update the Database
	console.log('> createTheme~ writing to themes collection');
	const themeDocumentRef = admin.firestore().collection('networks').doc(networkId).collection('themes').doc();
	theme._id = themeDocumentRef.id;
	await themeDocumentRef.set(theme);
	return 'success';
});

exports.updateTheme = functions.https.onCall(async ({ theme, networkId}, context) => {
	console.log('> updateTheme~ called with: ' + JSON.stringify({ theme, networkId, auth: context.auth }, null, 4));
	await getValidUser(context);

	theme = {
		name: theme.name,
		lights: theme.lights,
		_id: theme._id
	};

	// Update the Database
	console.log('> updateTheme~ writing to themes collection');
	const themeDocumentRef = admin.firestore()..collection('networks').doc(networkId).collection('themes').doc(theme._id);
	await themeDocumentRef.set(theme);
	return 'success';
});

exports.deleteTheme = functions.https.onCall(async ({ theme, networkId }, context) => {
	console.log('> deleteTheme~ called with: ' + JSON.stringify({ theme, networkId, auth: context.auth }, null, 4));
	await getValidUser(context);

	// Update the Database
	console.log('> updateTheme~ writing to themes collection');
	const themeDocumentRef = admin.firestore().collection('networkId').doc(networkId).collection('themes').doc(data._id);
	await themeDocumentRef.delete();
	return 'success';
});