<template>
	<v-app id="app" class="App">

		<sidebar/>

		<router-view class="App__content"/>

	</v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Sidebar from './components/Sidebar.vue';

export default {
	components: {
		Sidebar
	},
	computed: {
		...mapGetters({
			account: 'account/account'
		})
	},
	methods: {
		redirectIfNotAuthenticated() {
			if (this.$route.name === 'account.unauthorized') return;
			// #Todo: confirm account is on approved list of accounts within the database.
			if (!this.account) this.$router.push({ name: 'account.unauthorized' });
		}
	},
	watch: {
		account: {
			immediate: true,
			handler: 'redirectIfNotAuthenticated'
		},
		$route: {
			immediate: true,
			handler: 'redirectIfNotAuthenticated'
		}
	}
};

</script>

<style lang="scss">
@import './styles/index.scss';

.App {
	font-family: 'Nunito', 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	width: 100%;
	color: $text;
	background-color: $background;
	display: flex;
	overflow: hidden;

	>.application--wrap{ flex-direction: row; }

	&__content {
		width: 100%;
		max-height: 100vh;
		overflow: auto;
		flex-direction: column;
	}

}
</style>
