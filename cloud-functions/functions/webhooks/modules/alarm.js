const sleep = require('util').promisify(setTimeout);
const { update, get } = require('../../lib/DatabaseService');
const LightService = require('../../lib/LightService');
const { shuffle } = require('../../lib/common');
const AlarmController = require('../../controllers/AlarmController');

const alarmController = new AlarmController();
const colourScheme = ['white', 'red', 'blue'];

const alarm = async (req, res) => {
	const { turnOff, propagate } = req.parsed.query;

	if (turnOff) {
		update('state/alarm', { active: false });
		return res.send(false);
	}

	let [{ active, progress}, duration] = await Promise.all([
		get('state/alarm'),
		get('config/alarm/duration')
	]);

	if (!active) {
		await update('state/alarm', { active: true, progress: 0 });
		await alarmController.triggerAlarm();
		return res.send(true);
	}

	if (!propagate) return res.send('Alarm already active');

	const interval = (duration * 60 * 1000) / 100;

	if (progress < 100) {

		if (progress === 0) {
			await LightService.setTheme('morning');
			await sleep(interval);
		}

		await LightService.setBrightness(progress);
		await sleep(interval);
	}

	if (progress >= 100) {
		const lights = await get('state/lights');
		const lightNames = Object.keys(lights);
		const colours = shuffle(colourScheme);
		lightNames.forEach((lightName, i) => { // eslint-disable-line no-loop-func
			LightService.setColour(colours[i], lightName);
		});
		await sleep(3000)
	}

	await update('state/alarm', { progress: progress + 1});
	await alarmController.triggerAlarm();
	return res.send({ progress });
}

module.exports = alarm;
