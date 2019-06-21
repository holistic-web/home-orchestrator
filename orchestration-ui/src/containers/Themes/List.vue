<template>
	<default-layout :isLoading="page.isLoading" :isSubmitting="page.isSubmitting">

		<template v-slot:title>
			Themes
		</template>

		<template v-slot:actions>
			<b-button
				variant="info"
				v-text="'Refresh'"
				@click="fetchThemesAndSetupPage"/>

			<b-button
				variant="outline-info"
				v-text="'New Theme'"
				:to="{ name: 'themes.create' }"/>
		</template>

		<template v-slot:content>

			<span
				v-if="themes.length === 0"
				v-text="'There are no themes to display. Why not create one?'"/>

			<b-table
				v-else
				:items="themes"
				:fields="tableFields">

				<template slot="lights" slot-scope="data">

					<div
						class="ThemesList__lights"
						v-for="light in data.item.lights"
						:key="light.name">
						<b
							class="ThemesList__lights__item"
							v-text="`${light.name}:`"/>

						<span v-if="!light.state.on" v-text="'off'"/>
						<template v-else>
							<span
								class="ThemesList__lights__item"
								v-if="light.state.colour"
								v-text="`colour: ${light.state.colour};`"/>
							<span
								class="ThemesList__lights__item"
								v-if="light.state.brightness"
								v-text="`brightness: ${light.state.brightness};`"/>
							<span
								class="ThemesList__lights__item"
								v-if="light.state.scene"
								v-text="`scene: ${light.state.scene};`"/>
						</template>
					</div>

				</template>

				<template
					slot="actions"
					slot-scope="data">

					<div class="ThemesList__actions">

						<b-btn
							v-if="!data.item.isSubmitting"
							class="ThemesList__actions__item"
							variant="primary"
							v-text="'Apply'"
							@click="applyThemeToItem(data.item)"/>

						<span
							v-if="data.item.isSubmitting"
							class="ThemesList__actions__item"
							v-text="'Submitting...'"/>

						<b-btn
							class="ThemesList__actions__item"
							variant="outline-info"
							v-text="'Edit'"
							:to="{ name: 'themes.edit', params: { id: data.item._id } }"/>

					</div>


				</template>

			</b-table>

		</template>

	</default-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import toastService from '../../lib/toastService';
import DefaultLayout from '../../components/DefaultLayout.vue';

export default {
	components: {
		DefaultLayout
	},
	data() {
		return {
			page: {
				isLoading: false,
				isSubmitting: false
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

	&__lights {

		&__item {
			margin-right: 1rem;
		}
	}

	&__actions {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		@media all and (min-width: 768px) {
			flex-direction: row-reverse;
			justify-content: flex-start;
		}

		&__item {
			margin-bottom: 1rem;

			@media all and (min-width: 768px) {
				margin-bottom: 0;
				margin-left: 1rem;
			}
		}
	}

}

</style>
