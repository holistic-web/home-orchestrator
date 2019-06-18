<template>
	<b-container class="Lights">

		<section class="Lights__header">

			<div>
				<b-button
					class="Lights__header__button"
					variant="info"
					v-text="'Refresh'"
					@click="fetchLightsAndSetupPage"/>
			</div>


			<h2>Lights</h2>

		</section>

		<span
			v-if="page.isLoading"
			v-text="'Loading...'"/>


		<template v-if="!page.isLoading">

			<section class="Lights__lights">

				<light
					v-for="(light, i) in lightsInputs"
					:key="light.name"
					class="Lights__light"
					v-model="lightsInputs[i]"/>

			</section>

			<p v-if="page.isSubmitting" v-text="'Submitting...'"/>
			<b-btn
				v-else
				size="lg"
				variant="primary"
				v-text="'Apply Changes'"
				:disabled="isUpdateButtonDisabled"
				@click="submit"/>

		</template>

	</b-container>
</template>

<script>
import { cloneDeep, isEqual } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import toastService from '../../lib/toastService';
import Light from './components/Light.vue';

export default {
	components: {
		Light
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
		}),
		isUpdateButtonDisabled() {
			return isEqual(this.lights, this.lightsInputs);
		}
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
		flex-direction: row-reverse;
		justify-content: space-between;
		margin-bottom: 1rem;

		&__button {
			margin-left: 1rem;
		}
	}

	&__lights {
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;

		@media all and (min-width: 768px) {
			flex-direction: row;
		}
	}

	&__light {
		width: 100%;
		margin-bottom: 1rem;

		@media all and (min-width: 768px) {
			margin: 0 1rem;

			&:first-of-type { margin-left: 0; }
			&:last-of-type { margin-right: 0; }
		}
	}
}

</style>
