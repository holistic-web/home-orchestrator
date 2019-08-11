/* eslint-disable no-param-reassign */

export default {
	namespaced: true,
	state: {
		networks: [],
		network: null
	},
	mutations: {
		SET_NETWORKS(state, networks) {
			state.networks = networks;
		},
		SET_NETWORK(state, network) {
			state.network = network;
		}
	},
	actions: {
		setCurrentNetwork({ commit }, network) {
			commit('SET_NETWORK', network);
		},
		async fetchNetworks({ commit, rootState }, options = {}) {
			const fetchNetworks = rootState.firebase.functions().httpsCallable('getNetworks');
			const { data: networks } = await fetchNetworks();
			if (!options.skipCommit) commit('SET_NETWORKS', networks);
			return networks;
		},
		async updateNetwork({ rootState }, network) {
			const updateNetwork = rootState.firebase.functions().httpsCallable('updateNetwork');
			const result = await updateNetwork(network);
			return result;
		}
	},
	getters: {
		networks: state => state.networks,
		network: state => state.network
	}
};
