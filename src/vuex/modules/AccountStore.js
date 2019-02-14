/* eslint-disable no-param-reassign */

export default {
	namespaced: true,
	state: {
		account: null,
		token: null
	},
	mutations: {
		SET_ACCOUNT(state, data) {
			if (!data) {
				state.account = null;
			} else {
				state.account = data;
			}
		},
		SET_TOKEN(state, result) {
			state.token = result;
		}
	},
	actions: {
		/**
		 * Logs in with given credentials and stores these credentials.
		 * Call with {} to log in with last used credentials
		 * @param {String} email the user's email (email)
		 * @param {String} password the user's password
		 */
		async logIn({ commit, rootState }, { doRedirect = true }) {
			const result = await rootState.firebase.auth()
				.signInWithPopup(rootState.provider);
			commit('SET_ACCOUNT', result);
			const token = await rootState.firebase.auth().currentUser.getIdToken();
			commit('SET_TOKEN', token);
			if (doRedirect) window.location.replace('/');
			return result;
		},
		async logOut({ commit, rootState }) {
			const result = await rootState.firebase.auth()
				.signOut();
			commit('SET_ACCOUNT', null);
			commit('SET_TOKEN', null);
			localStorage.clear();
			return result;
		}
	},
	getters: {
		account: state => state.account,
		token: state => state.token
	}
};
