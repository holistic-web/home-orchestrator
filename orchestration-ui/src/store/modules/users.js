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
		async fetchUsers({ commit, rootGetters }, options = {}) {
			const { uid } = rootGetters['account/account'].user;
			const { data: users } = await axios.get(
				`${config.API_BASE}/users`,
				{ params: { userId: uid } }
			);
			if (!options.skipCommit) commit('SET_USERS', users);
			return users;
		},
		async createUser({ rootGetters }, { email, role }) {
			const { uid } = rootGetters['account/account'].user;
			const result = await axios.post(
				`${config.API_BASE}/users`,
				{
					user: { email, role },
					userId: uid
				}
			);
			return result;
		},
		async deleteUser({ rootGetters }, userId) {
			const { uid } = rootGetters['account/account'].user;
			const result = await axios.delete(
				`${config.API_BASE}/users/${userId}`,
				{ params: { userId: uid } }
			);
			return result;
		},
		async updateUserRole({ rootGetters }, { userId, role }) {
			const { uid } = rootGetters['account/account'].user;
			const result = await axios.patch(
				`${config.API_BASE}/users/${userId}`,
				{
					user: userId,
					role,
					userId: uid
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
