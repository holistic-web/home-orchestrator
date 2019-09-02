/* eslint-disable no-param-reassign */
import config from '../../lib/config';
import httpService from '../../lib/httpService';

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
			const { data: users } = await httpService.request({
				url: `${config.API_BASE}/users`,
				method: 'GET',
				params: { userId: uid }
			});
			if (!options.skipCommit) commit('SET_USERS', users);
			return users;
		},
		async createUser({ rootGetters }, { email, role }) {
			const { uid } = rootGetters['account/account'].user;
			const result = await httpService.request({
				url: `${config.API_BASE}/users`,
				method: 'POST',
				data: {
					user: { email, role },
					userId: uid
				}
			});
			return result;
		},
		async deleteUser({ rootGetters }, userId) {
			const { uid } = rootGetters['account/account'].user;
			const result = await httpService.request({
				url: `${config.API_BASE}/users/${userId}`,
				method: 'DELETE',
				params: { userId: uid }
			});
			return result;
		},
		async updateUserRole({ rootGetters }, { userId, role }) {
			const { uid } = rootGetters['account/account'].user;
			const result = await httpService.request({
				url: `${config.API_BASE}/users/${userId}`,
				method: 'PATCH',
				data: {
					user: { userId, role },
					userId: uid
				}
			});
			return result;
		}
	},
	getters: {
		users: state => state.users,
		user: state => state.user
	}
};
