/* Adds webhooks for the buttons to hook onto and effect the firebase database */

const express = require('express');
const cors = require('cors');
const url = require('url');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebaseConfig = require('../config/firebase');
const { toggleLight, toggleAllLights } = require('../lib/StateService');

admin.initializeApp(firebaseConfig);
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
