# Network Setup
A walkthrough for setting up a network in the Home Orchestrator system. New users should do this first!

1. Open the firebase console for this project: https://console.firebase.google.com/u/0/project/holistic-home-5134d/overview

	_If you don't have aceess to this project, raise an issue and we can authorize your account._


2. In the sidebar menu select `Database` followed by `Cloud Firestore` to open the database. This is where we will add the new network.


3. Click the `networks` collection and then `+ Add document` to create your network. A base network should look like:

	```
	Document ID: {Auto-ID}
	{
		_id: {Auto-ID}, // String (matching the generated ID above)
		name: {network name}, // String (this can be whatever you like)
		owner: {your email}, // String (this must be the account you use to log in)
		variables: {empty} // Map (leave this empty for now)
	}
	```

4. Navigate to https://holistic-home-5134d.firebaseapp.com/account in your browser and your new network should appear in the list. Click `Set Active` on this network and you are all set up!