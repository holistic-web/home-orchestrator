const { cloneDeep } = require('lodash');

const LightService = require('../lib/LightService');
const sleep = require('util').promisify(setTimeout)

const lightService = new LightService();

class Alarm {

	constructor(lights = lightService) {
		this.lights = lights;
	}

	/**
	 * Triggers the alarm
	 */
	async activate() {
		console.log('> Alarm activated');

		// #Todo: activate alarm trigger in firebase

		// set all lights to scene "alarm_start"
		const lights = await this.lights.get();
		const update = {};
		Object.keys(lights).forEach(lightName => {
			update[lightName].scene = 'alart_start';
		});
		await this.lightService.update(state);

		// make the lights brighter over the fade in time

		// #Todo get fade in time from firebase state
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
