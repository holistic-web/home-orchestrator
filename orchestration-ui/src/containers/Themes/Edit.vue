<template>
	<b-container class="ThemesEdit">

		<section class="ThemesEdit__header">

			<div>

				<b-button
					class="ThemesEdit__header__button"
					variant="info"
					v-text="'List View'"
					:to="{ name: 'themes.list' }"/>

				<b-button
					v-if="isInCreateMode"
					class="ThemesEdit__header__button"
					variant="outline-primary"
					v-text="'Create Theme'"
					:disabled="isSubmitDisabled"
					@click="onCreateClick"/>

				<b-button
					v-if="!isInCreateMode"
					class="ThemesEdit__header__button"
					variant="primary"
					v-text="'Update Theme'"
					:disabled="isSubmitDisabled"
					@click="onUpdateClick"/>

			</div>

			<h2 v-text="titleText"/>

		</section>

		<span
			v-if="page.isLoading"
			v-text="'Loading...'"/>

		<span
			v-if="page.isSubmitting"
			v-text="'Submitting...'"/>

		<template v-if="!page.isLoading && !page.isSubmitting">

			<b-form-group
				label="Name"
				label-for="ThemesEdit__name">
				<b-form-input
					id="ThemesEdit__name"
					v-model="themeInput.name"
					trim/>
			</b-form-group>

			<section>
				<h3>Lights</h3>
				<div class="ThemesEdit__lights">

					<light
						v-for="(light, i) in themeInput.lights"
						:key="light.name"
						class="ThemesEdit__lights__item"
						v-model="themeInput.lights[i]"/>
				</div>
			</section>

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
			lights: 'lights/lights',
			theme: 'themes/theme'
		}),
		isInCreateMode() {
			return this.$route.name === 'themes.create';
		},
		titleText() {
			if (this.isInCreateMode) return 'New Theme';
			return 'Edit Theme';
		},
		isSubmitDisabled() {
			return (!this.themeInput.name || this.page.isSubmitting);
		}
	},
	methods: {
		...mapActions({
			fetchLights: 'lights/fetchLights',
			fetchTheme: 'themes/fetchTheme',
			updateTheme: 'themes/updateTheme',
			createTheme: 'themes/createTheme',
			applyTheme: 'themes/applyTheme'
		}),
		async setUpPage() {
			this.page.isLoading = true;
			if (this.isInCreateMode) {
				await this.fetchLights();
				this.themeInput.lights = cloneDeep(this.lights);
			} else {
				const { id } = this.$route.params;
				await this.fetchTheme(id);
				this.themeInput = this.theme;
			}
			this.page.isLoading = false;
		},
		async onCreateClick() {
			this.page.isSubmitting = true;
			try {
				await this.createTheme(this.themeInput);
				toastService.toast('Theme created');
				this.$router.push({ name: 'themes.list' });
			} catch (err) {
				toastService.toast(err.message);
			}
			this.page.isSubmitting = false;
		},
		async onUpdateClick() {
			this.page.isSubmitting = true;
			try {
				await this.updateTheme(this.themeInput);
				toastService.toast('Theme updated');
			} catch (err) {
				toastService.toast(err.message);
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
