/* eslint-disable no-param-reassign */

export default {
	namespaced: true,
	state: {
		data: []
	},
	mutations: {
		SET_DATA(state, data) {
			state.data = data;
		}
	},
	actions: {
		async fetch({ commit, rootState }) {
			const result = await rootState.firebase.database().ref().once('value');
			const data = result.val();
			commit('SET_DATA', data);
		},
		async update({ dispatch, rootState }, commit) {
			console.log('commit: ', commit);
			await rootState.firebase.database().ref().update(commit);
			dispatch('fetch');
		}
	},
	getters: {
		data: state => state.data
	}
};
