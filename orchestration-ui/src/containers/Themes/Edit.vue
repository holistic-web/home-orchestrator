<template>
	<div class="ThemesEdit">

		<b-container class="ThemesEdit__content">

			<section class="ThemesEdit__header">

				<h2 v-text="titleText"/>

				<div class="ThemesEdit__header__buttons">

					<b-button
						class="ThemesEdit__header__button"
						variant="info"
						v-text="'List View'"
						:to="{ name: 'themes.list' }"/>

					<b-button
						v-if="!isInCreateMode"
						class="ThemesEdit__header__button"
						variant="danger"
						v-text="'Delete Theme'"
						:disabled="page.isSubmitting"
						@click="openConfirmDeleteModal"/>

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
						variant="outline-info"
						v-text="'Update Theme'"
						:disabled="isSubmitDisabled"
						@click="onUpdateClick"/>

				</div>

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
					<light-list v-model="themeInput.lights"/>
				</section>

			</template>

		</b-container>

		<b-modal
			:visible="page.isConfirmDeleteModalVisible"
			title="Delete Theme"
			header-text-variant="light"
			header-bg-variant="danger"
			ok-variant="danger"
			cancel-variant="info"
			@ok="onDeleteClick"
			@hidden="hideConfirmDeleteModal">
			<span v-text="'Are you sure you want to delete this theme?'"/>
		</b-modal>

	</div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import toastService from '../../lib/toastService';
import LightList from '../Lights/components/LightList.vue';

export default {
	components: {
		LightList
	},
	data() {
		return {
			page: {
				isLoading: false,
				isSubmitting: false,
				isConfirmDeleteModalVisible: false
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
			deleteTheme: 'themes/deleteTheme'
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
		},
		async onDeleteClick() {
			this.page.isSubmitting = true;
			try {
				await this.deleteTheme(this.themeInput);
				toastService.toast('Theme deleted');
				this.$router.push({ name: 'themes.list' });
			} catch (err) {
				toastService.toast(err.message);
			}
			this.page.isSubmitting = false;
		},
		openConfirmDeleteModal() {
			this.page.isConfirmDeleteModalVisible = true;
		},
		hideConfirmDeleteModal() {
			this.page.isConfirmDeleteModalVisible = false;
		}
	},
	created() {
		this.setUpPage();
	}
};

</script>

<style lang="scss">

.ThemesEdit {

	&__content {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
	}

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
