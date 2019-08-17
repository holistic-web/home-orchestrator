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
		async setCurrentNetwork({ rootGetters }, { _id: networkId }) {
			const { uid: userId } = rootGetters['account/account'].user;
			const result = await axios.patch(
				`${config.API_BASE}/me/networkId`,
				{ userId, networkId }
			);
			return result;
		},
		async fetchNetwork({ commit, rootGetters }, options = {}) {
			const { uid: userId } = rootGetters['account/account'].user;

			const { data: network } = await axios.get(
				`${config.API_BASE}/me/network`,
				{
					params: { userId }
				}
			);
			if (!options.skipCommit) commit('SET_NETWORKS', network);
			return network;
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
