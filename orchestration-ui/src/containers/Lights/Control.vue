<template>
	<default-layout :isLoading="page.isLoading" :isSubmitting="page.isSubmitting">

		<template v-slot:title>
			Lights
		</template>

		<template v-slot:actions>
			<b-button
				variant="info"
				v-text="'Refresh'"
				@click="fetch"/>

			<b-btn
				variant="info"
				v-text="'Save as Theme'"
				@click="showSaveAsThemeModal"/>

			<b-btn
				variant="primary"
				v-text="'Update Lights'"
				:disabled="page.isSubmitting"
				@click="submit"/>
		</template>

		<template v-slot:content>

			<list v-model="lightsInputs"/>

			<save-as-theme-modal
				:visible="page.isSaveAsThemeModalVisible"
				:theme="{ lights: lightsInputs }"
				@submitted="goToThemesList"
				@hidden="hideSaveAsThemeModal"/>

		</template>

	</default-layout>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import toastService from '../../lib/toastService';
import DefaultLayout from '../../components/DefaultLayout.vue';
import List from './components/List.vue';
import SaveAsThemeModal from '../Themes/components/SaveAsThemeModal.vue';

export default {
	components: {
		DefaultLayout,
		List,
		SaveAsThemeModal
	},
	data() {
		return {
			page: {
				isLoading: false,
				isSubmitting: false,
				isSaveAsThemeModalVisible: false
			},
			lightsInputs: []
		};
	},
	computed: {
		...mapGetters({
			lights: 'lights/lights'
		})
	},
	methods: {
		...mapActions({
			fetchLights: 'lights/fetchLights',
			updateLights: 'lights/updateLights'
		}),
		async fetch() {
			this.page.isLoading = true;
			await this.fetchLights();
			this.lightsInputs = cloneDeep(this.lights);
			this.page.isLoading = false;
		},
		async submit() {
			if (!this.lights) return;
			this.page.isSubmitting = true;
			try {
				await this.updateLights(this.lightsInputs);
				this.fetch();
				toastService.toast('Lights Updated');
			} catch (err) {
				toastService.toast(err);
			}
			this.page.isSubmitting = false;
		},
		showSaveAsThemeModal() {
			this.page.isSaveAsThemeModalVisible = true;
		},
		hideSaveAsThemeModal() {
			this.page.isSaveAsThemeModalVisible = false;
		},
		goToThemesList() {
			this.$router.push({ name: 'themes.list' });
		}
	},
	created() {
		this.fetch();
	}
};
</script>
