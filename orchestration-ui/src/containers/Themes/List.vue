<template>
	<b-container class="ThemesList">

		<section class="ThemesList__header">

			<div>

				<b-button
					class="ThemesList__header__button"
					variant="primary"
					v-text="'New Theme'"
					:to="{ name: 'themes.create' }"/>

				<b-button
					class="ThemesList__header__button"
					variant="info"
					v-text="'Refresh'"
					@click="fetchThemesAndSetupPage"/>

			</div>

			<h2>Themes</h2>

		</section>

		<span
			v-if="page.isLoading"
			v-text="'Loading...'"/>

		<template v-if="!page.isLoading">

			<span
				v-if="themes.length === 0"
				v-text="'There are no themes to display. Why not create one?'"/>
			<b-table
				v-else
				:items="themes"/>

		</template>

	</b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
			page: {
				isLoading: false
			}
		};
	},
	computed: {
		...mapGetters({
			themes: 'themes/themes'
		})
	},
	methods: {
		...mapActions({
			fetchThemes: 'themes/fetchThemes'
		}),
		async fetchThemesAndSetupPage() {
			this.page.isLoading = true;
			await this.fetchThemes();
			this.page.isLoading = false;
		}
	},
	created() {
		this.fetchThemesAndSetupPage();
	}
};
</script>

<style lang="scss">

.ThemesList {
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


}

</style>
