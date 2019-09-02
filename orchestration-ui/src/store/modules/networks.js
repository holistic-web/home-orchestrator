/* eslint-disable no-param-reassign */
import config from '../../lib/config';
import httpService from '../../lib/httpService';

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
			const result = await httpService.request({
				url: `${config.API_BASE}/me/networkId`,
				method: 'PATCH',
				data: { userId, networkId }
			});
			return result;
		},
		async fetchNetwork({ commit, rootGetters }, options = {}) {
			const { uid: userId } = rootGetters['account/account'].user;
			const { data: network } = await httpService.request({
				url: `${config.API_BASE}/me/network`,
				method: 'GET',
				params: { userId }
			});
			if (!options.skipCommit) commit('SET_NETWORK', network);
			return network;
		},
		async fetchNetworks({ commit, rootGetters }, options = {}) {
			const { uid: userId } = rootGetters['account/account'].user;
			const { data: networks } = await httpService.request({
				url: `${config.API_BASE}/networks`,
				method: 'GET',
				params: { userId }
			});
			if (!options.skipCommit) commit('SET_NETWORKS', networks);
			return networks;
		},
		async updateNetwork({ rootGetters }, network) {
			const { uid: userId } = rootGetters['account/account'].user;
			const result = await httpService.request({
				url: `${config.API_BASE}/me/network`,
				method: 'PATCH',
				data: { userId, network }
			});
			return result;
		}
	},
	getters: {
		networks: state => state.networks,
		network: state => state.network
	}
};
