const serviceAccount = require('./lib/service-account.json');

module.exports = {
	port: 4000,
	firebase: {
		credential: serviceAccount,
		databaseURL: 'https://holistic-home-5134d.firebaseio.com'
	}
};