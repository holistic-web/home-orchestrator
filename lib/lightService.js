const sleep = require('util').promisify(setTimeout)
const StateService = require('../lib/StateService');
const themes = require('../config/themes');

class LightService {

	constructor() {
		this.stateService = new StateService();
		this.themes = themes;
		this.initialize();
	}

	async initialize() {
		this.state = await this.stateService.get();
	}

	async setTheme(themeName) {
		const lightNames = Object.keys(this.themes[themeName]);
		const update = {};
		lightNames.forEach(lightName => {
			update[lightName] = this.themes[themeName][lightName];
		});
		await this.update(update);
	}

	async update(update) {
		if (!this.state) {
			await sleep(500);
			return this.update(update)
		}
		Object.keys(update).forEach(lightName => {
			if (typeof update[lightName].brightness === 'number') this.state.lights[lightName].brightness = update[lightName].brightness;
			if (typeof update[lightName].colour === 'string') this.state.lights[lightName].colour = update[lightName].colour;
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
