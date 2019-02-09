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
	if (!actionString) throw new Error(`Action ${actionString} not found`);
	const action = url.parse(actionString, true);
	const method = action.pathName;
	const args =  action.query;
	Object.keys(args).forEach(key => {
		args[key] = key
	});
	await LightService[method](...args);
	return res.send(action);
}

module.exports = buttons;
