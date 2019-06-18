/* eslint-disable no-param-reassign */

export default {
	namespaced: true,
	state: {
		themes: []
	},
	mutations: {
		SET_THEMES(state, themes) {
			state.themes = themes;
		},
		SET_THEME(state, theme) {
			state.theme = theme;
		}
	},
	actions: {
		async fetchThemes({ commit, rootState }, options = {}) {
			const themesSnapshots = await rootState.db.collection('themes').get();
			const themes = themesSnapshots.docs.map(doc => doc.data());
			if (!options.skipCommit) commit('SET_THEMES', themes);
			return themes;
		},
		async fetchTheme({ commit, rootState }, id, options = {}) {
			const themeRef = rootState.db.collection('themes').doc(id);
			const themeSnapshot = await themeRef.get();
			const theme = themeSnapshot.data();
			if (!options.skipCommit) commit('SET_THEME', theme);
			return theme;
		},
		async updateTheme({ rootState }, theme) {
			const updateTheme = rootState.firebase.functions().httpsCallable('updateTheme');
			const result = await updateTheme(theme);
			return result;
		},
		async createTheme({ rootState }, theme) {
			const createTheme = rootState.firebase.functions().httpsCallable('createTheme');
			const result = await createTheme(theme);
			return result;
		},
		async applyTheme({ dispatch }, theme) {
			await dispatch('lights/updateLights', theme.lights, { root: true });
			return 'success';
		}
	},
	getters: {
		themes: state => state.themes,
		theme: state => state.theme
	}
};
