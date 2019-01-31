const lightService = require('./lib/lightService');

exports.activate = () => {
	console.log('> Alarm activated');

	lightService.setBrightness(100);

}
