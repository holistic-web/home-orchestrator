require('dotenv').config()
const schedule = require('node-schedule');
const axios = require('axios');

// endpoints
const setBrightnessEndpoint = process.env.SET_BRIGHTNESS_ENDPOINT;

// node-schedule patterns
const everyMinutePattern = '0 * * * * *';

const setLights = (brightness) => {
	if (!brightness) throw new Error('"setLights" called without "brightness" parameter');
	axios.post(setBrightnessEndpoint, {
		value1: brightness
	});
}

const setLightsEveryMinute = schedule.scheduleJob(everyMinutePattern, setLights(0));
