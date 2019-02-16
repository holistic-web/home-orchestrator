<template>
	<div class="Control">

		<v-icon v-if="page.isLoading" v-text="'progress'"/>

		<template v-else>
			<section class="Control__lights">
				<light v-model="lights.nanoleaf" label="Nanoleaf"/>
				<light v-model="lights.room" label="Room"/>
				<light v-model="lights.lamp" label="Lamp"/>
			</section>

			<section class="Control__buttons">
				<v-icon v-if="page.isSubmitting" v-text="'progress'"/>
				<v-btn
					v-else
					class="w-100"
					color="primary"
					v-text="'Update'"
					:disabled="isUpdateButtonDisabled"
					@click="submit"/>
			</section>
		</template>

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
			data: 'control/data'
		}),
		isUpdateButtonDisabled() {
			return !this.lights;
		}
	},
	methods: {
		...mapActions({
			fetchData: 'control/fetch',
			postUpdate: 'control/update'
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
@import '../../styles/index.scss';

.Control {
	display: flex;

	&__lights {
		display: flex;
		flex-direction: row;
		height: 90%;
	}

	&__buttons {
		display: flex;
		width: 100%;
		height: 10%;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}
}

</style>
