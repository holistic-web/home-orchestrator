<template>
	<b-container class="ThemesEdit">

		<section class="ThemesEdit__header">

			<div>

				<b-button
					class="ThemesEdit__header__button"
					variant="primary"
					v-text="'Create Theme'"
					:disabled="page.isSubmitting"
					@click="onCreateThemeClick"/>

			</div>

			<h2 v-text="titleText"/>

		</section>

		<span
			v-if="page.isLoading"
			v-text="'Loading...'"/>

		<template v-if="!page.isLoading">
			<h3>Lights</h3>
			<div class="ThemesEdit__lights">

				<light
					v-for="(light, i) in lights"
					:key="light.name"
					class="ThemesEdit__lights__item"
					v-model="themeInput.lights[i]"/>

			</div>
		</template>

	</b-container>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import toastService from '../../lib/toastService';
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
			themeInput: {}
		};
	},
	computed: {
		...mapGetters({
			lights: 'lights/lights'
		}),
		isInCreateMode() {
			return this.$route.name === 'themes.create';
		},
		titleText() {
			if (this.isInCreateMode) return 'New Theme';
			return 'Edit Theme';
		}
	},
	methods: {
		...mapActions({
			fetchLights: 'lights/fetchLights',
			createTheme: 'themes/createTheme'
		}),
		async setUpPage() {
			this.page.isLoading = true;
			if (this.isInCreateMode) {
				await this.fetchLights();
				this.themeInput.lights = cloneDeep(this.lights);
			}
			this.page.isLoading = false;
		},
		async onCreateThemeClick() {
			this.page.isSubmitting = true;
			try {
				await this.createTheme(this.themeInput);
				toastService.toast('Theme created');
				this.$router.push({ name: 'themes.list' });
			} catch (err) {
				toastService.toast(err);
			}
			this.page.isSubmitting = false;
		}
	},
	created() {
		this.setUpPage();
	}
};

</script>

<style lang="scss">

.ThemesEdit {
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
