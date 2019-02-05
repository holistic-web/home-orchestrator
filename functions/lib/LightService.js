const isLightOff = async (lightName) => {
	const ref = database.ref(`lights/${lightName}/off`);
	const snap = await ref.once('value');
	const value = snap.val();
	return value;
};

const toggleLight = async (lightName) => {
	const isOff = await isLightOff(lightName);
	if (isOff) {
		database.ref(`lights/${lightName}/off`).set(false);
		return true;
	}
	database.ref(`lights/${lightName}/off`).set(true);
	return false;
};

const toggleAllLights = async () => {
	const [lampIsOff, roomIsOff, nanoleafIsOff] = await Promise.all([
		isLightOff('lamp'),
		isLightOff('room'),
		isLightOff('nanoleaf')
	]);
	const isAnythingOn = !lampIsOff || !roomIsOff || !nanoleafIsOff;
	if (isAnythingOn) {
		await database.ref('lights').update({
			'lamp/off': true,
			'room/off': true,
			'nanoleaf/off': true
		});
	} else {
		await database.ref('lights').update({
			'lamp/off': false,
			'room/off': false,
			'nanoleaf/off': false
		});
	}
	return isAnythingOn;
};

const applyTheme = async (themeName) => {

}

module.exports = {
	isLightOff,
	toggleLight,
	toggleAllLights
}
