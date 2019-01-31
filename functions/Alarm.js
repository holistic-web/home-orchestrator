const { cloneDeep } = require('lodash');
const sleep = require('util').promisify(setTimeout)

class Alarm {

	constructor(lightService) {
		this.lightService = lightService;
		this.lights = Object.keys(lightService.state);
	}

	/**
	 * Triggers the alarm
	 */
	async activate() {
		console.log('> Alarm activated');

		// set all lights to scene "alarm_start"
		const state = cloneDeep(this.lightService.state);
		this.lights.forEach(light => {
			state[light].scene = 'alarm_start';
		});
		this.lightService.update(state);

		// make the lights brighter over the fade in time
		const fadeInTime = 1 * 60;
		const interval = fadeInTime / 100;
		for (let i=2; i<=100; i+=1) {

			await sleep(1000 * interval);

			this.lights.forEach(light => {
				state[light].brightness = i;
			});
			this.lightService.update(state);
		}


	}

}

module.exports = Alarm;
