const LightService = require('../../lib/LightService');
const { get } = require('../../lib/DatabaseService');

const buttons = async (req, res) => {

	// const alarmOn = await get('state/alarm/active');
	// if (alarmOn) return res.send(update('state/alarm', { active: false }));

	const buttonName = req.parsed.query.name;
	const clickType = req.parsed.query.click;
	console.log(`> Click - name: ${buttonName}, type: ${clickType}`)
	const action = await get(`config/buttons/${buttonName}/${clickType}`);
	if (!action) throw new Error(`Action ${action} not found`);
	const [ method, argsString ] = action.split(':');
	if (argsString) {
		const args = argsString.split(',');
		await LightService[method](...args);
	} else {
		await LightService[method]();
	}
	return res.send(action);
}

module.exports = buttons;
