/* eslint-disable no-param-reassign */
import axios from 'axios';
import config from '../../lib/config';

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
		async fetchNetworks({ commit, rootGetters }, options = {}) {
			const { email } = rootGetters['account/account'].user;

			const { data: networks } = await axios.get(
				`${config.API_BASE}/networks`,
				{
					params: { email }
				}
			);
			if (!options.skipCommit) commit('SET_NETWORKS', networks);
			return networks;
		},
		async updateNetwork(vuex, { network, networkId }) {
			const result = await axios.patch(
				`${config.API_BASE}/networks/${networkId}`,
				{ network }
			);
			return result;
		}
	},
	getters: {
		networks: state => state.networks,
		network: state => state.network
	}
};
