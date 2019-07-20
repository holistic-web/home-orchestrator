/* eslint-disable no-param-reassign */

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
		async fetchUser({ commit, rootState, rootGetters }, email) {
			const fetchUser = rootState.firebase.functions().httpsCallable('getUser');
			const { _id: networkId } = rootGetters['networks/network'];
			const { data: user } = await fetchUser({ email, networkId });
			commit('SET_USER', user);
			return user;
		},
		async fetchUsers({ commit, rootState, rootGetters }, options = {}) {
			const fetchUsers = rootState.firebase.functions().httpsCallable('getUsers');
			const { _id: networkId } = rootGetters['networks/network'];
			const { data: users } = await fetchUsers(networkId);
			if (!options.skipCommit) commit('SET_USERS', users);
			return users;
		},
		async createUser({ rootState, rootGetters }, { email, role }) {
			const createTheme = rootState.firebase.functions().httpsCallable('createUser');
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await createTheme({ email, role, networkId });
			return result;
		},
		async deleteUser({ rootState, rootGetters }, email) {
			const deleteUser = rootState.firebase.functions().httpsCallable('deleteUser');
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await deleteUser({ email, networkId });
			return result;
		},
		async updateUserRole({ rootState, rootGetters }, { email, role }) {
			const updateUserRole = rootState.firebase.functions().httpsCallable('updateUserRole');
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await updateUserRole({ email, role, networkId });
			return result;
		}
	},
	getters: {
		users: state => state.users,
		user: state => state.user
	}
};
