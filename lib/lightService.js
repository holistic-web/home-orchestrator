const LightController = require('../controllers/LightController');

class LightService {

	constructor(lights) {
		this.state = {};
		this.controllers = {};
		lights.forEach(light => {
			this.state[light.name] = {
				scene: 'default',
				brightness: 50,
				meta: {
					...light
				}
			},
			this.controllers[light.name] = new LightController(light);
		});
	}

	set(state) {
		const lightNames = Object.keys(this.state);
		lightNames.forEach(lightName => {

			// If new scene is set, modify scene
			const newScene = state[lightName].scene;
			const currentScene = this.state[lightName].scene;
			if (newScene !== currentScene) {
				this.controllers[lightName].setScene(newScene);
				this.state[lightName].scene = newScene;
			}

			// If new brightness is set, modify brightness
			const newBrightness = state[lightName].brightness;
			const currentBrightness = this.state[lightName].brightness;
			if (newBrightness !== currentBrightness) {
				if (newBrightness === 0) {
					this.controllers[lightName].turnOff();
				} else {
					this.controllers[lightName].setBrightness(newBrightness);
				}
				this.state[lightName].brightness = newBrightness;
			}

		});
	}

}

module.exports = LightService;
