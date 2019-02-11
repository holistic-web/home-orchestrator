import firebase from 'firebase';
import VuexPersistence from 'vuex-persist';

import firebaseConfig from '../../config/firebase';
import accountStore from './modules/AccountStore';

// Create a persisted state cookie for the authentication module (keeps user's signed in!)
const vuexCookie = new VuexPersistence({
	supportCircular: true,
	modules: [
		'account'
	]
});

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

const store = {
	state: {
		firebase,
		db,
		provider
	},
	modules: {
		account: accountStore
	},
	plugins: [
		vuexCookie.plugin
	]
};

export default store;
