import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import VuexPersistence from 'vuex-persist';
import config from '../config';
import accountStore from './modules/account';
import lightsStore from './modules/lights';
import templatesStore from './modules/templates';

Vue.use(Vuex);

const app = firebase.initializeApp(config.firebase);
const db = app.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

const persistedState = new VuexPersistence({
	supportCsircular: true,
	modules: [
		'account'
	]
});

const storeConfig = {
	state: {
		db,
		firebase,
		provider
	},
	modules: {
		account: accountStore,
		lights: lightsStore,
		templates: templatesStore
	},
	plugins: [
		persistedState.plugin
	]
};

const store = new Vuex.Store(storeConfig);

export default store;
