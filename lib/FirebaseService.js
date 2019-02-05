require('dotenv').config();
const firebase = require('firebase');
const sleep = require('util').promisify(setTimeout)
const firebaseConfig = require('../functions/config/firebase');

const stateRefName = undefined;

class FirebaseService {

	constructor(config = firebaseConfig) {
		this.firebase = firebase;
		this.initialize(config);
	}

	async initialize(config) {
		this.firebase.initializeApp(config);
		const email = process.env.FIREBASE_EMAIL;
		const password = process.env.FIREBASE_PASSWORD;
		await this.firebase.auth().signInWithEmailAndPassword(email, password);
	}

	async setState(state) {
		if (!this.firebase.auth().currentUser) {
			await sleep(500);
			return this.setState(state)
		}
		await this.firebase.database().ref(stateRefName).set(state);
	}

	async getState() {
		if (!this.firebase.auth().currentUser) {
			await sleep(500);
			return this.getState()
		}
		const data = await this.firebase.database().ref(stateRefName).once('value');
		return data.val();
	}

}

module.exports = FirebaseService;
