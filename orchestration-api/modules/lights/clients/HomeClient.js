const axios = require('axios');

module.exports = class HomeClient {
	constructor(network) {
		this.network = network;
		this.apiBase = network.settings.localUrl;
	}

	async update(light) {
		const result = await axios.post(
			`${this.apiBase}/updateLights`,
			{ light, network: this.network }
		);
		return result;
	}
}