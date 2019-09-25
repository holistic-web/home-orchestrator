const { Router } = require('express');
const { getCollection, getDocument, setDocument, updateDocument, deleteDocument } = require('../../clients/FirebaseClient');
const { getUserRole } = require('../../lib/SecurityService');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { networkId } = req.user;

		const [{ ownerId }, networkUsers] = await Promise.all([
			getDocument(`networks/${networkId}`),
			getCollection(`networks/${networkId}/users`)
		]);
		networkUsers.push({ userId: ownerId, role: 'owner' });

		const userPromises = networkUsers.map(async networkUser => {
			const user = await getDocument(`users/${networkUser.userId}`);
			return {
				...networkUser,
				...user
			};
		});
		const users = await Promise.all(userPromises);

		return res.send(users);
	} catch (err) {
		return next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { networkId } = req.user;
		const user = req.body;

		const requestUserRole = await getUserRole(req.user._id, networkId);
		if (!['admin', 'owner'].includes(requestUserRole)) throw new Error('Not authorized');

		const users = await getCollection('users');

		const newUser = users.find(u => u.email === user.email);
		if (!newUser) throw new Error('user does not exist in home-orchestrator');
		user.userId = newUser._id;

		const result = await setDocument(`/networks/${networkId}/users/${user.userId}`, user);
		return res.send(result);
	} catch (err) {
		return next(err);
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const user = req.body;
		const { networkId } = req.user;
		const { id } = req.params;

		const requestUserRole = await getUserRole(req.user._id, networkId);
		if (!['admin', 'owner'].includes(requestUserRole)) throw new Error('Not authorized');

		const { ownerId } = await getDocument(`networks/${networkId}`);
		if (ownerId === id) throw new Error('Cannot modify network owner');

		const result = await updateDocument(`networks/${networkId}/users/${id}`, user);
		return res.send(result);
	} catch (err) {
		return next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.user;
		const { id } = req.params;

		const requestUserRole = await getUserRole(req.user._id, networkId);
		if (!['admin', 'owner'].includes(requestUserRole)) throw new Error('Not authorized');

		const { ownerId } = await getDocument(`networks/${networkId}`);
		if (ownerId === id) throw new Error('Cannot delete network owner');

		const result = await deleteDocument(`networks/${networkId}/users/${id}`);
		return res.send(result);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
