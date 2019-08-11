/* eslint-disable no-param-reassign */
const axios = require('axios');

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
		async fetchLights({ commit, rootState, rootGetters }, options = {}) {
			const getLights = rootState.firebase.functions().httpsCallable('getLights');
			const { _id: networkId } = rootGetters['networks/network'];
			const { data: lights } = await getLights(networkId);
			if (!options.skipCommit) commit('SET_LIGHTS', lights);
			return lights;
		},
		async updateLights({ rootState, rootGetters }, lights) {
			const network = rootGetters['networks/network'];
			let result;
			if (network.settings.usingLocalAPI) {
				result = await axios.post(`${network.settings.localUrl}/lights/update`, { lights, networkId: network._id });
			} else {
				const updateLights = rootState.firebase.functions().httpsCallable('updateLights');
				result = await updateLights({ lights, networkId: network._id });
			}
			return result;
		}
	},
	getters: {
		lights: state => state.lights
	}
};
