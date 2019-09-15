const Pusher = require('pusher');
const config = require('../lib/config');

module.exports = class PusherClient {

	constructor(pusherConfig = config.pusher) {
		this.client = new Pusher(pusherConfig);
	}

	async publishMessage(channel, event, data) {
		const result = await this.client.trigger(channel, event, data);
		return result;
	}

};
