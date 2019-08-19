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
