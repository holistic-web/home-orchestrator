<template>
	<b-container class="ThemesList">

		<section class="ThemesList__header">

			<div>

				<b-button
					class="ThemesList__header__button"
					variant="outline-info"
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
				:items="themes"
				:fields="tableFields">

				<template slot="lights" slot-scope="data">

					<div
						class="ThemesList__table__lights"
						v-for="light in data.item.lights"
						:key="light.name">
						<b
							class="ThemesList__table__lights__item"
							v-text="`${light.name}:`"/>
						<span
							class="ThemesList__table__lights__item"
							v-if="light.state.colour"
							v-text="`Colour: ${light.state.colour};`"/>
						<span
							class="ThemesList__table__lights__item"
							v-if="light.state.brightness"
							v-text="`Brightness: ${light.state.brightness};`"/>
						<span
							class="ThemesList__table__lights__item"
							v-if="light.state.scene"
							v-text="`Scene: ${light.state.scene};`"/>
					</div>

				</template>

				<template
					slot="actions"
					slot-scope="data">

					<div class="ThemesList__table__actions">

						<b-btn
							class="ThemesList__table__actions__item"
							variant="outline-info"
							v-text="'Edit'"
							:to="{ name: 'themes.edit', params: { id: data.item._id } }"/>

						<b-btn
							v-if="!data.item.isSubmitting"
							class="ThemesList__table__actions__item"
							variant="primary"
							v-text="'Apply'"
							@click="applyThemeToItem(data.item)"/>

						<span
							v-if="data.item.isSubmitting"
							v-text="'Submitting'"/>

					</div>


				</template>

			</b-table>

		</template>

	</b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import toastService from '../../lib/toastService';

export default {
	data() {
		return {
			page: {
				isLoading: false
			},
			tableFields: [
				'name',
				'lights',
				{ key: 'actions', label: '' }
			]
		};
	},
	computed: {
		...mapGetters({
			themes: 'themes/themes'
		})
	},
	methods: {
		...mapActions({
			fetchThemes: 'themes/fetchThemes',
			applyTheme: 'themes/applyTheme'
		}),
		async fetchThemesAndSetupPage() {
			this.page.isLoading = true;
			await this.fetchThemes();
			this.page.isLoading = false;
		},
		async applyThemeToItem(item) {
			this.$set(item, 'isSubmitting', true);
			try {
				await this.applyTheme(item);
				toastService.toast('Theme applied');
			} catch (err) {
				toastService.toast(err.message);
			}
			this.$set(item, 'isSubmitting', false);
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

	&__table {

		&__lights {

			&__item {
				margin-right: 1rem;
			}
		}

		&__actions {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;

			&__item {
				margin-left: 1rem;
			}
		}
	}


}

</style>
