/* Adds webhooks for the buttons to hook onto and effect the firebase database */

const express = require('express');
const cors = require('cors');
const url = require('url');
const functions = require('firebase-functions');
const config = require('../config');
const buttons = require('./modules/buttons');
const alarm = require('./modules/alarm');

const app = express();


app.use(cors({ origin: true }));

const parseUrl = (req, res, next) => {
	const parsed = url.parse(req.url, true);
	req.parsed = parsed;
	return next();
};

const validateToken = (req, res, next) => {
	const token = req.parsed.query['IFTTT-token'];
	if (token && token === config['IFTTT_KEY']) return next();
	res.send('not authenticated');
};

app.use(parseUrl);
app.use(validateToken);

app.post('/click', buttons);
app.post('/alarm', alarm)
module.exports = functions.https.onRequest(app)
