const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getValidUser = require('../../lib/getValidUser');

exports.getUser = functions.https.onCall(async (email, context) => {
	console.log('> getUser~ called with: ' + JSON.stringify({ email, auth: context.auth }, null, 4));
	await getValidUser(context);

	// Fetch the user
	const userDoc = admin.firestore().collection('users').doc(email);
	const userSnap = await userDoc.get();
	const user = userSnap.data();
	return user;
});

exports.getUsers = functions.https.onCall(async (data, context) => {
	console.log('> getUsers~ called with: ' + JSON.stringify({ data, auth: context.auth }, null, 4));
	await getValidUser(context);

	// Fetch the users
	const usersSnapshot = await admin.firestore().collection('users').get();
	const users = usersSnapshot.docs.map(doc => doc.data());
	return users;
});

exports.createUser = functions.https.onCall(async ({ email, role }, context) => {
	console.log('> createUser~ called with: ' + JSON.stringify({ email, role, auth: context.auth }, null, 4));
	const user = await getValidUser(context);
	if (!['owner', 'admin'].includes(user.role)) {
		throw new Error('admin only operation');
	}

	const newUser = {
		email: email,
		role: role || 'member'
	};

	// Update the Database
	console.log('> createUser~ writing to users collection');
	const newUserDocumentRef = admin.firestore().collection('users').doc(email);
	await newUserDocumentRef.set(newUser);
	return 'success';
});

exports.updateUserRole = functions.https.onCall(async ({ email, role }, context) => {
	console.log('> updateUserRole~ called with: ' + JSON.stringify({ email, role, auth: context.auth }, null, 4));
	const user = await getValidUser(context);
	if (!['owner', 'admin'].includes(user.role)) {
		throw new Error('admin only operation');
	}

	const newUser = {
		role: role || 'member'
	};

	// Update the Database
	console.log('> updateUserRole~ writing to users collection');
	const updatedUserDoc = admin.firestore().collection('users').doc(email);

	// Check they aren't an owner
	const updatedUserSnap = await updatedUserDoc.get();
	const updatedUser = updatedUserSnap.data();
	if (updatedUser.role === 'owner') throw new Error('can\'t edit owner\'s role');

	await updatedUserDoc.update(newUser);
	return 'success';
});


exports.deleteUser = functions.https.onCall(async (email, context) => {
	console.log('> deleteUser~ called with: ' + JSON.stringify({ email, auth: context.auth }, null, 4));
	const user = await getValidUser(context);
	if (!['owner', 'admin'].includes(user.role)) {
		throw new Error('admin only operation');
	}

	// Update the Database
	console.log('> deleteUser~ writing to users collection');
	const deletedUserDoc = admin.firestore().collection('users').doc(email);

	// Check they aren't an owner or an admin
	const deletedUserSnap = await deletedUserDoc.get();
	const deletedUser = deletedUserSnap.data();
	if (['owner', 'admin'].includes(deletedUser.role)) {
		throw new Error('can\'t delete admin user');
	}

	await deletedUserDoc.delete();
	return 'success';
});