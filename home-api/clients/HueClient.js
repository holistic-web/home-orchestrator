const { HueApi } = require('node-hue-api');

const rgbToXY = rgb => {
	// convert string to rgb array
	const rgbString = rgb.match(/\((.*)\)/)[1];
	const rgbArray = rgbString.split(',').map(value => parseInt(value, 10));

	let red = rgbArray[0] / 255;
	let green = rgbArray[1] / 255;
	let blue = rgbArray[2] / 255;
	if (red > 0.04045) {
		red = ((red + 0.055) / (1.0 + 0.055)) ** 2.4;
	} else red /= 12.92;
	if (green > 0.04045) {
		green = Math.pow((green + 0.055) / (1.0 + 0.055), 2.4);
	} else green /= 12.92;
	if (blue > 0.04045) {
		blue = Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4);
	} else blue /= 12.92;
	const X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
	const Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
	const Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;
	const x = X / (X + Y + Z);
	const y = Y / (X + Y + Z);
	const xy = [x, y];
	return xy;
};

module.exports = class HueClient {
	constructor(hueIP, username) {
		this.hueApi = new HueApi(hueIP, username);
	}

	async update(light) {
		const colourAsXY = rgbToXY(light.state.colour);
		const result = await this.hueApi.setLightState(
			light.meta.hueId,
			{
				on: light.state.on,
				bri: light.state.brightness,
				xy: colourAsXY
				// xy: [0.5, 0.5]
			}
		);
		return result;
	}

};
