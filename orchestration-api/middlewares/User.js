const { getDocument } = require('../clients/FirebaseClient');

module.exports = async (req, res, next) => {
	const userData = await getDocument(`users/${req.user.uid}`);
	req.user = {
		...req.user,
		...userData
	};
	next();
};