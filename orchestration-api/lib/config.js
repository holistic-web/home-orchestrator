const serviceAccount = require('./service-account.json');

module.exports = {
	firebase: {
		credential: serviceAccount,
		databaseURL: 'https://holistic-home-5134d.firebaseio.com'
	}
}