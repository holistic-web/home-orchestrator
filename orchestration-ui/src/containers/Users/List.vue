<template>
	<default-layout :isLoading="page.isLoading" :isSubmitting="page.isSubmitting">

		<template v-slot:title>
			Users
		</template>

		<template v-slot:actions>
			<b-button
				variant="info"
				v-text="'Refresh'"
				@click="fetch"/>

			<b-btn
				variant="primary"
				v-text="'New User'"
				:disabled="page.isSubmitting"
				@click="onCreateUserClick"/>
		</template>

		<template v-slot:content>

		</template>

	</default-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import toastService from '../../lib/toastService';
import DefaultLayout from '../../components/DefaultLayout.vue';

export default {
	components: {
		DefaultLayout
	},
	data() {
		return {
			page: {
				isLoading: false,
				isSubmitting: false,
				isNewUserModalVisible: false,
				isRemoveUserModalVisible: false
			},
			newUserUid: null
		};
	},
	computed: {
		...mapGetters({
			users: 'users/users'
		})
	},
	methods: {
		...mapActions({
			fetchUsers: 'users/fetchUsers',
			createUser: 'users/createUsers',
			deleteUser: 'users/deleteUser'
		}),
		async fetch() {
			this.page.isLoading = true;
			await this.fetchUsers();
			this.page.isLoading = false;
		}

	},
	created() {
		this.fetch();
	}
};
</script>
