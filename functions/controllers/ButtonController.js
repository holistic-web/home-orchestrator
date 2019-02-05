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

// build multiple CRUD interfaces:
app.post('/desk-button/short-press', async (req, res) => {
	const ref = admin.database().ref('lights/lamp/brightness');
	const snap = await ref.once('value');
	const value = snap.val();
	console.log('value: ', value);
	let newBrightness = 0;
	if (value === 0) newBrightness = 100;
	console.log('newBrightness: ', newBrightness);
	await ref.set(newBrightness);
	res.send({ newBrightness });
});

module.exports = functions.https.onRequest(app)
