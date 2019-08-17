const admin = require('firebase-admin');

module.exports = {

	async getCollection(collectionPath) {
		const collectionSnapshot = await admin.firestore().collection(collectionPath).get();
		const items = collectionSnapshot.docs.map(doc => doc.data());
		return items;
	},

	async getDocument(documentPath) {
		const documentSnapshot = await admin.firestore().doc(documentPath).get();
		const item = documentSnapshot.data();
		return item;
	},

	async createDocument(collectionPath, data) {
		const documentRef = admin.firestore().collection(collectionPath).doc();
		data._id = documentRef.id;
		await documentRef.set(data);
		return data;
	},

	async setDocument(documentPath, data) {
		const pathParts = documentPath.split('/');
		data._id = pathParts[pathParts.length - 1];
		const documentRef = admin.firestore().doc(documentPath);
		await documentRef.update(data);
		return data;
	},

	async updateDocument(documentPath, data) {
		const { _id } = data;
		delete data._id;
		const documentRef = admin.firestore().doc(documentPath);
		await documentRef.update(data);
		data._id = _id;
		return data;
	},

	async deleteDocument(documentPath) {
		const documentRef = admin.firestore().doc(documentPath);
		await documentRef.delete();
		return documentPath;
	}

}