require('dotenv').config()

export default {
	nanoleaf: {
		type: 'nanoleaf',
		endpoints: {
			setBrightness: process.env.NANOLEAF_SET_BRIGHTNESS_ENDPOINT || false,
			turnOn: process.env.NANOLEAF_TURN_ON_ENDPOINT || false,
			turnOff: process.env.NANOLEAF_TURN_OFF_ENDPOINT || false,
			setScene: process.env.NANOLEAF_SET_SCENE_ENDPOINT || false
		}
	},
	room: {
		type: 'hue',
		endpoints: {
			setBrightness: process.env.ROOM_SET_BRIGHTNESS_ENDPOINT || false,
			turnOn: process.env.ROOM_TURN_ON_ENDPOINT || false,
			turnOff: process.env.ROOM_TURN_OFF_ENDPOINT || false,
			setScene: process.env.ROOM_SET_SCENE_ENDPOINT || false
		}
	},
	lamp: {
		type: 'hue',
		endpoints: {
			setBrightness: process.env.LAMP_SET_BRIGHTNESS_ENDPOINT || false,
			turnOn: process.env.LAMP_TURN_ON_ENDPOINT || false,
			turnOff: process.env.LAMP_TURN_OFF_ENDPOINT || false,
			setScene: process.env.LAMP_SET_SCENE_ENDPOINT || false
		}
	}
}
