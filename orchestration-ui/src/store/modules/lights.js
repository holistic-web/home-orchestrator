/* eslint-disable no-param-reassign */
import config from '../../lib/config';
import httpService from '../../lib/httpService';

export default {
	namespaced: true,
	state: {
		lights: []
	},
	mutations: {
		SET_LIGHTS(state, lights) {
			state.lights = lights;
		}
	},
	actions: {
		async fetchLights({ commit, rootGetters }, options = {}) {
			const { uid: userId } = rootGetters['account/account'].user;
			const { data: lights } = await httpService.request({
				url: `${config.API_BASE}/lights`,
				method: 'GET',
				params: { userId }
			});
			if (!options.skipCommit) commit('SET_LIGHTS', lights);
			return lights;
		},
		async updateLights({ rootGetters }, lights) {
			const { uid: userId } = rootGetters['account/account'].user;
			const result = await httpService.request({
				url: `${config.API_BASE}/lights/update`,
				method: 'POST',
				data: { lights, userId }
			});
			return result;
		}
	},
	getters: {
		lights: state => state.lights
	}
};
