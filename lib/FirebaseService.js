const firebase = require('firebase');
const firebaseConfig = require('../config/firebase');

const stateRefName = 'state';

class FirebaseService {

	constructor(config = firebaseConfig) {
		this.firebase = firebase;
		this.firebase.initializeApp(config);
	}

	async setState(state) {
		await this.firebase.database().ref(stateRefName).set(state);
	}

	async getState() {
		const data = await this.firebase.database().ref(stateRefName).once('value');
		return data.val();
	}

}

module.exports = FirebaseService;
