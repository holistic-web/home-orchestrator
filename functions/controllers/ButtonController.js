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

const getBrightness = async (lightName) => {
	const ref = admin.database().ref(`lights/${lightName}/brightness`);
	const snap = await ref.once('value');
	const value = snap.val();
	return value;
}

/**
 * If a light has a non 0 brightness it sets it to 0. Otherwise it sets brightness to 100.
 * @param {string} lightName name of the light you wish to toggle
 */
const toggleLight = async (lightName) => {
	const brightness = await getBrightness(lightName);
	let newBrightness = 0;
	if (brightness === 0) newBrightness = 100;
	await ref.set(newBrightness);
	return newBrightness;
}

/**
 * If any light is on it sets everything to 100%. Otherwise sets everything to 0
 */
const toggleAllLights = async () => {
	const [lampBrightness, roomBrightness, nanoleafBrightness] = await Promise.all([
		getBrightness('lamp'),
		getBrightness('room'),
		getBrightness('nanoleaf')
	]);
	if (!lampBrightness && !roomBrightness && !nanoleafBrightness) {
		admin.database().ref('lights/lamp/brightness').set(100);
		admin.database().ref('lights/room/brightness').set(100);
		admin.database().ref('lights/nanoleaf/brightness').set(100);
		return true;
	}
	admin.database().ref('lights/lamp/brightness').set(0);
	admin.database().ref('lights/room/brightness').set(0);
	admin.database().ref('lights/nanoleaf/brightness').set(0);
	return false;
}

// build multiple CRUD interfaces:
app.post('/desk-button/short-press', async (req, res) => {
	const result = await toggleLight('lamp');
	res.send({ result });
});
app.post('/bed-button/short-press', async (req, res) => {
	const result = await toggleAllLights();
	res.send({ result });
});


module.exports = functions.https.onRequest(app)
