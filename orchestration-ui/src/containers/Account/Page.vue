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

		<template v-slot:content class="AccountPage">
			<section class="AccountPage__account">
				<div class="AccountPage__account__row">
					<b>Email:</b>
					<span v-text="account.user.email"/>
				</div>

			</section>

			<h3>Networks</h3>

		</template>

	</default-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
	computed: {
		...mapGetters({
			account: 'account/account'
		})
	},
	methods: {
		...mapActions({
			logOutUser: 'account/logOut'
		})
	}
};
</script>

<style lang="scss">

.AccountPage {
	&__account {
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		width: 50%;

		&__row {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}
}
</style>
