const { getCollection, getDocument } = require('../clients/FirebaseClient');

module.exports.getUserRole = async (userId, networkId) => {
	const network = await getDocument(`network/${networkId}`);
	if (network.ownerId === userId) return 'owner';
	const networkUsers = await getCollection(`/networks/${networkId}/users`);
	let role = null;
	networkUsers.forEach(user => {
		if (user._id === userId) role = user.role;
	});
	return role;
};
