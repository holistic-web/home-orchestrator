const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://holistic-home-5134d.firebaseio.com'
});

// #TODO: set this value to the collection you want to modify
const collectionName = 'networks';
const collection = admin.firestore().collection(collectionName);

const updateItems = async () => {

	// Get the items
	console.log('> Getting items from the database...');
	const snapshots = await collection.get();
	const items = snapshots.docs.map(doc => doc.data());

	// Modify the items
	console.log('> Modifying the data...')
	const promises = items.map(async item => {

		// #TODO edit the logic below to modify the items
		if (item) {
			Console.log(`> Working on: ${JSON.stringify(item, null, 4)}...`);
			item.newProperty = 'example';

			// Update the item
			const document = collection.doc(item._id);
			await document.set(item);
		}

	});

	// Wait for updates to be applied
	console.log('> Applying updates...');
	await Promise.all(promises);

	console.log('Done!');

};

updateItems();