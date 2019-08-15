/* eslint-disable no-param-reassign */
import axios from 'axios';
import config from '../../lib/config';

export default {
	namespaced: true,
	state: {
		users: [],
		user: null
	},
	mutations: {
		SET_USERS(state, users) {
			state.users = users;
		},
		SET_USER(state, user) {
			state.user = user;
		}
	},
	actions: {
		async fetchUser({ commit, rootGetters }, email) {
			const { _id: networkId } = rootGetters['networks/network'];
			const { data: user } = await axios.get(
				`${config.API_BASE}/users/${email}`,
				{
					params: { networkId }
				}
			);
			commit('SET_USER', user);
			return user;
		},
		async fetchUsers({ commit, rootGetters }, options = {}) {
			const network = rootGetters['networks/network'];
			const { data: users } = await axios.get(
				`${config.API_BASE}/users`,
				{
					params: { networkId: network._id }
				}
			);
			users.push({
				email: network.owner,
				role: 'owner'
			});
			if (!options.skipCommit) commit('SET_USERS', users);
			return users;
		},
		async createUser({ rootGetters }, { email, role }) {
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await axios.post(
				`${config.API_BASE}/users`,
				{
					user: { email, role },
					networkId
				}
			);
			return result;
		},
		async deleteUser({ rootGetters }, email) {
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await axios.delete(
				`${config.API_BASE}/users/${email}`,
				{
					params: { networkId }
				}
			);
			return result;
		},
		async updateUserRole({ rootGetters }, { email, role }) {
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await axios.patch(
				`${config.API_BASE}/users/${email}`,
				{
					user: { email, role },
					networkId
				}
			);
			return result;
		}
	},
	getters: {
		users: state => state.users,
		user: state => state.user
	}
};
