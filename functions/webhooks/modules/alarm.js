const LightService = require('../../lib/LightService');
const { get, update } = require('../../lib/DatabaseService');
const { shuffle } = require('../../lib/common');

const colourScheme = ['white', 'red', 'blue'];

const alarm = async (req, res) => {
	const duration = parseInt(req.parsed.query.duration, 10) || 30;
	console.log(`> Alarm - duration: ${duration}`);

	await update(`state/alarm`, { active: true });
	await LightService.setTheme('morning');
	await LightService.setBrightness(0);

	const interval = (duration * 60) / 100; // seconds

	for (let i=0; i<100; i++) {
		setTimeout(async () => {
			const active = await get('state/alarm/active');
			if (active) LightService.setBrightness(i);
		}, interval * i * 1000);
	}

	const lights = await get('state/lights');
	const lightNames = Object.keys(lights);

	setTimeout(async () => {
		let active = await get('state/alarm/active');
		while (active) {
			let colours = shuffle(colourScheme);
			lightNames.forEach((lightName, i) => {
				LightService.setColour(colours[i], lightName);
			});
			active = await get('state/alarm/active');
		}
	}, duration * 60 * 1000);


	res.send(true);
};

module.exports = alarm;
