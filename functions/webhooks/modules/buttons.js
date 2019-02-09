const url = require('url');
const LightService = require('../../lib/LightService');
const { get } = require('../../lib/DatabaseService');

const buttons = async (req, res) => {

	// const alarmOn = await get('state/alarm/active');
	// if (alarmOn) return res.send(update('state/alarm', { active: false }));

	const buttonName = req.parsed.query.name;
	const clickType = req.parsed.query.click;
	console.log(`> Click - name: ${buttonName}, type: ${clickType}`)
	const actionString = await get(`config/buttons/${buttonName}/${clickType}`);
	if (!actionString) throw new Error(`action ${actionString} not found`);
	const action = url.parse(actionString, true);
	const method = action.pathname;
	const args =  Object.keys(action.query);
	if (args && args.length > 0) {
		await LightService[method](...args);
	} else {
		await LightService[method]();
	}

	return res.send(action);
}

module.exports = buttons;
