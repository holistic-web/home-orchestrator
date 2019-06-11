/* these values should match those found in ./colours.scss */

const colours = {
	white: '#fff',
	'white-off': '#f8f8f8',
	grey: '#5A6277',
	'grey-pale': '#E9EAEF',
	'grey-light': '#f0f0f0',
	'grey-dark': '#AEB4C1',
	'grey-darker': '#424857',
	'blue-light': '#00D5C3',
	'blue-dark': '#1B253D',
	red: '#dc3545'
};

export default {
	primary: colours['blue-light'],
	secondary: colours['blue-dark'],
	error: colours.red,
	background: colours['white-off'],
	text: colours.grey
};
