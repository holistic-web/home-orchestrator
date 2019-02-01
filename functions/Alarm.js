const { cloneDeep } = require('lodash');
const StateService = require('../lib/StateService');
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

		await StateService.turnOnAlarm();

		// set all lights to scene "alarm_start"
		const state = cloneDeep(this.lightService.state);
		this.lights.forEach(light => {
			state[light].scene = 'alarm_start';
		});
		this.lightService.update(state);

		// make the lights brighter over the fade in time
		const fadeInTime = 30 * 60;	// minutes
		const interval = fadeInTime / 100; // minutes
		for (let i=2; i<=100; i+=1) {

			await sleep(1000 * interval);

			this.lights.forEach(light => {
				state[light].brightness = i;
			});
			this.lightService.update(state);
		}

		let enabled = true;
		// after fadeInTime is over
		while (enabled) { // this means the alarm must be cancelled manually
			state.room.scene = 'alarm_alt';
			state.lamp.scene = 'alarm_alt';
			this.lightService.update(state);
			await sleep(5000);
			state.room.scene = 'alarm';
			state.lamp.scene = 'alarm';
			this.lightService.update(state);
			await sleep(5000);
			this.lightService.notify(['nanoleaf']);

			const alarmState = await StateService.getAlarm();
			if (!alarmState.active) {
				console.log('> Disabling alarm');
				enabled = false;
			}
		}

	}

}

module.exports = Alarm;
