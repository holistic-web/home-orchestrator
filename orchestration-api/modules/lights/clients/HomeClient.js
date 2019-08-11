const axios = require('axios');

module.exports = class HomeClient {
	constructor(network) {
		this.network = network;
		this.apiBase = network.settings.localAPI;
	}

	async update(lights) {
		const result = await axios.post(
			`${this.apiBase}/updateLights`,
			{ lights, network: this.network }
		);
		return result;
	}
}