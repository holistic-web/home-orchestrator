module.exports = (err, req, res) => {
	console.error(err.stack);
	return res.status(500).send('Something broke!');
};
