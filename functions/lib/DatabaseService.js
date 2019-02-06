const admin = require('firebase-admin');
const firebaseConfig = require('../config/firebase');
admin.initializeApp(firebaseConfig);
database = admin.database();

const get = async (path) => {
	const ref = database.ref(path);
	const snap = await ref.once('value');
	const data = snap.val();
	return data;
};

const update = async (path, update) => {
	const result = await database.ref(path).update(update);
	return result;
}

module.exports = {
	get,
	update
}
