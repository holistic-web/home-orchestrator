const getHexColour = (colourString) => {
	// inspired by: https://stackoverflow.com/a/24366628/9242579
	/* eslint-disable no-bitwise */
	const a = document.createElement('div');
	a.style.color = colourString;
	const colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(a => parseInt(a, 10));
	document.body.removeChild(a);
	return (colors.length >= 3) ? `#${((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)}` : false;
	/* eslint-enable */
};

export { getHexColour };
