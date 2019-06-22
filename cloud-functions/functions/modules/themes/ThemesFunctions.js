const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.getTheme = functions.https.onCall(async (id, context) => {

	// Authenticate the request
	console.log('> getTheme~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	const allowedUsers = [
		'7RAvkf9IHVSGEWeu5E3fUYR2dqi1', // Kylie
		'Op8k7VRQNkg0tK7GsCXks0jMj3l2', // Michael
		'6aICVvLNqbeVkvGlcOjddpvH1S63'	// Andrew
	];
	const requestUserId = context.auth.uid;
	if (!allowedUsers.includes(requestUserId)) throw new Error('not authenticated');

	// Fetch the theme
	const themeRef = rootState.db.collection('themes').doc(id);
	const themeSnapshot = await themeRef.get();
	const theme = themeSnapshot.data();
	return theme;
});

exports.getThemes = functions.https.onCall(async (data, context) => {

	// Authenticate the request
	console.log('> getThemes~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	const allowedUsers = [
		'7RAvkf9IHVSGEWeu5E3fUYR2dqi1', // Kylie
		'Op8k7VRQNkg0tK7GsCXks0jMj3l2', // Michael
		'6aICVvLNqbeVkvGlcOjddpvH1S63'	// Andrew
	];
	const requestUserId = context.auth.uid;
	if (!allowedUsers.includes(requestUserId)) throw new Error('not authenticated');

	// Fetch the themes
	const themesSnapshot = await rootState.db.collection('themes').get();
	const themes = themesSnapshot.docs.map(doc => doc.data());
	return themes;
});

exports.createTheme = functions.https.onCall(async (data, context) => {

	// Authenticate the request
	console.log('> createTheme~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	const allowedUsers = [
		'7RAvkf9IHVSGEWeu5E3fUYR2dqi1', // Kylie
		'Op8k7VRQNkg0tK7GsCXks0jMj3l2', // Michael
		'6aICVvLNqbeVkvGlcOjddpvH1S63'	// Andrew
	];
	const requestUserId = context.auth.uid;
	if (!allowedUsers.includes(requestUserId)) throw new Error('not authenticated');

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
		'7RAvkf9IHVSGEWeu5E3fUYR2dqi1', // Kylie
		'Op8k7VRQNkg0tK7GsCXks0jMj3l2', // Michael
		'6aICVvLNqbeVkvGlcOjddpvH1S63'	// Andrew
	];
	const requestUserId = context.auth.uid;
	if (!allowedUsers.includes(requestUserId)) throw new Error('not authenticated');

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
	console.log('> updateTheme~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	const allowedUsers = [
		'7RAvkf9IHVSGEWeu5E3fUYR2dqi1', // Kylie
		'Op8k7VRQNkg0tK7GsCXks0jMj3l2', // Michael
		'6aICVvLNqbeVkvGlcOjddpvH1S63'	// Andrew
	];
	const requestUserId = context.auth.uid;
	if (!allowedUsers.includes(requestUserId)) throw new Error('not authenticated');

	// Update the Database
	console.log('> updateTheme~ writing to themes collection');
	const themeDocumentRef = admin.firestore().collection('themes').doc(data._id);
	await themeDocumentRef.delete();
	return 'success';
});