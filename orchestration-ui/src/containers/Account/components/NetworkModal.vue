<template>
	<b-modal
		:visible="visible"
		title="Choose Active Network"
		ok-variant="outline-info"
		ok-title="Close"
		ok-only
		@hidden="$emit('hidden')">

			<span v-if="isSubmitting" v-text="'Submitting...'"/>

			<template v-if="!isSubmitting">

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
							@click="onNetworkSelect(data.item)"/>
					</template>

				</b-table>

			</template>

	</b-modal>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import toastService from '../../lib/toastService';


export default {
	data() {
		return {
			page: {
				isLoading: false,
				isSubmitting: false
			},
			tableFields: [
				'name',
				'owner',
				'users',
				{ key: 'actions', label: '' }
			],
			networkSettings: null
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
			fetchNetwork: 'networks/fetchNetwork',
			setCurrentNetwork: 'networks/setCurrentNetwork',
			updateNetwork: 'networks/updateNetwork',
		}),
		isSetNetworkActiveDisabled(network) {
			if (!this.network) return false;
			return this.network._id === network._id;
		},
		async setupPage() {
			this.page.isLoading = true;
			await Promise.all([
				this.fetchNetworks(),
				this.fetchNetwork()
			]);
			this.page.isLoading = false;
		},
		isSetNetworkActiveDisabled(network) {
			if (!this.network) return false;
			return this.network._id === network._id;
		},
		onNetworkSelect(network) {
			this.setCurrentNetwork(network);
			this.setupPage();
		},
		async onUpdateSettingsClick() {
			this.page.isSubmitting = true;
			try {
				await this.updateNetwork({ settings: this.networkSettings });
				this.setupPage();
				toastService.toast('Settings Updated');
			} catch (err) {
				toastService.toast(err);
			}
			this.page.isSubmitting = false;
		}
	}
