/* eslint-disable no-param-reassign */
import axios from 'axios';
import config from '../../lib/config';

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
			const { _id: networkId } = rootGetters['networks/network'];
			const { data: theme } = await axios.get(
				`${config.API_BASE}/themes/${id}`,
				{
					params: { networkId }
				}
			);
			commit('SET_THEME', theme);
			return theme;
		},
		async fetchThemes({ commit, rootGetters }, options = {}) {
			const { _id: networkId } = rootGetters['networks/network'];
			const { data: themes } = await axios.get(
				`${config.API_BASE}/themes`,
				{
					params: { networkId }
				}
			);
			if (!options.skipCommit) commit('SET_THEMES', themes);
			return themes;
		},
		async updateTheme({ rootGetters }, theme) {
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await axios.patch(
				`${config.API_BASE}/themes/${theme._id}`,
				{
					theme,
					networkId
				}
			);
			return result;
		},
		async createTheme({ rootGetters }, theme) {
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await axios.post(
				`${config.API_BASE}/themes`,
				{
					theme,
					networkId
				}
			);
			return result;
		},
		async deleteTheme({ rootGetters }, theme) {
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await axios.delete(
				`${config.API_BASE}/themes/${theme._id}`,
				{
					params: { networkId }
				}
			);
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
