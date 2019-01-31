exports.activate = (lightService) => {
	console.log('> Alarm activated');

	const state = lightService.state;
	Object.keys(state).forEach(lightName => {
		state[lightName].scene = 'alarm-start';
	});

	console.log('> Setting alarm state:', JSON.stringify(state, null, 4));

	lightService.set(state);
};
