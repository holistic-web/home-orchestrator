<template>
	<b-container class="Lights">

		<section class="Lights__header">

			<h2>Lights</h2>

			<div class="Lights__header__buttons">
				<b-button
					class="Lights__header__button"
					variant="info"
					v-text="'Refresh'"
					@click="fetchLightsAndSetupPage"/>

				<b-btn
					v-if="!page.isSubmitting"
					class="Lights__header__button"
					variant="primary"
					v-text="'Update Lights'"
					@click="submit"/>
			</div>

		</section>

		<span
			v-if="page.isLoading"
			v-text="'Loading...'"/>
		<span
			v-if="page.isSubmitting"
			v-text="'Submitting...'"/>

		<light-list
			v-if="!page.isLoading && !page.isSubmitting"
			v-model="lightsInputs"/>


	</b-container>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import toastService from '../../lib/toastService';
import LightList from './components/LightList.vue';

export default {
	components: {
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

<style lang="scss">

.Lights {
	margin-top: 1rem;
	display: flex;
	flex-direction: column;

	&__header {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 1rem;

		@media all and (min-width: 768px) {
			flex-direction: row;
		}

		&__buttons {
			display: flex;
			flex-direction: column;

			@media all and (min-width: 768px) {
				flex-direction: row;
			}
		}

		&__button {
			margin-bottom: 1rem;

			@media all and (min-width: 768px) {
				margin-bottom: 0;
				margin-left: 1rem;
			}

		}
	}
}

</style>
