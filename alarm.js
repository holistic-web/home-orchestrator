const lights = require('./config/lights');

exports.activate = (lightService) => {
	console.log('> Alarm activated');

	const lightService = new LightService(lights);

	const state = lightService.state;
	Object.keys(state).forEach(lightName => {
		state[lightName].scene = 'alarm-start';
	})
};
