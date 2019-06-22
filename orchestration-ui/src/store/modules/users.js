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
		async fetchUser({ commit, rootState }, email) {
			const fetchUser = rootState.firebase.functions().httpsCallable('getUser');
			const { data: user } = await fetchUser(email);
			commit('SET_USER', user);
			return user;
		},
		async fetchUsers({ commit, rootState }, options = {}) {
			const fetchUsers = rootState.firebase.functions().httpsCallable('getUsers');
			const { data: users } = await fetchUsers();
			if (!options.skipCommit) commit('SET_USERS', users);
			return users;
		},
		async createUser({ rootState }, { email, role }) {
			const createTheme = rootState.firebase.functions().httpsCallable('createUser');
			const result = await createTheme({ email, role });
			return result;
		},
		async deleteUser({ rootState }, email) {
			const deleteUser = rootState.firebase.functions().httpsCallable('deleteUser');
			const result = await deleteUser(email);
			return result;
		},
		async updateUserRole({ rootState }, { email, role }) {
			const updateUserRole = rootState.firebase.functions().httpsCallable('updateUserRole');
			const result = await updateUserRole({ email, role });
			return result;
		}
	},
	getters: {
		users: state => state.users,
		user: state => state.user
	}
};
