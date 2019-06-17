<template>
	<b-container class="TemplatesEdit">

		<section class="TemplatesEdit__header">

			<div>

				<b-button
					class="TemplatesEdit__header__button"
					variant="primary"
					v-text="'Create Template'"/>

			</div>

			<h2 v-text="titleText"/>

		</section>

		<span
			v-if="page.isLoading"
			v-text="'Loading...'"/>

		<template v-if="!page.isLoading">
			<h3>Lights</h3>
			<div class="TemplatesEdit__lights">

				<light
					v-for="(light, i) in lights"
					:key="light.name"
					class="TemplatesEdit__lights__item"
					v-model="templateInput.lights[i]"/>

			</div>
		</template>

	</b-container>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import Light from '../Lights/components/Light.vue';

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
			templateInput: {}
		};
	},
	computed: {
		...mapGetters({
			lights: 'lights/lights'
		}),
		isInCreateMode() {
			return this.$route.name === 'templates.create';
		},
		titleText() {
			if (this.isInCreateMode) return 'New Template';
			return 'Edit Template';
		}
	},
	methods: {
		...mapActions({
			fetchLights: 'lights/fetchLights'
		}),
		async setUpPage() {
			this.page.isLoading = true;
			if (this.isInCreateMode) {
				await this.fetchLights();
				this.templateInput.lights = cloneDeep(this.lights);
			}
			this.page.isLoading = false;
		}
	},
	created() {
		this.setUpPage();
	}
};

</script>

<style lang="scss">

.TemplatesEdit {
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		&__item {
			width: 100%;
			margin: 0 1rem;

			&:first-of-type { margin-left: 0; }
			&:last-of-type { margin-right: 0; }
		}
	}
}
</style>
