/* eslint-disable no-param-reassign */
import axios from 'axios';
import config from '../../lib/config';

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
			const { data: lights } = await axios.get(
				`${config.API_BASE}/lights`,
				{
					params: { userId }
				}
			);
			if (!options.skipCommit) commit('SET_LIGHTS', lights);
			return lights;
		},
		async updateLights({ rootGetters }, lights) {
			const { uid: userId } = rootGetters['account/account'].user;
			const result = await axios.post(
				`${config.API_BASE}/lights/update`,
				{
					lights,
					userId
				}
			);
			return result;
		}
	},
	getters: {
		lights: state => state.lights
	}
};
