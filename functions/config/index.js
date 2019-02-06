const functions = require('firebase-functions');

const config = {
	IFTTT_KEY: functions.config().ifttt.key,
	BASE_URL: 'https://us-central1-holistic-home-5134d.cloudfunctions.net/webhooks',
};

module.exports = config;
