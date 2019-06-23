const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getValidUser = require('../../lib/getValidUser');

exports.getTheme = functions.https.onCall(async (id, context) => {
	console.log('> getTheme~ called with: ' + JSON.stringify({ id, auth: context.auth }, null, 4));
	await getValidUser(context);

	// Fetch the theme
	const themeSnapshot = await admin.firestore().collection('themes').doc(id).get();
	const theme = themeSnapshot.data();
	return theme;
});

exports.getThemes = functions.https.onCall(async (data, context) => {
	console.log('> getThemes~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	await getValidUser(context);

	// Fetch the themes
	const themesSnapshot = await admin.firestore().collection('themes').get();
	const themes = themesSnapshot.docs.map(doc => doc.data());
	return themes;
});

exports.createTheme = functions.https.onCall(async (data, context) => {
	console.log('> createTheme~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	await getValidUser(context);

	const theme = {
		name: data.name,
		lights: data.lights
	};

	// Update the Database
	console.loguserSnap('> createTheme~ writing to themes collection');
	const themeDocumentRef = admin.firestore().collection('themes').doc();
	theme._id = themeDocumentRef.id;
	await themeDocumentRef.set(theme);
	return 'success';
});

exports.updateTheme = functions.https.onCall(async (data, context) => {
	console.log('> updateTheme~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	await getValidUser(context);

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
	console.log('> deleteTheme~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	await getValidUser(context);

	// Update the Database
	console.log('> updateTheme~ writing to themes collection');
	const themeDocumentRef = admin.firestore().collection('themes').doc(data._id);
	await themeDocumentRef.delete();
	return 'success';
});