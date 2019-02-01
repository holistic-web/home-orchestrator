const sleep = require('util').promisify(setTimeout)
const StateService = require('../lib/StateService');

class LightService {

	constructor() {
		this.stateService = new StateService();
		this.intialize();
	}

	async intialize() {
		this.state = await this.stateService.get();
	}

	async update(update) {
		if (!this.state) {
			// if state isn't yet ready, try again in 500ms
			await sleep(500);
			console.log('> update failed, retrying...');
			return this.update(update)
		}
		Object.keys(update).forEach(lightName => {
			if (typeof update[lightName].brightness === 'number') this.state.lights[lightName].brightness = update[lightName].brightness;
			if (typeof update[lightName].scene === 'string') this.state.lights[lightName].scene = update[lightName].scene;
		});
		await this.stateService.set(this.state);
		const result = await this.stateService.get();
		this.state = result;
		console.log('> Set state:', JSON.stringify(result, null, 4));
		return result;
	}

	async get() {
		const state = await this.stateService.get();
		this.state = state;
		return this.state.lights;
	}

}

module.exports = LightService;
