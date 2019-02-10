import axios from 'axios';

const apiBase = process.env.API_URL || 'https://us-central1-wan-finance.cloudfunctions.net/api';

export default (storeName) => {
	const store = {
		namespaced: true,
		state: {
			count: 0,
			list: [],
			detail: null
		},
		mutations: {
			/* eslint-disable no-param-reassign */
			SET_COUNT(state, result) {
				const count = parseInt(result.data, 10);
				state.count = count;
			},
			SET_LIST(state, result) {
				const list = result.data;
				state.list = list;
			},
			SET_DETAIL(state, result) {
				state.detail = result.data;
			}
			/* eslint-enable */
		},
		actions: {
			async submit({ dispatch, rootState }, data, options = {}) {
				const path = `${apiBase}/${storeName}`;
				const { token } = rootState.account;
				try {
					const result = await axios.post(path, data, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					});
					return result;
				} catch (err) {
					await dispatch('account/logIn', { doRedirect: false }, { root: true });
					if (!options.isRetry) return dispatch('submit', data, { ...options, isRetry: true });
					return err;
				}
			},
			async count({ commit, dispatch, rootState }, options = {}) {
				const path = `${apiBase}/${storeName}s/count`;
				const { token } = rootState.account;
				try {
					const result = await axios.get(path, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					});
					commit('SET_COUNT', result);
					return result;
				} catch (err) {
					await dispatch('account/logIn', { doRedirect: false }, { root: true });
					if (!options.isRetry) return dispatch('count', { ...options, isRetry: true });
					return err;
				}
			},
			async find({ commit, dispatch, rootState }, options = {}) {
				const limit = options.limit || 10;
				const skip = options.skip || 0;
				const sortBy = options.sortBy || 'createdAt';
				const dispatchCount = options.dispatchCount || true;
				const path = `${apiBase}/${storeName}s`;
				const { token } = rootState.account;
				try {
					if (dispatchCount) dispatch('count');
					const result = await axios.get(path, {
						params: {
							limit,
							skip,
							sortBy
						},
						headers: {
							Authorization: `Bearer ${token}`
						}
					});
					commit('SET_LIST', result);
					return result;
				} catch (err) {
					await dispatch('account/logIn', { doRedirect: false }, { root: true });
					if (!options.isRetry) return dispatch('find', { ...options, isRetry: true });
					return err;
				}
			},
			async get({ commit, dispatch, rootState }, id, options = {}) {
				const path = `${apiBase}/${storeName}/${id}`;
				const { token } = rootState.account;
				try {
					const result = await axios.get(path, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					});
					commit('SET_DETAIL', result);
					return result;
				} catch (err) {
					await dispatch('account/logIn', { doRedirect: false }, { root: true });
					if (!options.isRetry) return dispatch('get', id, { ...options, isRetry: true });
					return err;
				}
			}
		},
		getters: {
			count: state => state.count
		}
	};
	store.getters[`${storeName}s`] = state => state.list;
	store.getters[storeName] = state => state.detail;

	return store;
};
