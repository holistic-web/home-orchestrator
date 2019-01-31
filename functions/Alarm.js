const { cloneDeep } = require('lodash');

class Alarm {

	constructor(lightService) {
		this.lightService = lightService;
	}

	/**
	 * Sets all lights to scene 'alarm-start'
	 */
	activate() {
		console.log('> Alarm activated');

		const state = cloneDeep(this.lightService.state);
		Object.keys(state).forEach(lightName => {
			state[lightName].scene = 'alarm_start';
		});

		this.lightService.set(state);
	}

}

module.exports = Alarm;
