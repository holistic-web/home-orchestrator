<template>
	<div class="Lights">

		<b-container class="Lights__inner">

			<section class="Lights__header">
				<b-button
					class="Lights__refreshButton"
					variant="info"
					v-text="'Refresh'"
					@click="fetchLightsAndSetupPage"/>
				<span
					v-if="page.isLoading"
					v-text="'Loading...'"/>
			</section>

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

	</div>
</template>

<script>
import { cloneDeep, isEqual } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
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
			data: 'control/data',
			lights: 'lights/lights'
		}),
		isUpdateButtonDisabled() {
			return isEqual(this.lights, this.lightsInputs);
		}
	},
	methods: {
		...mapActions({
			fetchData: 'control/fetch',
			postUpdate: 'control/update',
			fetchLights: 'lights/fetchLights'
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
			// #Todo update lights
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
	padding: 1rem;

	&__inner {
		display: flex;
		flex-direction: column;
	}

	&__header {
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	&__lights {
		margin-bottom: 1rem;
	}

	&__light {
		margin-bottom: 1rem;
	}
}

</style>
