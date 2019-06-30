import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import VuexPersistence from 'vuex-persist';
import config from '../config';
import accountStore from './modules/account';
import usersStore from './modules/users';
import lightsStore from './modules/lights';
import themeStore from './modules/themes';
import networkStore from './modules/networks';

Vue.use(Vuex);

firebase.initializeApp(config.firebase);
const provider = new firebase.auth.GoogleAuthProvider();

const persistedState = new VuexPersistence({
	supportCsircular: true,
	modules: [
		'account'
	]
});

const storeConfig = {
	state: {
		firebase,
		provider
	},
	modules: {
		account: accountStore,
		users: usersStore,
		lights: lightsStore,
		themes: themeStore,
		networks: networkStore
	},
	plugins: [
		persistedState.plugin
	]
};

const store = new Vuex.Store(storeConfig);

export default store;
