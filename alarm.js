const { cloneDeep } = require('lodash');

exports .activate = (lightService) => {
	console.log('> Alarm activated');

	const state = cloneDeep(lightService.state);
	Object.keys(state).forEach(lightName => {
		state[lightName].scene = 'alarm-start';
	});

	lightService.set(state);
};
