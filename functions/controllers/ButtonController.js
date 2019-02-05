/* Adds webhooks for the buttons to hook onto and effect the firebase database */

const express = require('express');
const cors = require('cors');
const url = require('url');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
	// #Todo: find a way to use the values from @/config/firebase.js
	apiKey: "AIzaSyCvBMLoUZafodd2vlyAxUs3Pl0mEARUOEc",
	authDomain: "holistic-home-5134d.firebaseapp.com",
	databaseURL: "https://holistic-home-5134d.firebaseio.com",
	projectId: "holistic-home-5134d",
	storageBucket: "holistic-home-5134d.appspot.com",
	messagingSenderId: "549410338560"
});
database = admin.database();

const app = express();

const key = functions.config().ifttt.key;
if (!key) throw new Error('no "iftt.key" environment variable')

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

const validateToken = (req, res, next) => {
	const parsedReq = url.parse(req.url, true);
	const token = parsedReq.query['IFTTT-token'];
	if (token && token === key) return next();
	throw new Error('not authenticated');
}

// Add middleware to authenticate requests
app.use(validateToken);

const isLightOff = async (lightName) => {
	const ref = database.ref(`lights/${lightName}/off`);
	const snap = await ref.once('value');
	const value = snap.val();
	return value;
}

/**
 * If a light has a non 0 brightness it sets it to 0. Otherwise it sets brightness to 100.
 * @param {string} lightName name of the light you wish to toggle
 */
const toggleLight = async (lightName) => {
	const isOff = await isLightOff(lightName);
	if (isOff) {
		database.ref(`lights/${lightName}/off`).set(false);
		return true;
	}
	database.ref(`lights/${lightName}/off`).set(true);
	return false;
}

/**
 * If any light is on it sets everything to 100%. Otherwise sets everything to 0
 */
const toggleAllLights = async () => {
	const [lampIsOff, roomIsOff, nanoleafIsOff] = await Promise.all([
		isLightOff('lamp'),
		isLightOff('room'),
		isLightOff('nanoleaf')
	]);
	const isAnythingOn = !lampIsOff || !roomIsOff || !nanoleafIsOff;
	if (isAnythingOn) {
		await database.ref('lights').update({
			'lamp/off': true,
			'room/off': true,
			'nanoleaf/off': true
		});
	} else {
		await database.ref('lights').update({
			'lamp/off': false,
			'room/off': false,
			'nanoleaf/off': false
		});
	}
	return isAnythingOn;
}

// build multiple CRUD interfaces:
app.post('/desk-button/short-press', async (req, res) => {
	console.log('> Desk Button: short-press');
	const result = await toggleLight('lamp');
	res.send({ result });
});
app.post('/bed-button/short-press', async (req, res) => {
	console.log('> Bed Button: short-press');
	const result = await toggleAllLights();
	res.send({ result });
});


module.exports = functions.https.onRequest(app)
