const firebase = require('firebase');

firebase.initializeApp({
	apiKey: "AIzaSyCvBMLoUZafodd2vlyAxUs3Pl0mEARUOEc",
	authDomain: "holistic-home-5134d.firebaseapp.com",
	databaseURL: "https://holistic-home-5134d.firebaseio.com",
	projectId: "holistic-home-5134d",
	storageBucket: "holistic-home-5134d.appspot.com",
	messagingSenderId: "549410338560"
});

module.exports = class StateService {

	/**
	 * Sets the brightness of the light
	 * @param {number} brightness [1-100] new brightness value
	 */
	static async update(state) {
		await firebase.database().ref('state').set(state);
	}

	static async get() {
		const data = await firebase.database().ref('state').once('value');
		return data.val();
	}

	static async turnOnAlarm() {
		await firebase.database().ref('alarm').set({ active: true });
	}

	static async turnOffAlarm() {
		await firebase.database().ref('alarm').set({ active: false });
	}

}
