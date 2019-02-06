const axios = require('axios');
const config = require('../config/index');

module.exports = class AlarmController {

	async triggerAlarm() {
		const result = await axios.post(`${config.BASE_URL}/alarm?IFTTT-token=${config.IFTTT_KEY}&propagate=true`);
		return result;
	}

}
