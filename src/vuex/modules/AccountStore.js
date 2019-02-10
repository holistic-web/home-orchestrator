/* eslint-disable no-param-reassign, no-underscore-dangle */

const collectionName = 'users';

export default {
	namespaced: true,
	state: {
		auth: null,
		account: null,
		token: null
	},
	mutations: {
		SET_AUTH(state, data) {
			if (!data) {
				state.auth = null;
			} else {
				state.auth = data;
			}
		},
		SET_ACCOUNT(state, account) {
			if (!account) {
				state.account = null;
			} else {
				state.account = account;
			}
		},
		SET_TOKEN(state, result) {
			state.token = result;
		}
	},
	actions: {
		async signUp({ commit, dispatch, rootState }, {
			email, password, firstName, lastName
		}) {
			const result = await rootState.firebase.auth()
				.createUserWithEmailAndPassword(email, password);
			commit('SET_AUTH', result);
			const user = await rootState.db.collection(collectionName)
				.doc(result.user.uid)
				.set({
					email,
					firstName,
					lastName
				});
			await dispatch('logIn', { email, password });
			return user;
		},
		/**
		 * Logs in with given credentials and stores these credentials.
		 * Call with {} to log in with last used credentials
		 * @param {String} email the user's email (email)
		 * @param {String} password the user's password
		 */
		async logIn({ commit, state, rootState }, { email, password, doRedirect = true }) {
			if (!email) email = state._email;
			if (!password) password = state._password;
			const result = await rootState.firebase.auth()
				.signInWithEmailAndPassword(email, password);
			state._email = email;
			state._password = password;
			commit('SET_AUTH', result);
			const accountRef = rootState.db.collection(collectionName)
				.doc(result.user.uid);
			const [snap, token] = await Promise.all([
				accountRef.get(),
				rootState.firebase.auth().currentUser.getIdToken()
			]);
			const account = { ...snap.data(), id: result.user.uid };
			commit('SET_ACCOUNT', account);
			commit('SET_TOKEN', token);
			if (doRedirect) window.location.replace('/');
			return account;
		},
		async logOut({ commit, rootState }) {
			const result = await rootState.firebase.auth()
				.signOut();
			commit('SET_AUTH', null);
			commit('SET_ACCOUNT', null);
			commit('SET_TOKEN', null);
			localStorage.clear();
			return result;
		}
	},
	getters: {
		account: state => state.account
	}
};
