/* eslint-disable no-param-reassign */

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
			const updateLights = rootState.firebase.functions().httpsCallable('updateLights');
			const { _id: networkId } = rootGetters['networks/network'];
			const result = await updateLights({ lights, networkId });
			return result;
		}
	},
	getters: {
		lights: state => state.lights
	}
};
