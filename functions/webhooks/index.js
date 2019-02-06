/* Adds webhooks for the buttons to hook onto and effect the firebase database */

const express = require('express');
const cors = require('cors');
const url = require('url');
const functions = require('firebase-functions');
const config = require('../config');
const buttonClick = require('./modules/buttons');

const app = express();


app.use(cors({ origin: true }));

const parseUrl = (req, res, next) => {
	const parsed = url.parse(req.url, true);
	req.parsed = parsed;
	return next();
};

const validateToken = (req, res, next) => {
	const token = req.parsed.query['IFTTT-token'];
	if (token && token === config.IFTT_KEY) return next();
	throw new Error('not authenticated');
};

app.use(parseUrl);
app.use(validateToken);

// build multiple CRUD interfaces:
app.post('/click', buttonClick);


module.exports = functions.https.onRequest(app)
