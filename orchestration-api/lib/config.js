const serviceAccount = require('./service-account.json');

module.exports = {
	port: 8080,
	// port: 3000,
	firebase: {
		credential: serviceAccount,
		databaseURL: 'https://holistic-home-5134d.firebaseio.com'
	}
}