const LightService = require('../../lib/LightService');
const { get, update } = require('../../lib/DatabaseService');
const { shuffle, sleep } = require('../../lib/common');

const colourScheme = ['white', 'red', 'blue'];

const alarm = async (req, res) => {
	const duration = parseInt(req.parsed.query.duration, 10);
	console.log(`> Alarm - duration: ${duration}`);

	await update(`state/alarm`, { active: true });
	await LightService.setTheme('morning');
	await LightService.setBrightness(0);

	const interval = (duration * 60) / 100; // seconds

	for (let i=0; i<100; i++) {
		setTimeout(async () => {
			const active = await get('state/alarm/active');
			if (active) {
				LightService.setBrightness(i);
			} else {
				i = 100;
			}
		}, interval * i * 1000);
	}

	const lights = await get('state/lights');
	const lightNames = Object.keys(lights);

	setTimeout(async () => {
		let active = await get('state/alarm/active');
		let colours;
		while (active) {
			colours = shuffle(colourScheme);
			lightNames.forEach((lightName, i) => { // eslint-disable-line no-loop-func
				LightService.setColour(colours[i], lightName);
			});
			active = await get('state/alarm/active');
			await sleep(3000);
		}
		await LightService.setTheme('morning');

	}, duration * 60 * 1000);


	res.send(true);
};

module.exports = alarm;
