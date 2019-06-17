<template>
	<b-container class="TemplatesList">

		<section class="TemplatesList__header">

			<div>

				<b-button
					class="TemplatesList__header__button"
					variant="primary"
					v-text="'New Template'"
					:to="{ name: 'templates.create' }"/>

				<b-button
					class="TemplatesList__header__button"
					variant="info"
					v-text="'Refresh'"
					@click="fetchTemplatesAndSetupPage"/>

			</div>

			<h2>Templates</h2>

		</section>

		<span
			v-if="page.isLoading"
			v-text="'Loading...'"/>

		<template v-if="!page.isLoading">

			<span
				v-if="templates.length === 0"
				v-text="'There are no templates to display. Why not create one?'"/>
			<b-table
				v-else
				:items="templates"/>

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
			templates: 'templates/templates'
		})
	},
	methods: {
		...mapActions({
			fetchTemplates: 'templates/fetchTemplates'
		}),
		async fetchTemplatesAndSetupPage() {
			this.page.isLoading = true;
			await this.fetchTemplates();
			this.page.isLoading = false;
		}
	},
	created() {
		this.fetchTemplatesAndSetupPage();
	}
};
</script>

<style lang="scss">

.TemplatesList {
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
