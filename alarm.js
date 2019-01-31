const LightService = require('./lib/LightService');
const lights = require('./config/lights');

const lightService = new LightService(lights);

exports.activate = () => {
	console.log('> Alarm activated');

	const state = lightService.state;
	Object.keys(state).forEach(lightName => {
		state[lightName].scene = 'alarm-start';
	})
}
