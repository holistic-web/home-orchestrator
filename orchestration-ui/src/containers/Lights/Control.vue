<template>
	<default-layout :isLoading="page.isLoading" :isSubmitting="page.isSubmitting">

		<template v-slot:title>
			Lights
		</template>

		<template v-slot:actions>
			<b-button
				variant="info"
				v-text="'Refresh'"
				@click="fetchLightsAndSetupPage"/>

			<b-btn
				variant="primary"
				v-text="'Update Lights'"
				:disabled="page.isSubmitting"
				@click="submit"/>
		</template>

		<template v-slot:content>

			<light-list v-model="lightsInputs"/>

		</template>

	</default-layout>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import toastService from '../../lib/toastService';
import DefaultLayout from '../../components/DefaultLayout.vue';
import LightList from './components/LightList.vue';

export default {
	components: {
		DefaultLayout,
		LightList
	},
	data() {
		return {
			page: {
				isLoading: false,
				isSubmitting: false
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
		async fetchLightsAndSetupPage() {
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
				this.fetchLightsAndSetupPage();
				toastService.toast('Lights Updated');
			} catch (err) {
				toastService.toast(err);
			}
			this.page.isSubmitting = false;
		}
	},
	created() {
		this.fetchLightsAndSetupPage();
	}
};
</script>
