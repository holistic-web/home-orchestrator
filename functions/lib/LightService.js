const { merge } = require('lodash');
const { get, update } = require('./DatabaseService');

const isLightOff = async (lightName) => {
	const isOff = await get(`state/lights/${lightName}/off`);
	return isOff;
};

const toggleLight = async (lightName) => {
	if (lightName) {
		const isOff = await isLightOff(lightName);
		const path = `state/lights/${lightName}`;
		update(path, { off: !isOff });
		return !isOff;
	}
	const lightState = await get('state/lights');
	const lightNames = Object.keys(lightState);
	const lightsOffValues = await Promise.all(lightNames.map(ln => isLightOff(ln)));
	const isAnythingOn = lightsOffValues.includes(false);
	const commit = {};
	lightNames.forEach(lightName => {
		commit[`${lightName}/off`] = isAnythingOn;
	});
	await update('state/lights', commit);
	return isAnythingOn;
};

const setTheme = async (themeName) => {
	const [state, themes] = await Promise.all([
		get('state'),
		get('themes')
	]);
	const lightsState = state.lights;
	const theme = themes[themeName];
	const newLightsState = merge(lightsState, theme);
	await update('state/lights', newLightsState);
	return theme;
};

const setBrightness = async (brightness, lightName) => {
	if (lightName) return await update(`state/lights/${lightName}`, { brightness });
	const state = await get('state');
	const lightNames = Object.keys(state.lights);
	const commit = {};
	lightNames.forEach(lightName => {
		commit[`${lightName}/brightness`] = brightness;
	});
	await update('state/lights', commit);
	return brightness;
};

const setColour = async (colour, lightName) => {
	if (lightName) return await update(`state/lights/${lightName}`, { colour });
	const lights = await get('state/lights');
	const lightNames = Object.keys(lights);
	const commit = {};
	lightNames.forEach(lightName => {
		commit[`${lightName}/colour`] = colour;
	});
	await update('state/lights', commit);
	return colour;
}

module.exports = {
	isLightOff,
	toggleLight,
	setTheme,
	setBrightness,
	setColour
}
