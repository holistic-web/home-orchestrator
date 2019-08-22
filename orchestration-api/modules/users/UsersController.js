const { Router } = require('express');
const { getCollection, getDocument, setDocument, updateDocument, deleteDocument } = require('../../clients/FirebaseClient');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const { networkId } = req.user;

		const [{ ownerId }, networkUsers] = await Promise.all([
			getDocument(`networks/${networkId}`),
			getCollection(`networks/${networkId}/users`)
		]);
		networkUsers.push({ userId: ownerId, role: 'owner'});

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
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { user, userId } = req.body;

		const [{ networkId }, users] = await Promise.all([
			getDocument(`users/${userId}`),
			getCollection('users')
		]);

		const newUser = users.find(u => u.email === user.email);
		if (!newUser) throw new Error('user not found');
		user.userId = newUser._id;

		const result = await setDocument(`/networks/${networkId}/users/${user.userId}`, user);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const { user } = req.body;
		const { networkId } = req.user;
		const { id } = req.params;
		const result = await updateDocument(`networks/${networkId}/users/${id}`, user);
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { networkId } = req.user;
		const { id } = req.params;
		const result = await deleteDocument(`networks/${networkId}/users/${id}`)
		return res.send(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;