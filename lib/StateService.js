const LightConfig = require('../config/lights');
const FirebaseService = require('../functions/config/FirebaseService');

const firebaseService = new FirebaseService();

class StateService {

	constructor(databaseService = firebaseService, lightConfig = LightConfig) {
		this.databaseService = databaseService;
		const state = {
			lights: {}
		};
		lightConfig.forEach(light => {
			state.lights[light.name] = {
				brightness: 50,
				colour: 'default',
				meta: {
					type: light.type
				}
			}
		});
		this.set(state);
	}

	async set(state) {
		await this.databaseService.setState(state);
	}

	async update(state) {
		await this.databaseService.updateState(state);
	}

	async get() {
		const data = await this.databaseService.getState();
		return data;
	}

}

module.exports = StateService;
