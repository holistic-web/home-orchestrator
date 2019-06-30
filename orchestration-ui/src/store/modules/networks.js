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
		async fetchNetwork({ commit, rootState }, id) {
			const fetchNetwork = rootState.firebase.functions().httpsCallable('getNetwork');
			const { data: network } = await fetchNetwork(id);
			commit('SET_NETWORK', network);
			return network;
		},
		async fetchNetworks({ commit, rootState }, options = {}) {
			const fetchNetworks = rootState.firebase.functions().httpsCallable('getNetworks');
			const { data: networks } = await fetchNetworks();
			if (!options.skipCommit) commit('SET_NETWORKS', networks);
			return networks;
		}
	},
	getters: {
		networks: state => state.networks,
		network: state => state.network
	}
};
