const { cloneDeep } = require('lodash');
const sleep = require('util').promisify(setTimeout)
const lights = require('../config/lights');


// Tightly coupled to the current lights config
class Alarm {

	constructor(lightService) {
		this.lights = lights.map(l => l.name);
		this.lightService = lightService;
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
		// // const interval = fadeInTime / 100;
		// // for (let i=2; i<=100; i+=1) {

		// // 	await sleep(1000 * interval);

		// // 	this.lights.forEach(light => {
		// // 		state[light].brightness = i;
		// // 	});
		// // 	this.lightService.update(state);
		// // }

		// after fadeInTime is over
		// await sleep(1000 * fadeInTime);
		while (true) { // this means the alarm must be cancelled manually
			state.room.scene = 'alarm_alt';
			state.lamp.scene = 'alarm_alt';
			this.lightService.update(state);
			await sleep(5000);
			state.room.scene = 'alarm_start';
			state.lamp.scene = 'alarm_start';
			this.lightService.update(state);
			await sleep(5000);
			this.lightService.notify(['nanoleaf']);
		}



	}

}

module.exports = Alarm;
