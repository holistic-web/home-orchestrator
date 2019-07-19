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

			<section class="AccountPage__networks">
				<h3>Networks</h3>

				<span
					v-if="networks.length === 0"
					v-text="'There are no networks to display.'"/>

				<b-table
					v-else
					:items="networks"
					:fields="tableFields">

					<template slot="users" slot-scope="data">
						{{data.item.users.length + 1}}
					</template>

					<template slot="actions" slot-scope="data">
						<b-button
							variant="outline-primary"
							size="sm"
							v-text="'Set Active'"
							:disabled="isSetNetworkActiveDisabled(data.item)"
							@click="setCurrentNetwork(data.item)"/>
					</template>

				</b-table>

			</section>

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
			},
			tableFields: [
				'name',
				'owner',
				'users',
				{ key: 'actions', label: '' }
			]
		};
	},
	computed: {
		...mapGetters({
			account: 'account/account',
			network: 'networks/network',
			networks: 'networks/networks'
		})
	},
	methods: {
		...mapActions({
			fetchNetworks: 'networks/fetchNetworks',
			setCurrentNetwork: 'networks/setCurrentNetwork',
			logOutUser: 'account/logOut'
		}),
		async setupPage() {
			this.page.isLoading = true;
			await this.fetchNetworks();
			this.page.isLoading = false;
		},
		isSetNetworkActiveDisabled(network) {
			if (!this.network) return false;
			return this.network._id === network._id;
		}
	},
	created() {
		this.setupPage();
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

	&__networks {
		display: flex;
		flex-direction: column;
	}
}
</style>
