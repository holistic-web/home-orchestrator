<template>
	<div class="Lights">

		<b-container class="Lights__inner">

			<p
				v-if="page.isLoading"
				v-text="'Loading...'"/>

			<template v-else>

				<section class="Lights__lights">

					<light class="Lights__light" v-model="lights.nanoleaf" label="Nanoleaf"/>

					<light class="Lights__light" v-model="lights.room" label="Room"/>

					<light class="Lights__light" v-model="lights.lamp" label="Lamp"/>

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

			{{ newLights }}

		</b-container>

	</div>
</template>

<script>
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
			lights: null
		};
	},
	computed: {
		...mapGetters({
			data: 'control/data',
			newLights: 'lights/lights'
		}),
		isUpdateButtonDisabled() {
			return !this.lights;
		}
	},
	methods: {
		...mapActions({
			fetchData: 'control/fetch',
			postUpdate: 'control/update',
			fetchLights: 'lights/fetchLights'
		}),
		async fetch() {
			this.page.isLoading = true;
			await this.fetchData();
			const { lights } = this.data.state;
			this.lights = lights;
			this.page.isLoading = false;
		},
		async submit() {
			if (!this.lights) return;
			this.page.isSubmitting = true;
			const commit = {};
			commit['state/lights'] = this.lights;
			await this.postUpdate(commit);
			this.page.isSubmitting = false;
		}
	},
	created() {
		this.fetch();
		this.fetchLights();
	},
	watch: {
		lights() {
			if (!this.data) return;
			const commit = {};
			commit['state/lights'] = this.lights;
			this.postUpdate(commit);
		}
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

	&__lights {
		margin-bottom: 1rem;
	}

	&__light {
		margin-bottom: 1rem;
	}
}

</style>
