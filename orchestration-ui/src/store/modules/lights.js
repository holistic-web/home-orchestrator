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
		async fetchLights({ commit, rootState }, options = {}) {
			const fetchLights = rootState.firebase.functions().httpsCallable('getLights');
			const { data: lights } = await fetchLights();
			if (!options.skipCommit) commit('SET_LIGHTS', lights);
			return lights;
		},
		async updateLights({ rootState }, lights) {
			const updateLights = rootState.firebase.functions().httpsCallable('updateLights');
			const result = await updateLights(lights);
			return result;
		}
	},
	getters: {
		lights: state => state.lights
	}
};
