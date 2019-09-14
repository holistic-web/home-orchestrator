/* eslint-disable no-param-reassign */
import config from '../../lib/config';
import httpService from '../../lib/httpService';

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
		async fetchTheme({ commit, rootGetters }, id) {
			const { uid: userId } = rootGetters['account/account'].user;
			const { data: theme } = await httpService.request({
				url: `${config.API_BASE}/themes/${id}`,
				method: 'GET',
				params: { userId }
			});
			commit('SET_THEME', theme);
			return theme;
		},
		async fetchThemes({ commit, rootGetters }, options = {}) {
			const { uid: userId } = rootGetters['account/account'].user;
			const { data: themes } = await httpService.request({
				url: `${config.API_BASE}/themes`,
				method: 'GET',
				params: { userId }
			});
			if (!options.skipCommit) commit('SET_THEMES', themes);
			return themes;
		},
		async updateTheme({ rootGetters }, theme) {
			const { uid: userId } = rootGetters['account/account'].user;
			const result = await httpService.request({
				url: `${config.API_BASE}/themes/${theme._id}`,
				method: 'PATCH',
				data: { theme, userId }
			});
			return result;
		},
		async createTheme({ rootGetters }, theme) {
			const { uid: userId } = rootGetters['account/account'].user;
			const result = await httpService.request({
				url: `${config.API_BASE}/themes`,
				method: 'POST',
				data: { theme, userId }
			});
			return result;
		},
		async deleteTheme({ rootGetters }, theme) {
			const { uid: userId } = rootGetters['account/account'].user;
			const result = await httpService.request({
				url: `${config.API_BASE}/themes/${theme._id}`,
				method: 'DELETE',
				params: { userId }
			});
			return result;
		},
		async applyTheme({ dispatch }, theme) {
			const result = await dispatch('lights/updateLights', theme.lights, { root: true });
			return result;
		}
	},
	getters: {
		themes: state => state.themes,
		theme: state => state.theme
	}
};
