/* eslint-disable no-param-reassign */

export default {
	namespaced: true,
	state: {
		templates: []
	},
	mutations: {
		SET_TEMPLATES(state, templates) {
			state.templates = templates;
		}
	},
	actions: {
		async fetchTemplates({ commit, rootState }, options = {}) {
			const templatesSnapshots = await rootState.db.collection('templates').get();
			const templates = templatesSnapshots.docs.map(doc => doc.data());
			if (!options.skipCommit) commit('SET_TEMPLATES', templates);
			return templates;
		},
		async updateTemplates({ rootState }, templates) {
			const updatetemplates = rootState.firebase.functions().httpsCallable('updatetemplates');
			const result = await updatetemplates(templates);
			return result;
		}
	},
	getters: {
		templates: state => state.templates
	}
};
