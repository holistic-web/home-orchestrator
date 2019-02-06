const { merge } = require('lodash');
const { get, update } = require('./DatabaseService');

const isLightOff = async (lightName) => {
	const isOff = await get(`state/lights/${lightName}/off`);
	return isOff;
};

const toggleLight = async (lightName) => {
	const isOff = await isLightOff(lightName);
	const path = `state/lights/${lightName}/off`;
	update(path, !isOff);
	return !isOff;
};

const toggleAllLights = async () => {
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

const applyTheme = async (themeName) => {
	const [state, themes] = await Promise.all([
		get ('state'),
		get('themes')
	]);
	const lightState = state.lights;
	const theme = themes[themeName];
	const newLightState = merge(lightState, theme);
	await update('state/lights', newLightState);
	return theme;
}

module.exports = {
	isLightOff,
	toggleLight,
	toggleAllLights,
	applyTheme
}
