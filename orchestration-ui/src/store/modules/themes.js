/* eslint-disable no-param-reassign */

export default {
	namespaced: true,
	state: {
		themes: []
	},
	mutations: {
		SET_THEMES(state, themes) {
			state.themes = themes;
		}
	},
	actions: {
		async fetchThemes({ commit, rootState }, options = {}) {
			const themesSnapshots = await rootState.db.collection('themes').get();
			const themes = themesSnapshots.docs.map(doc => doc.data());
			if (!options.skipCommit) commit('SET_THEMES', themes);
			return themes;
		},
		async createTheme({ rootState }, theme) {
			const createTheme = rootState.firebase.functions().httpsCallable('createTheme');
			const result = await createTheme(theme);
			return result;
		}
	},
	getters: {
		themes: state => state.themes
	}
};
