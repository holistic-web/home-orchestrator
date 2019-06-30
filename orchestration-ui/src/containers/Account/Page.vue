<template>
	<default-layout :isLoading="page.isLoading" :isSubmitting="page.isSubmitting">

		<template v-slot:title>
			Account
		</template>

		<template v-slot:actions>
			<b-btn
				variant="outline-danger"
				size="sm"
				v-text="'Log Out'"
				@click="logOutUser"/>
		</template>

	</default-layout>
</template>

<script>
import { mapActions } from 'vuex';
import DefaultLayout from '../../components/DefaultLayout.vue';

export default {
	components: {
		DefaultLayout
	},
	data() {
		return {
			page: {
				isLoading: false,
				isSubmtting: false
			}
		};
	},
	methods: {
		...mapActions({
			logOutUser: 'account/logOut'
		})
	}
};
</script>
