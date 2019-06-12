const functions = require('firebase-functions');

const config = {
	IFTTT_KEY: functions.config().ifttt.key,
};

module.exports = config;
