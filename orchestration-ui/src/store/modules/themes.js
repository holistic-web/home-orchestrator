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
		async fetchTheme({ commit, rootState }, id, options = {}) {
			const fetchTheme = rootState.firebase.functions().httpsCallable('getTheme');
			const theme = await fetchTheme(id);
			if (!options.skipCommit) commit('SET_THEME', theme);
			return theme;
		},
		async fetchThemes({ commit, rootState }, options = {}) {
			const fetchThemes = rootState.firebase.functions().httpsCallable('getThemes');
			const { data: themes } = await fetchThemes();
			if (!options.skipCommit) commit('SET_THEMES', themes);
			return themes;
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
		async deleteTheme({ rootState }, theme) {
			const deleteTheme = rootState.firebase.functions().httpsCallable('deleteTheme');
			const result = await deleteTheme(theme);
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
