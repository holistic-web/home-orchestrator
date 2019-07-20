/* eslint-disable no-param-reassign */

export default {
	namespaced: true,
	state: {
		themes: [],
		theme: null
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
		async fetchTheme({ commit, rootState, rootGetters }, id) {
			const fetchTheme = rootState.firebase.functions().httpsCallable('getTheme');
			const { _id: networkId } = rootGetters['networks/network'];
			const { data: theme } = await fetchTheme({ id, networkId });
			commit('SET_THEME', theme);
			return theme;
		},
		async fetchThemes({ commit, rootState, rootGetters }, options = {}) {
			const fetchThemes = rootState.firebase.functions().httpsCallable('getThemes');
			const { _id: networkId } = rootGetters['networks/network'];
			const { data: themes } = await fetchThemes(networkId);
			if (!options.skipCommit) commit('SET_THEMES', themes);
			return themes;
		},
		async updateTheme({ rootState, rootGetters }, theme) {
			const updateTheme = rootState.firebase.functions().httpsCallable('updateTheme');
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await updateTheme({ theme, networkId });
			return result;
		},
		async createTheme({ rootState, rootGetters }, theme) {
			const createTheme = rootState.firebase.functions().httpsCallable('createTheme');
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await createTheme({ theme, networkId });
			return result;
		},
		async deleteTheme({ rootState, rootGetters }, theme) {
			const deleteTheme = rootState.firebase.functions().httpsCallable('deleteTheme');
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await deleteTheme({ theme, networkId });
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
